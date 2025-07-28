'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function RequireGuest({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, loading, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && accessToken && user) {
      if (user.role === 'ROLE_ADMIN') {
        router.replace('/admin/report');
      } else {
        router.replace('/dashbord');
      }
    }
  }, [accessToken, loading, user, router]);

  if (loading) return null;
  if (accessToken) return null;

  return <>{children}</>;
}
