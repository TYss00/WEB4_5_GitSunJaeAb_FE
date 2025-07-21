'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function InitAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, initUser } = useAuthStore();
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

  useEffect(() => {
    if (initialized) {
      console.log('로그인 상태:', accessToken ? '로그인됨' : '로그인 안됨');
      console.log('accessToken:', accessToken);
    }
  }, [initialized, accessToken]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">로그인 상태 확인 중...</p>
      </div>
    );
  }

  return <>{children}</>;
}
