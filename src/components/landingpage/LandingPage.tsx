'use client';

import Image from 'next/image';
import LandingBanner from './LandingBanner';
import LandingScrollSection from './LandingScrollSection';

export default function LandingPage() {
  return (
    <>
      {/* 배너 - 애니메이션 */}
      <LandingBanner />
      {/* 서비스 소개 - 스크롤애니메이션 */}
      <LandingScrollSection />
      <section className="w-full">
        {/* 상단 텍스트 */}
        <div className="text-center mb-[40px] pt-[124px]">
          <h2 className="text-[28px] font-semibold text-[var(--black)] mb-[30px]">
            인기 있는 카테고리
          </h2>
          <p className="text-[20px] text-[var(--black)]">
            요즘 뜨는 카테고리, 한눈에 살펴보세요
          </p>
        </div>

        {/* 4개 컬러 사각형 + 텍스트 */}
        <div className="flex w-full h-[600px]">
          <div className="relative flex-1 flex items-end justify-center py-6">
            <Image
              src="/cafe.png"
              alt="카페"
              fill
              priority
              sizes="25vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 w-full h-[290px] bg-gradient-to-t from-[#5E4431] via-[#5E4431]/100 to-transparent flex items-end justify-center pb-[76px]">
              <span className="text-[var(--white)] text-[24px] font-medium">
                카페
              </span>
            </div>
          </div>
          <div className="relative flex-1 flex items-end justify-center py-6">
            <Image
              src="/movieplace.png"
              alt="영화 촬영지"
              fill
              priority
              sizes="25vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 w-full h-[290px] bg-gradient-to-t from-[#B39F86] via-[#B39F86]/100 to-transparent flex items-end justify-center pb-[76px]">
              <span className="text-[var(--white)] text-[24px] font-medium">
                영화 촬영지
              </span>
            </div>
          </div>
          <div className="relative flex-1 flex items-end justify-center py-6">
            <Image
              src="/trip.png"
              alt="여행"
              fill
              priority
              sizes="25vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 w-full h-[290px] bg-gradient-to-t from-[#718C97] via-[#718C97]/100 to-transparent flex items-end justify-center pb-[76px]">
              <span className="text-[var(--white)] text-[24px] font-medium">
                여행
              </span>
            </div>
          </div>
          <div className="relative flex-1 flex items-end justify-center py-6">
            <Image
              src="/retro.png"
              alt="레트로"
              fill
              priority
              sizes="25vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 w-full h-[290px] bg-gradient-to-t from-[#211810] via-[#211810]/100 to-transparent flex items-end justify-center pb-[76px]">
              <span className="text-[var(--white)] text-[24px] font-medium">
                레트로
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
