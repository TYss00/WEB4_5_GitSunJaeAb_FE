'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function RequireGuest({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (accessToken && !loading) {
      router.replace('/dashbord');
    }
  }, [accessToken, loading, router]);

  if (accessToken) return null;

  return <>{children}</>;
}
