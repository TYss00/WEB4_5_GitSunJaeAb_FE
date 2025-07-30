import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/libs/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { User } from '@/types/authType';

export const useProfile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await axiosInstance.get('/members');
      return res.data.memberDetailDto;
    },
    enabled: !!accessToken, // accessToken이 있을 때만 요청
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
