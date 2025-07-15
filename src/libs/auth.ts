import axiosInstance from './axios';

export const signupUser = async (
  name: string,
  nickname: string,
  email: string,
  password: string
) => {
  const { data } = await axiosInstance.post('/signup', {
    name,
    nickname,
    email,
    password,
  });
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const { data } = await axiosInstance.post('/signin', {
    email,
    password,
  });
  if (data.token?.accessToken && data.token?.refreshToken) {
    localStorage.setItem('accessToken', data.token.accessToken);
  }
  return data;
};

export const getProfile = async () => {
  const { data } = await axiosInstance.get('/members/profile');
  return data.member;
};
