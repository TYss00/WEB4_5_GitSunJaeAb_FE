'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function RequireLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, user, loading, initUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // accessToken 없으면 로그인으로
    if (!accessToken) {
      router.replace('/login');
      return;
    }

    // accessToken만 있고 user는 없으면 사용자 초기화 시도
    if (accessToken && !user) {
      initUser().then((result) => {
        if (!result) {
          router.replace('/login'); // 유저 초기화 실패 시
        }
      });
    }
  }, [accessToken, user, router, initUser]);

  // 로딩 중이거나 유저 정보가 아직 없는 경우
  if (!accessToken || !user || loading) {
    return null;
  }

  return <>{children}</>;
}
