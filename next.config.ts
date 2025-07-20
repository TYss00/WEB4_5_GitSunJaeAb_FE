import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 테스트용으로 넣은것입니다.
  // 이미지용 supabase url 추가
  images: {
    domains: ['lyrvpfgoxwppqtuuolav.supabase.co', 'example.com'],
  },
};

export default nextConfig;
