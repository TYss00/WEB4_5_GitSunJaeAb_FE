import axios from 'axios';
// import { APIUrl } from './api';
import Cookies from 'js-cookie';

// Next.js API Route를 거쳐 처리
// 쿠키 요청
const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// accessToken 쿠키를 가져와 Authorization 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
