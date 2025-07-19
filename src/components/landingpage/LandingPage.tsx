'use client';

import LandingBanner from './LandingBanner';
import LandingScrollSection from './LandingScrollSection';
import LandingCategory from './LandingCategory';

export default function LandingPage() {
  return (
    <>
      {/* 배너 - 애니메이션 */}
      <LandingBanner />
      {/* 서비스 소개 - 스크롤애니메이션 */}
      <LandingScrollSection />
      {/* 인기 카테고리 */}
      <LandingCategory />
    </>
  );
}
