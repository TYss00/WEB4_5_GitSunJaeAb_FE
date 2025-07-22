import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
      // 테스트용으로 넣은것입니다.
  // 이미지용 supabase url 추가
    domains: ['lyrvpfgoxwppqtuuolav.supabase.co', 'example.com'],
    // 이미지 테스트용
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '', // 기본 포트일 경우 빈 문자열
        pathname: '/**', // 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
