'use client';

import LoadingSpinner from '@/components/common/LoadingSpener';
import { useAuthStore } from '@/store/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function InitAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initUser } = useAuthStore();
  const [initialized, setInitialized] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const initialize = async () => {
      const user = await initUser();
      if (user) {
        queryClient.setQueryData(['user'], user);
      }
      setInitialized(true);
    };
    initialize();
  }, [initUser, queryClient]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
