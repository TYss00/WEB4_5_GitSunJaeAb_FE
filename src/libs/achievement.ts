import { Achievement } from '@/types/myprofile';
import axiosInstance from './axios';

export const getAllAchievements = async (): Promise<Achievement[]> => {
  const res = await axiosInstance.get('/achievements');
  return res.data.achievements;
};

export const getMemberAchievements = async (): Promise<number[]> => {
  const res = await axiosInstance.get('/achievements/member');
  return res.data.memberAchievements?.map((a: { id: number }) => a.id) ?? [];
};
