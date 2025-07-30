import { AuthState } from '@/types/authType';
import { create } from 'zustand';
import { useProfileStore } from './profileStore';
import { AxiosError } from 'axios';

interface ErrorResponse {
  code?: string;
  message?: string;
}

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
      // console.warn(err);
      // get().logout();
      // return null;
      const axiosError = err as AxiosError<ErrorResponse>;

      // ✅ accessToken 만료일 뿐이면 axios 인터셉터가 재요청 처리하므로 logout 금지
      const errorCode = axiosError?.response?.data?.code;
      if (errorCode === '2199') {
        console.warn(
          '🔁 fetchUser에서 accessToken 만료. 인터셉터가 재시도 처리 예정'
        );
        return null; // 인터셉터가 토큰 재발급 → 재시도 중일 수 있음
      }

      console.warn('🚨 fetchUser 실패. 로그아웃 처리:', err);
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

    const user = await get().fetchUser();

    // fetchUser 실패 시 로그아웃 처리 + 리다이렉트
    if (!user) {
      get().logout();

      if (typeof window !== 'undefined') {
        window.location.href = '/landing';
      }

      return null;
    }

    return user;
  },

  isLoggedIn: () => !!get().accessToken,
}));
