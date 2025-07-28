import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // 테스트용으로 넣은것입니다.
    remotePatterns: [
      // 이미지 테스트용
      {
        protocol: 'https',
        hostname: 'lyrvpfgoxwppqtuuolav.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'mapick.cedartodo.uk',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
    // SVG 허용 추가
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // 홈 리다이렉트용
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/landing',
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
