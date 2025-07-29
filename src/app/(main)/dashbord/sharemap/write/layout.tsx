'use client';

import { useLoadScript } from '@react-google-maps/api';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  if (!isLoaded) return <div>지도 불러오는 중...</div>;
  return <>{children}</>;
}
