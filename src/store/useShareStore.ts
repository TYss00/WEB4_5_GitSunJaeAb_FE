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

// 로그 전송 함수들 (실제 전송은 주석 처리)
async function sendMarkerLog(log: MarkerLogEntry) {
  console.log('마커 로그 전송:', log);
  try {
    await axiosInstance.post('/markers/sync', log);
    console.log('✅ 마커 로그 전송 성공');
  } catch (error) {
    console.error('❌ 마커 로그 전송 실패:', error);
  }
}

async function sendLayerLog(log: LayerLogEntry) {
  console.log('레이어 로그 전송:', log);
  try {
    await axiosInstance.post('/layers/sync', log);
    console.log('✅ 레이어 로그 전송 성공');
  } catch (error) {
    console.error('❌ 레이어 로그 전송 실패:', error);
  }
}

type ShareState = {
  layers: Layer[];
  addLayer: () => void;
  removeLayer: (id: number) => void;
  renameLayer: (id: number, newName: string) => void;

  markers: Record<string, MarkerWithAddress>;
  selectedLayerId: number | null | 'all';
  setSelectedLayerId: (layerId: number | 'all') => void;

  roadmapId: number | null; // ✅ 추가
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
      // ✅ 초기 레이어
      layers: [],

      // ✅ 레이어 추가
      addLayer: () => {
        const nextIndex =
          get().layers.length > 0
            ? Math.max(...get().layers.map((l) => l.layerTempId)) + 1
            : 1;

        const newLayer: Layer = {
          layerTempId: nextIndex,
          name: `레이어 ${nextIndex}`,
        };

        set((state) => ({
          layers: [...state.layers, newLayer],
        }));

        const memberId = useAuthStore.getState().user?.id;
        if (!memberId) return;

        const log: LayerLogEntry = {
          ...newLayer,
          action: 'add',
          memberId,
          roadmapId: get().roadmapId!,
          layerSeq: newLayer.layerTempId,
          description: '',
        };

        sendLayerLog(log);
      },

      // ✅ 레이어 삭제
      removeLayer: (id: number) => {
        const { layers, markers, selectedLayerId } = get();

        // 삭제 대상 레이어 찾아오기
        const targetLayer = layers.find((layer) => layer.layerTempId === id);
        if (!targetLayer) return; // 없으면 중단

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
          name: targetLayer.name, // ✅ 여기!
          action: 'delete',
          memberId,
          roadmapId: get().roadmapId!,
          layerSeq: id,
          description: '',
        };

        sendLayerLog(log);
      },

      // ✅ 레이어 이름 수정
      renameLayer: (id: number, newName: string) => {
        const updated = get().layers.map((l) =>
          l.layerTempId === id ? { ...l, name: newName } : l
        );
        set({ layers: updated });

        const memberId = useAuthStore.getState().user?.id;
        if (!memberId) return;

        const log: LayerLogEntry = {
          layerTempId: id,
          name: newName,
          action: 'update',
          memberId,
          roadmapId: get().roadmapId!,
          layerSeq: id,
          description: '',
        };

        sendLayerLog(log);
      },

      // ✅ 선택된 레이어
      selectedLayerId: 'all',
      setSelectedLayerId: (layerId) => {
        set({ selectedLayerId: layerId });
      },

      // ✅ 마커 관련
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
