// 업적 store

import { Achievement } from '@/types/myprofile';
import { create } from 'zustand';

type AchievementState = {
  allAchievements: Achievement[];
  achievedIds: number[];
  setAchievements: (achievements: Achievement[]) => void;
  setAchievedIds: (ids: number[]) => void;
};

export const useAchievementStore = create<AchievementState>((set) => ({
  allAchievements: [],
  achievedIds: [],
  setAchievements: (achievements) => set({ allAchievements: achievements }),
  setAchievedIds: (ids) => set({ achievedIds: ids }),
}));
