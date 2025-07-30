import axios, { AxiosRequestConfig } from 'axios';
import { parseRefreshTokenResponse, applyTokensToState } from '@/utils/token';

interface RetryRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// 요청 시 accessToken 헤더 추가
axiosInstance.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' && localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  async (response) => {
    // 로그인 시 갱신된 토큰 저장
    const newAccessToken = response.data?.data?.accessToken;
    if (newAccessToken) {
      applyTokensToState(newAccessToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config as RetryRequestConfig;
    const code = error.response?.data?.code;

    if (code === '2199' && !originalRequest._retry) {
      originalRequest._retry = true;

      const { accessToken } = parseRefreshTokenResponse(error.response);
      if (!accessToken) {
        return Promise.reject(error);
      }
      applyTokensToState(accessToken);

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${accessToken}`,
      };

      // 일반 요청 재시도
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
