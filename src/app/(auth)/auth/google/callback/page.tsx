'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { socialLogin, getUser } from '@/libs/auth';
import { setAccessTokenToStore } from '@/utils/setAccessTokenToStore';
import { useAuthStore } from '@/store/useAuthStore';
import { parseHashParams } from '@/utils/parseHashParams';
import { toast } from 'react-toastify';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

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
    // Google이 보낸 hash fragment → #id_token=...&state=...
    const hash = window.location.hash;
    const params = parseHashParams(hash);

    const idToken = params['id_token'];
    console.log('ID Token:', idToken);

    if (idToken) {
      mutate({ provider: 'google', token: idToken });
    } else {
      toast.error('소셜 로그인 실패');
      router.push('/login');
    }
  }, [mutate, router]);

  return <p className="text-center mt-20">로그인 처리 중...</p>;
}
