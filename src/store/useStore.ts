import { create } from 'zustand';
import { createClient } from '@liveblocks/client';
import { liveblocks } from '@liveblocks/zustand';
import type { WithLiveblocks } from '@liveblocks/zustand';
import type { Marker } from '@/types/type';

export type NewMarkerInput = Omit<Marker, 'id' | 'markerSeq' | 'member'>;

type State = {
  markers: Record<string, Marker>;
  selectedLayerId: string | null;
  addMarker: (marker: NewMarkerInput) => void;
  addMarkerDirect: (marker: Marker) => void;
  removeMarker: (id: string) => void;
  setSelectedLayerId: (layerId: string) => void;
  filteredMarkers: () => Marker[];
};

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
});

const useStore = create<WithLiveblocks<State>>()(
  liveblocks(
    (set, get) => ({
      markers: {},
      selectedLayerId: null,

      setSelectedLayerId: (layerId: string) => {
        set({ selectedLayerId: layerId });
      },

      addMarker: (markerData) => {
        const id = `temp-${Date.now()}`;
        const markerSeq = Object.keys(get().markers).length + 1;

        const marker: Marker = {
          id,
          markerSeq,
          ...markerData,
        };

        const current = get().markers;
        if (current[id]) return;

        set({ markers: { ...current, [id]: marker } });
      },

      addMarkerDirect: (marker) => {
        const currentMarkers = get().markers;
        if (currentMarkers[marker.id]) return;
        set({ markers: { ...currentMarkers, [marker.id]: marker } });
      },

      removeMarker: (id: string) => {
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
    }),
    {
      client,
      storageMapping: { markers: true },
    }
  )
);

export default useStore;
