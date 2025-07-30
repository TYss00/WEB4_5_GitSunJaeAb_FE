import { create } from 'zustand';
import axiosInstance from '@/libs/axios';

interface BookmarkedRoadmap {
  id: number;
  bookmarkId: number;
}

interface BookmarkState {
  roadmapId: string | null;
  isBookmarked: boolean;
  bookmarkId: number | null;
  likeCount: number;
  initBookmark: (roadmapId: string, serverLikeCount: number) => Promise<void>;
  toggleBookmark: () => Promise<void>;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  roadmapId: null,
  isBookmarked: false,
  bookmarkId: null,
  likeCount: 0,

  initBookmark: async (roadmapId, serverLikeCount) => {
    try {
      const res = await axiosInstance.get<{ roadmaps: BookmarkedRoadmap[] }>(
        '/bookmarks/bookmarkedRoadmaps'
      );

      const found = res.data.roadmaps.find(
        (item) => String(item.id) === String(roadmapId)
      );

      set({
        roadmapId,
        isBookmarked: !!found,
        bookmarkId: found?.bookmarkId ?? null,
        likeCount: serverLikeCount,
      });
    } catch (err) {
      console.error('initBookmark 실패:', err);
    }
  },

  toggleBookmark: async () => {
    const { isBookmarked, roadmapId, bookmarkId, likeCount } = get();
    if (!roadmapId) return;

    try {
      if (!isBookmarked) {
        const res = await axiosInstance.post<{ bookmarkId: number }>(
          `/bookmarks/${roadmapId}`
        );

        set({
          isBookmarked: true,
          bookmarkId: res.data.bookmarkId,
          likeCount: likeCount + 1,
        });
      } else {
        await axiosInstance.delete(`/bookmarks/${bookmarkId}`);
        set({
          isBookmarked: false,
          bookmarkId: null,
          likeCount: likeCount - 1,
        });
      }
    } catch (err) {
      console.error('toggleBookmark 실패:', err);
    }
  },
}));
