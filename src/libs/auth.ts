import { SignupFormData, User } from '@/types/authType';
import axiosInstance from './axios';
import { useAuthStore } from '@/store/useAuthStore';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const signupUser = async (formData: SignupFormData) => {
  const { data } = await axiosInstance.post('/auth/signup', formData);
  // 성공 코드가 아닌 경우 예외 던지기
  // 회원 가입 성공 2001
  const isError = !['2001'].includes(data.code);
  if (isError) {
    const error = new AxiosError<{ code?: string; message?: string }>(
      data.message,
      undefined,
      {
        headers: {},
      } as InternalAxiosRequestConfig,
      undefined,
      {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: {},
        } as InternalAxiosRequestConfig,
      }
    );
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
  // 2002 가 로그인 성공
  // 성공 코드가 아닌 경우 예외 던지기
  if (data.code !== '2002') {
    const error = new AxiosError<{ code?: string; message?: string }>(
      data.message,
      undefined,
      {
        headers: {},
      } as InternalAxiosRequestConfig,
      undefined,
      {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: {},
        } as InternalAxiosRequestConfig,
      }
    );
    throw error;
  }
  return data;
};

export const logoutUser = async () => {
  return await axiosInstance.post('/auth/logout');
};

export const getUser = async (): Promise<User> => {
  const res = await axiosInstance.get('/members');
  const user = res.data.memberDetailDto;

  // Zustand 상태에 반영
  useAuthStore.getState().setUser(user);
  return user;
};

// 소셜 로그인
export const socialLogin = async ({
  provider,
  token,
}: {
  provider: string;
  token: string;
}) => {
  const { data } = await axiosInstance.post('/auth/socialLogin', {
    provider,
    token,
  });

  const accessToken = data.token?.accessToken;
  if (accessToken) {
    const mod = await import('@/utils/setAccessTokenToStore');
    await mod.setAccessTokenToStore(accessToken);
  }
  return data;
};
