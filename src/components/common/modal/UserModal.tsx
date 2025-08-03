'use client';

import { logoutUser } from '@/libs/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LogOut, UserRound } from 'lucide-react';
import { UserModalProps } from '@/types/type';

export default function UserModal({ onClose, isAdmin }: UserModalProps) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      queryClient.removeQueries({ queryKey: ['user'] });
      router.push('/login');
      onClose();
    },
    onError: (err) => {
      console.error('로그아웃 실패:', err);
      logout();
      queryClient.removeQueries({ queryKey: ['user'] });
      router.push('/login');
      onClose();
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const goMyPage = () => {
    router.push('/mypage');
    onClose();
  };

  return (
    <div className="w-[130px] shadow-md rounded-[8px] z-30 p-2 border border-[var(--gray-100)] bg-[var(--white)]/80">
      <ul className="font-medium text-[var(--gray-300)]">
        {!isAdmin && (
          <li
            className="cursor-pointer p-2 text-[15px] rounded-[8px] hover:bg-[var(--primary-50)] hover:text-[var(--primary-300)] mb-1 flex items-center gap-1"
            onClick={goMyPage}
          >
            <UserRound size={16} /> 마이페이지
          </li>
        )}
        <li
          className="cursor-pointer p-2 text-[15px] rounded-[8px] hover:bg-[var(--primary-50)] hover:text-[var(--primary-300)] flex items-center gap-1"
          onClick={handleLogout}
        >
          <LogOut size={16} /> 로그아웃
        </li>
      </ul>
    </div>
  );
}
