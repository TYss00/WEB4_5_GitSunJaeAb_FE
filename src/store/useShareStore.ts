import { create } from 'zustand';
import { createClient } from '@liveblocks/client';
import { liveblocks } from '@liveblocks/zustand';
import type { WithLiveblocks } from '@liveblocks/zustand';
import type { Marker } from '@/types/type';

export type MarkerWithAddress = Marker & {
  address?: string;
};
export type NewMarkerInput = Omit<
  MarkerWithAddress,
  'id' | 'markerSeq' | 'member'
>;
export interface Layer {
  id: number;
  name: string;
}

type ShareState = {
  layers: Layer[];
  addLayer: () => void;
  removeLayer: (id: number) => void;
  renameLayer: (id: number, newName: string) => void;

  markers: Record<string, MarkerWithAddress>;
  selectedLayerId: number | null | 'all';
  addMarker: (marker: NewMarkerInput) => void;
  addMarkerDirect: (marker: Marker) => void;
  removeMarker: (id: number) => void;
  setSelectedLayerId: (layerId: number | 'all') => void;
  filteredMarkers: () => Marker[];
  updateMarker: (id: number, fields: Partial<MarkerWithAddress>) => void;
};

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
});

const useShareStore = create<WithLiveblocks<ShareState>>()(
  liveblocks(
    (set, get) => ({
      layers: [
        { id: 1, name: '레이어 1' },
        { id: 2, name: '레이어 2' },
        { id: 3, name: '레이어 3' },
      ],

      addLayer: () => {
        const nextIndex = get().layers.length + 1;
        const newLayer = {
          id: nextIndex,
          name: `레이어 ${nextIndex}`,
        };
        set((state) => ({
          layers: [...state.layers, newLayer],
        }));
      },

      removeLayer: (id: number) => {
        const currentLayers = get().layers;
        const currentMarkers = get().markers;
        const selectedLayerId = get().selectedLayerId;

        const newLayers = currentLayers.filter((layer) => layer.id !== id);

        const newMarkers = Object.fromEntries(
          Object.entries(currentMarkers).filter(
            ([_, marker]) => marker.layer !== id
          )
        );

        const newSelectedId =
          selectedLayerId === id.toString() ? 'all' : selectedLayerId;

        set({
          layers: newLayers,
          markers: newMarkers,
          selectedLayerId: newSelectedId,
        });
      },

      renameLayer: (id: number, newName: string) => {
        const currentLayers = get().layers;
        const updatedLayers = currentLayers.map((layer) =>
          layer.id === id ? { ...layer, name: newName } : layer
        );
        set({ layers: updatedLayers });
      },

      setSelectedLayerId: (layerId: number | 'all') => {
        set({ selectedLayerId: layerId });
      },

      selectedLayerId: 'all',

      markers: {},
      addMarker: (markerData) => {
        const id = Date.now();
        const markerSeq = Object.keys(get().markers).length + 1;

        const marker: Marker = {
          id,
          markerSeq,
          ...markerData,
        };

        const current = get().markers;
        if (current[id.toString()]) return;

        set({ markers: { ...current, [id.toString()]: marker } });
      },

      addMarkerDirect: (marker) => {
        const currentMarkers = get().markers;
        if (currentMarkers[marker.id]) return;
        set({ markers: { ...currentMarkers, [marker.id]: marker } });
      },

      removeMarker: (id: number) => {
        const current = get().markers;
        const { [id]: _, ...rest } = current;
        set({ markers: rest });
      },

      filteredMarkers: () => {
        const { markers, selectedLayerId } = get();
        if (!selectedLayerId || selectedLayerId === 'all') {
          return Object.values(markers);
        }
        return Object.values(markers).filter(
          (m) => m.layer === selectedLayerId
        );
      },
      updateMarker: (id, fields) => {
        const current = get().markers;
        const marker = current[id];
        if (!marker) return;

        set({
          markers: {
            ...current,
            [id]: { ...marker, ...fields },
          },
        });
      },
    }),
    {
      client,
      storageMapping: { markers: true, layers: true },
    }
  )
);

export default useShareStore;
