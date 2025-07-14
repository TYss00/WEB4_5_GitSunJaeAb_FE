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
  console.log(data);
  return data;
};
