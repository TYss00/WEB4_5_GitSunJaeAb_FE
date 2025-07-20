import { AuthState } from '@/types/authType';
import { create } from 'zustand';

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

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
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

    try {
      // accessToken이 유효하면 정상 응답
      const mod = await import('@/libs/auth');
      const user = await mod.getUser();
      set({ user });
      return user;
    } catch (error) {
      // accessToken이 만료되어 있으면 자동 로그아웃 또는 refresh 로직
      console.warn('initUser 중 getUser 실패:', error);
      get().logout();
      return null;
    }
  },

  isLoggedIn: () => !!get().accessToken,
}));
