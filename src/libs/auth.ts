import { SignupFormData } from '@/types/authType';
import axiosInstance from './axios';

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

  if (data.token?.accessToken) {
    localStorage.setItem('accessToken', data.token.accessToken);
    import('@/store/useAuthStore').then((mod) => {
      mod.useAuthStore.getState().setAccessToken(data.token.accessToken);
    });
  }
  return data;
};
