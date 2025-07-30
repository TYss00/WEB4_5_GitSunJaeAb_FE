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
    console.log('[axios][request] accessToken 헤더 추가됨:', token);
  }
  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  async (response) => {
    // 로그인 시 갱신된 토큰 저장
    const newAccessToken = response.data?.data?.accessToken;
    if (newAccessToken) {
      console.log(
        '[axios][response] 새 accessToken 발견 → 저장',
        newAccessToken
      );
      applyTokensToState(newAccessToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config as RetryRequestConfig;
    const code = error.response?.data?.code;

    console.warn('[axios][error] 응답 에러 발생:', code, originalRequest.url);

    if (code === '2199' && !originalRequest._retry) {
      console.log('[axios][error] accessToken 만료 → 재발급 절차 시작');
      originalRequest._retry = true;

      const { accessToken } = parseRefreshTokenResponse(error.response);
      if (!accessToken) {
        console.warn('[axios][error] accessToken 재발급 실패');
        return Promise.reject(error);
      }
      applyTokensToState(accessToken);
      console.log('[axios][error] 재발급된 accessToken 저장:', accessToken);

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${accessToken}`,
      };

      // 일반 요청 재시도
      console.log('[axios][retry] 일반 요청 재시도:', originalRequest.url);
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
