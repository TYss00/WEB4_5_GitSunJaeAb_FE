'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import LoadingSpener from '../common/LoadingSpener';

export default function RequireGuest({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, loading, user, initUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (accessToken && !user) {
      initUser();
    }

    if (!loading && accessToken && user) {
      if (user.role != 'ROLE_ADMIN' && user.loginCount === 1) {
        router.push('/categories');
      } else if (user.role === 'ROLE_ADMIN') {
        router.push('/admin/report');
      } else {
        router.push('/dashbord');
      }
    }
  }, [accessToken, loading, user, router, initUser]);

  if (loading || (accessToken && !user)) {
    return <LoadingSpener />;
  }

  // 로그인된 사용자는 null, 나머지는 children
  if (accessToken && user) return null;

  return <>{children}</>;
}
