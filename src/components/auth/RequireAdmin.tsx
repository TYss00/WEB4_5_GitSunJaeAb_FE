'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function RequireAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, user, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken && !loading) {
      router.replace('/login');
    }

    if (accessToken && user && user.role !== 'ROLE_ADMIN') {
      router.replace('/');
    }
  }, [accessToken, router, user, loading]);

  if (!accessToken || !user || user.role !== 'ROLE_ADMIN') return null;
  return <>{children}</>;
}
