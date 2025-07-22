import axiosInstance from '@/libs/axios';
import { useProfileStores } from '@/types/myprofile';
import { create } from 'zustand';

export const useProfileStore = create<useProfileStores>((set) => ({
  member: null,

  fetchMember: async () => {
    try {
      const res = await axiosInstance.get('/members');
      set({ member: res.data.memberDetailDto });
    } catch (err) {
      console.error('프로필 불러오기 실패:', err);
    }
  },
}));
