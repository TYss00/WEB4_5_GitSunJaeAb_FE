import { LandingCategoryResponse, LandingCategories } from '@/types/type';

export const getPopularCategories = async (): Promise<LandingCategories[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/top5`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // or 'force-cache' or 'no-cache'
    }
  );

  if (!res.ok) {
    throw new Error('카테고리 조회 실패');
  }

  const data: LandingCategoryResponse = await res.json();
  return data.categories;
};
