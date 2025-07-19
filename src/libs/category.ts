import { LandingCategories, LandingCategoryResponse } from '@/types/type';
import axios from 'axios';

export const getPopularCategories = async (): Promise<LandingCategories[]> => {
  const res = await axios.get<LandingCategoryResponse>('/categories/top5');
  return res.data.categories;
};
