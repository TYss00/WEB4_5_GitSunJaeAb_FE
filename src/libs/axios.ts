import axios, { AxiosRequestConfig } from 'axios';
import { parseRefreshTokenResponse, applyTokensToState } from '@/utils/token';

interface RetryRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// 재발급 관련 상태 변수들
let isRefreshing = false;
let failedQueue: ((token: string | null) => void)[] = [];

const processQueue = (token: string | null) => {
  failedQueue.forEach((cb) => cb(token));
  failedQueue = [];
};

// 요청 시 accessToken 헤더 추가
axiosInstance.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' && localStorage.getItem('accessToken');

  if (token) {
    config.headers = config.headers || {};
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
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push((token) => {
            if (token) {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              };
              resolve(axiosInstance(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // refresh 응답에서 새 accessToken 파싱
        const { accessToken } = parseRefreshTokenResponse(error.response);

        if (!accessToken) {
          throw new Error('No accessToken returned');
        }

        // 상태 및 localStorage에 저장
        applyTokensToState(accessToken);
        processQueue(accessToken);

        // 실패했던 요청 재시도
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
