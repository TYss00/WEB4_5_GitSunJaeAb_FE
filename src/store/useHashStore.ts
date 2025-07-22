import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HashtagState {
  hashtags: string[];
  addHashtag: (tag: string) => void;
  removeHashtag: (tag: string) => void;
  setHashtags: (tags: string[]) => void;
}

const useHashtagStore = create<HashtagState>()(
  persist(
    (set) => ({
      hashtags: [],
      addHashtag: (tag) =>
        set((state) => ({
          hashtags: [...state.hashtags, tag],
        })),
      removeHashtag: (tag) =>
        set((state) => ({
          hashtags: state.hashtags.filter((t) => t !== tag),
        })),
      setHashtags: (tags) =>
        set(() => ({
          hashtags: tags,
        })),
    }),
    {
      name: 'hashtag-storage',
    }
  )
);

export default useHashtagStore;
