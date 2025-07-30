'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { socialLogin, getUser } from '@/libs/auth';
import { setAccessTokenToStore } from '@/utils/setAccessTokenToStore';
import { useAuthStore } from '@/store/useAuthStore';
import { parseHashParams } from '@/utils/parseHashParams';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/common/LoadingSpener';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 중복 방지
  const hasCalled = useRef(false);

  const { mutate } = useMutation({
    mutationFn: socialLogin,
    onSuccess: async (data) => {
      const accessToken = data.token?.accessToken;
      if (!accessToken) {
        toast.error('로그인 실패');
        router.push('/login');
        return;
      }

      await setAccessTokenToStore(accessToken);

      const user = await queryClient.fetchQuery({
        queryKey: ['user'],
        queryFn: getUser,
      });

      useAuthStore.getState().setUser(user);

      toast.success('로그인 성공!');

      if (user?.role === 'ROLE_ADMIN') {
        router.push('/admin/report');
      } else {
        router.push('/dashbord');
      }
    },
    onError: () => {
      toast.error('소셜 로그인 실패');
      router.push('/login');
    },
  });

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const hash = window.location.hash;
    const params = parseHashParams(hash);

    const idToken = params['id_token'];

    if (idToken) {
      mutate({ provider: 'google', token: idToken });
    } else {
      toast.error('소셜 로그인 실패');
      router.push('/login');
    }
  }, [mutate, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
