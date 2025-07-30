import { useAuthStore } from '@/store/useAuthStore';
import { AxiosResponse } from 'axios';

type RefreshTokenResponse = {
  code: string;
  message: string;
  timestamp: string;
  data: {
    accessToken: string;
    refreshToken: string;
    atExpiresIn: number;
    rtExpiresIn: number;
  };
};

export const parseRefreshTokenResponse = (
  res: AxiosResponse<RefreshTokenResponse>
) => {
  const data = res?.data?.data;
  return {
    accessToken: data?.accessToken ?? null,
  };
};

export const applyTokensToState = (accessToken: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
  useAuthStore.getState().setAccessToken(accessToken);
};
