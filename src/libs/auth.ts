import { SignupFormData, User } from '@/types/authType';
import axiosInstance from './axios';
import { useAuthStore } from '@/store/useAuthStore';

interface CustomError extends Error {
  code?: string;
}

export const signupUser = async (formData: SignupFormData) => {
  const { data } = await axiosInstance.post('/auth/signup', formData);
  // http 200이어도 내부 code가 4091, 4092, 5000이면 에러
  if (['4091', '4092', '5000'].includes(data.code)) {
    const error: CustomError = new Error(data.message);
    error.code = data.code;
    throw error;
  }
  return data;
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });
  return data;
};

export const logoutUser = async () => {
  return await axiosInstance.post('/auth/logout');
};

export const getUser = async (): Promise<User> => {
  const res = await axiosInstance.get('/members');
  const user = res.data.member;

  // Zustand 상태에 반영
  useAuthStore.getState().setUser(user);
  return user;
};

// 소셜 로그인
export const socialLogin = async (idToken: string) => {
  const { data } = await axiosInstance.post('/auth/socialLogin', {
    provider: 'google',
    token: idToken,
  });
  console.log('서버 응답:', data);
  return data;
};
