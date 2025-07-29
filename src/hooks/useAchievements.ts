import { getAllAchievements, getMemberAchievements } from '@/libs/achievement';
import { useQuery } from '@tanstack/react-query';

export const useAchievements = () => {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: getAllAchievements,
  });
};

export const useMemberAchievements = () => {
  return useQuery({
    queryKey: ['memberAchievements'],
    queryFn: getMemberAchievements,
  });
};
