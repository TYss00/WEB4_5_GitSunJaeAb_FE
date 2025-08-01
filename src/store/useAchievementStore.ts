import { AchievementState } from '@/types/myprofile';
import { create } from 'zustand';

export const useAchievementStore = create<AchievementState>((set) => ({
  allAchievements: [],
  achievedIds: [],
  setAchievements: (achievements) => set({ allAchievements: achievements }),
  setAchievedIds: (ids) => set({ achievedIds: ids }),
}));
