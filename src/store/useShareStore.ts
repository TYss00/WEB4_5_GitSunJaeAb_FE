import { create } from 'zustand';
import { createClient } from '@liveblocks/client';
import { liveblocks } from '@liveblocks/zustand';
import type { WithLiveblocks } from '@liveblocks/zustand';
import {
  Layer,
  Marker,
  MarkerWithAddress,
  MarkerLogEntry,
  NewMarkerInput,
  LayerLogEntry,
} from '@/types/share';
import { useAuthStore } from './useAuthStore';
import axiosInstance from '@/libs/axios';
import { toast } from 'react-toastify';

// 로그 전송 함수들 (실제 전송은 주석 처리)
async function sendMarkerLog(log: MarkerLogEntry) {
  try {
    await axiosInstance.post('/markers/sync', log);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error('마커 로그 전송 실패:');
  }
}

async function sendLayerLog(log: LayerLogEntry) {
  try {
    await axiosInstance.post('/layers/sync', log);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error('레이어 로그 전송 실패:');
  }
}

type ShareState = {
  layers: Layer[];
  addLayer: () => void;
  removeLayer: (id: number) => void;
  renameLayer: (id: number, newName: string) => void;
  layerSeqCounter: number;

  markers: Record<string, MarkerWithAddress>;
  selectedLayerId: number | null | 'all';
  setSelectedLayerId: (layerId: number | 'all') => void;

  roadmapId: number | null;
  setRoadmapId: (id: number) => void; //

  addMarker: (marker: NewMarkerInput) => void;
  addMarkerDirect: (marker: Marker) => void;
  updateMarker: (id: number, fields: Partial<MarkerWithAddress>) => void;
  removeMarker: (id: number) => void;
  filteredMarkers: () => MarkerWithAddress[];
};

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
});

const useShareStore = create<WithLiveblocks<ShareState>>()(
  liveblocks(
    (set, get) => ({
      roadmapId: null,
      setRoadmapId: (id: number) => set({ roadmapId: id }),
      layers: [],
      layerSeqCounter: 0,

      addLayer: () => {
        const newTempId = Date.now() + Math.floor(Math.random() * 1000);
        const nextSeq = get().layerSeqCounter + 1;

        const newLayer: Layer = {
          layerTempId: newTempId,
          name: `레이어 ${nextSeq}`,
          layerSeq: nextSeq,
        };

        set((state) => ({
          layers: [...state.layers, newLayer],
          layerSeqCounter: nextSeq,
        }));

        const memberId = useAuthStore.getState().user?.id;
        if (!memberId) return;

        const log: LayerLogEntry = {
          layerTempId: newTempId,
          name: newLayer.name,
          action: 'add',
          memberId,
          roadmapId: get().roadmapId!,
          layerSeq: nextSeq,
          description: '',
        };

        sendLayerLog(log);
      },

      removeLayer: (id: number) => {
        const { layers, markers, selectedLayerId } = get();

        const targetLayer = layers.find((l) => l.layerTempId === id);
        if (!targetLayer) return;

        const newLayers = layers.filter((layer) => layer.layerTempId !== id);
        const newMarkers = Object.fromEntries(
          Object.entries(markers).filter(
            ([, marker]) => marker.layerTempId !== id
          )
        );
        const newSelected = selectedLayerId === id ? 'all' : selectedLayerId;

        set({
          layers: newLayers,
          markers: newMarkers,
          selectedLayerId: newSelected,
        });

        const memberId = useAuthStore.getState().user?.id;
        if (!memberId) return;

        const log: LayerLogEntry = {
          layerTempId: id,
          name: targetLayer.name,
          action: 'delete',
          memberId,
          roadmapId: get().roadmapId!,
          layerSeq: targetLayer.layerSeq!,
          description: '',
        };

        sendLayerLog(log);
      },

      renameLayer: (id: number, newName: string) => {
        const updated = get().layers.map((l) =>
          l.layerTempId === id ? { ...l, name: newName } : l
        );
        set({ layers: updated });

        const targetLayer = updated.find((l) => l.layerTempId === id);
        if (!targetLayer) return;

        const memberId = useAuthStore.getState().user?.id;
        if (!memberId) return;

        const log: LayerLogEntry = {
          layerTempId: id,
          name: newName,
          action: 'update',
          memberId,
          roadmapId: get().roadmapId!,
          layerSeq: targetLayer.layerSeq!,
          description: '',
        };

        sendLayerLog(log);
      },

      selectedLayerId: 'all',
      setSelectedLayerId: (layerId) => {
        set({ selectedLayerId: layerId });
      },

      markers: {},

      addMarker: (markerData) => {
        const markerTempId = Date.now();
        const markerSeq = Object.keys(get().markers).length + 1;

        const marker: Marker = {
          ...markerData,
          markerTempId,
          markerSeq,
        };

        const memberId = useAuthStore.getState().user?.id;
        if (!memberId) return;

        const log: MarkerLogEntry = {
          ...marker,
          action: 'add',
          memberId,
        };

        set((prev) => ({
          markers: {
            ...prev.markers,
            [markerTempId.toString()]: marker,
          },
        }));

        sendMarkerLog(log);
      },

      addMarkerDirect: (marker) => {
        const current = get().markers;
        if (current[marker.markerTempId]) return;
        set({
          markers: { ...current, [marker.markerTempId]: marker },
        });
      },

      updateMarker: (id, fields) => {
        const current = get().markers;
        const marker = current[id];
        if (!marker) return;

        const updated = { ...marker, ...fields };

        set({
          markers: {
            ...current,
            [id]: updated,
          },
        });

        const memberId = useAuthStore.getState().user?.id;
        if (!memberId) return;

        const log: MarkerLogEntry = {
          ...updated,
          action: 'update',
          memberId,
        };

        sendMarkerLog(log);
      },

      removeMarker: (id) => {
        const current = get().markers;
        const marker = current[id];
        if (!marker) return;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: _, ...rest } = current;
        set({ markers: rest });

        const memberId = useAuthStore.getState().user?.id;
        if (!memberId) return;

        const log: MarkerLogEntry = {
          ...marker,
          action: 'delete',
          memberId,
        };

        sendMarkerLog(log);
      },

      filteredMarkers: () => {
        const { markers, selectedLayerId } = get();
        if (!selectedLayerId || selectedLayerId === 'all') {
          return Object.values(markers);
        }
        return Object.values(markers).filter(
          (m) => m.layerTempId === selectedLayerId
        );
      },
    }),
    {
      client,
      storageMapping: {
        markers: true,
        layers: true,
      },
    }
  )
);

export default useShareStore;
