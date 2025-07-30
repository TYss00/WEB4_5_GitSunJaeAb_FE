import { AuthState } from '@/types/authType';
import { create } from 'zustand';
import { useProfileStore } from './profileStore';

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  setAccessToken: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
    set({ accessToken: token });
  },

  setUser: (user) => {
    set({ user });
  },

  fetchUser: async () => {
    try {
      const mod = await import('@/libs/auth');
      const user = await mod.getUser(); // API 요청
      set({ user });

      // 프로필 상태도 함께 불러오기
      const profileMod = await import('./profileStore');
      profileMod.useProfileStore.getState().fetchMember();

      return user;
    } catch (err) {
      console.warn(err);
      get().logout();
      return null;
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
    useProfileStore.getState().reset();
    set({ accessToken: null, user: null });
  },

  initUser: async () => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      get().logout();
      return;
    }

    set({ accessToken: token });
    return await get().fetchUser();
  },

  isLoggedIn: () => !!get().accessToken,
}));
