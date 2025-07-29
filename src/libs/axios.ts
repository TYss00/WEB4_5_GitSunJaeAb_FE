import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// 요청 시 accessToken 헤더에 포함
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 응답 시 accessToken 재발급되면 갱신
axiosInstance.interceptors.response.use(
  async (response) => {
    const newAccessToken = response.data?.token?.accessToken;

    if (
      newAccessToken &&
      typeof window !== 'undefined' &&
      newAccessToken !== ''
    ) {
      localStorage.setItem('accessToken', newAccessToken);

      // Zustand 상태에 반영
      const mod = await import('@/store/useAuthStore');
      mod.useAuthStore.getState().setAccessToken(newAccessToken);
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const isAuthError = error.response?.data?.code === '4010';
    const isRetry = originalRequest._retry;

    if (isAuthError && !isRetry) {
      originalRequest._retry = true;

      // 서버가 내려준 새 토큰을 꺼냄 (응답 바디 or 쿠키 기반)
      const newAccessToken = error.response?.data?.data?.accessToken;

      if (newAccessToken && typeof window !== 'undefined') {
        // 토큰 저장
        localStorage.setItem('accessToken', newAccessToken);
        const mod = await import('@/store/useAuthStore');
        mod.useAuthStore.getState().setAccessToken(newAccessToken);

        // Authorization 헤더 교체 후 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    if (error.response) {
      console.warn('응답 오류:', error.response.data);
    } else {
      console.warn('네트워크 오류 또는 서버 미응답');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
