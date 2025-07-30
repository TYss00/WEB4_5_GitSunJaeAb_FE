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
    if (!accessToken) {
      router.replace('/login');
    } else if (accessToken && !user) {
      // accessToken은 있지만 user는 없는 경우 → user 요청
      initUser();
    }
  }, [accessToken, user, router, initUser]);

  // 로딩 중이거나 유저 정보가 아직 없는 경우
  if (!accessToken || !user || loading) {
    return null; // 또는 <LoadingSpinner />
  }
  return <>{children}</>;
}
