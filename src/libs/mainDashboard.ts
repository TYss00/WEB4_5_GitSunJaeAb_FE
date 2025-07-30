import { Roadmap, TrendingQuest } from '@/types/mainDash';
import axiosInstance from './axios';

// 로드맵, 공유지도 카테고리별 카운트
export const getRoadmapCount = async (categoryId: number): Promise<number> => {
  const [personal, shared] = await Promise.all([
    axiosInstance.get(`/roadmaps/personal?categoryId=${categoryId}`),
    axiosInstance.get(`/roadmaps/shared?categoryId=${categoryId}`),
  ]);

  return personal.data.roadmaps.length + shared.data.roadmaps.length;
};

// 메인대시보드 공유지도 불러오기
export const getPopularShared = async (): Promise<Roadmap[]> => {
  const res = await axiosInstance.get<{ roadmaps: Roadmap[] }>(
    '/roadmaps/shared'
  );
  const shared = res.data.roadmaps
    .filter((r) => r.isPublic) // 공개된 지도만
    .sort((a, b) => b.viewCount - a.viewCount) // 조회수 내림차순
    .slice(0, 8); // 상위 6~8개만

  const withEditorCount = await Promise.all(
    shared.map(async (r) => {
      try {
        const editorsRes = await axiosInstance.get(`/roadmaps/${r.id}/editors`);
        return { ...r, editorCount: editorsRes.data.count };
      } catch (err) {
        console.error(`로드맵 ${r.id} 참여자 수 실패`, err);
        return { ...r, editorCount: 0 };
      }
    })
  );

  return withEditorCount;
};

// 메인대시보드 퀘스트 불러오기
export const getTrendingQuests = async (): Promise<TrendingQuest[]> => {
  const res = await axiosInstance.get<{ quests: TrendingQuest[] }>(
    '/quests?isActive=true'
  );

  const quests = res.data.quests;

  const detailedQuests = await Promise.all(
    quests.map(async (quest) => {
      try {
        const detailRes = await axiosInstance.get(`/quests/${quest.id}/detail`);
        const viewCount = detailRes.data.quest.viewCount ?? 0;
        return {
          ...quest,
          viewCount,
        };
      } catch (err) {
        console.error(`퀘스트 ${quest.id} 상세 조회 실패`, err);
        return {
          ...quest,
          viewCount: 0,
        };
      }
    })
  );

  return detailedQuests.sort((a, b) => b.viewCount - a.viewCount).slice(0, 6);
};
