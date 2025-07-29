'use client';

import { useLoadScript } from '@react-google-maps/api';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  if (!isLoaded) {
    return <div>지도 불러오는 중...</div>;
  }

  return <>{children}</>;
}
