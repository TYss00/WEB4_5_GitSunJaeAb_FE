'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { socialLogin, getUser } from '@/libs/auth';
import { setAccessTokenToStore } from '@/utils/setAccessTokenToStore';
import { useAuthStore } from '@/store/useAuthStore';
import { parseHashParams } from '@/utils/parseHashParams';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: socialLogin,
    onSuccess: async (data) => {
      const accessToken = data.token?.accessToken;
      if (!accessToken) {
        alert('accessToken 없음');
        router.push('/login');
        return;
      }

      await setAccessTokenToStore(accessToken);

      const user = await queryClient.fetchQuery({
        queryKey: ['user'],
        queryFn: getUser,
      });

      useAuthStore.getState().setUser(user);
      router.push('/');
    },
    onError: () => {
      alert('소셜 로그인 실패');
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
      alert('Google 로그인 토큰 없음');
      router.push('/login');
    }
  }, []);

  return <p className="text-center mt-20">로그인 처리 중...</p>;
}
