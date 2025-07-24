import { CategorySetting } from '@/types/type';
import axiosInstance from './axios';
import { LandingCategoryResponse, LandingCategories } from '@/types/type';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 전체 카테고리 조회
export const fetchCategories = async (): Promise<CategorySetting[]> => {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('카테고리 목록을 불러오는 데 실패했습니다.');
  }

  const data = await res.json();
  return data.categories;
};

// 관심 카테고리 등록
export const postCategoryInterests = async (categoryIds: number[]) => {
  const res = await axiosInstance.post('/members/interests', {
    categoryId: categoryIds,
  });
  return res.data;
};

// 인기 카테고리 조회
export const getPopularCategories = async (): Promise<LandingCategories[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/top5`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('카테고리 조회 실패');
  }

  const data: LandingCategoryResponse = await res.json();
  return data.categories;
};

// 로드맵, 공유지도 카테고리별 카운트
export const getRoadmapCount = async (categoryId: number): Promise<number> => {
  const [personal, shared] = await Promise.all([
    axiosInstance.get(`/roadmaps/personal?categoryId=${categoryId}`),
    axiosInstance.get(`/roadmaps/shared?categoryId=${categoryId}`),
  ]);

  return personal.data.roadmaps.length + shared.data.roadmaps.length;
};
