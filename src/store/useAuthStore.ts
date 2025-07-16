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

    set({ accessToken: token, loading: true });

    try {
      const res = await import('@/libs/axios').then((mod) =>
        mod.default.get('/members')
      );
      const user = res.data.member;
      get().setUser(user);
    } catch (err) {
      console.warn('유저 정보 불러오기 실패', err);
      get().logout();
    } finally {
      set({ loading: false });
    }
  },

  isLoggedIn: () => !!get().accessToken,
}));
