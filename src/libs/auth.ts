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
    // localStorage 또는 js-cookie로 저장
    localStorage.setItem('accessToken', data.token.accessToken);
    localStorage.setItem('refreshToken', data.token.refreshToken);

    // 또는 쿠키로 저장하고 싶다면:
    // Cookies.set('accessToken', data.token.accessToken);
    // Cookies.set('refreshToken', data.token.refreshToken);
  }
  return data;
};
