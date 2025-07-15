import { create } from 'zustand';
import { createClient } from '@liveblocks/client';
import { liveblocks } from '@liveblocks/zustand';
import type { WithLiveblocks } from '@liveblocks/zustand';
import { v4 as uuidv4 } from 'uuid';

export type Marker = {
  x: number;
  y: number;
  userId: string;
  name?: string;
};

type State = {
  markers: Record<string, Marker>;
  addMarker: (marker: Omit<Marker, 'userId'>) => void;
  removeMarker: (id: string) => void;
};

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
});

const useStore = create<WithLiveblocks<State>>()(
  liveblocks(
    (set, get) => ({
      markers: {},

      addMarker: (markerData) => {
        const id = uuidv4();
        const marker: Marker = {
          ...markerData,
          userId: 'guest', // 로그인 연동 시 교체 예정
        };

        if (get().markers[id]) return;
        set({ markers: { ...get().markers, [id]: marker } });
      },

      removeMarker: (id) => {
        const { [id]: _, ...rest } = get().markers;
        set({ markers: rest });
      },
    }),
    {
      client,
      storageMapping: { markers: true },
    }
  )
);

export default useStore;
