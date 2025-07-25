import { TrendingQuest } from '@/types/type';
import axiosInstance from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 로드맵, 공유지도 카테고리별 카운트
export const getRoadmapCount = async (categoryId: number): Promise<number> => {
  const [personal, shared] = await Promise.all([
    axiosInstance.get(`/roadmaps/personal?categoryId=${categoryId}`),
    axiosInstance.get(`/roadmaps/shared?categoryId=${categoryId}`),
  ]);

  return personal.data.roadmaps.length + shared.data.roadmaps.length;
};

// 메인대시보드 퀘스트 불러오기
export const getTrendingQuests = async (): Promise<TrendingQuest[]> => {
  const res = await fetch(`${BASE_URL}/quests`);

  if (!res.ok) {
    throw new Error('퀘스트 데이터를 불러오지 못했습니다.');
  }

  const data = await res.json();
  return data.quests;
};
