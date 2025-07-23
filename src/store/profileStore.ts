import axiosInstance from '@/libs/axios';
import { useProfileStores } from '@/types/myprofile';
import { create } from 'zustand';

export const useProfileStore = create<useProfileStores>((set) => ({
  member: null,

  fetchMember: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('토큰이 없어 fetchMember 요청을 생략합니다.');
      return;
    }
    try {
      const res = await axiosInstance.get('/members');
      set({ member: res.data.memberDetailDto });
    } catch (err) {
      console.error('프로필 불러오기 실패:', err);
      set({ member: null });
    }
  },
  reset: () => set({ member: null }),
}));
