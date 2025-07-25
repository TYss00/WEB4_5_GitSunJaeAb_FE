'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import ShareMapCard from '../ui/card/ShareMapCard';
import { useQuery } from '@tanstack/react-query';
import { Roadmap } from '@/types/mainDash';
import { getPopularShared } from '@/libs/mainDashboard';
import SkeletonShareMapCard from './SkeletonShareMapCard';

export default function ShareMap() {
  const {
    data: sharedMaps = [],
    isLoading,
    isError,
  } = useQuery<Roadmap[]>({
    queryKey: ['popular-shared-roadmaps'],
    queryFn: getPopularShared,
  });

  if (isError) {
    console.error('공유지도 불러오는 중 에러');
  }

  return (
    <section className="bg-[var(--gray-40)] py-14 mx-auto">
      <div className="w-[1100px] mx-auto">
        {/* 텍스트 + navi */}
        <div className="mb-5">
          <h2 className="text-3xl font-semibold text-[var(--primary-300)] leading-tight">
            Popular Collaborative Maps
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-base text-[var(--gray-300)] mt-2">
              유저들과 함께 로드맵을 만들어보세요
            </p>
            <div className="flex gap-2">
              <button className="swiper-prev w-6 h-6 rounded-full border border-[var(--gray-200)] flex items-center justify-center text-[var(--gray-200)] cursor-pointer hover:text-[var(--primary-300)] hover:border-[var(--primary-300)]">
                <ChevronLeft size={16} />
              </button>
              <button className="swiper-next w-6 h-6 rounded-full border border-[var(--gray-200)] flex items-center justify-center text-[var(--gray-200)] cursor-pointer hover:text-[var(--primary-300)] hover:border-[var(--primary-300)]">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 공유지도 슬라이드 */}
      <div className="w-[1100px] mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView="auto"
          spaceBetween={30}
          navigation={{
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
          }}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          loop
        >
          {/* 로딩 중일 때는 스켈레톤 4개 보여짐 */}
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <SwiperSlide key={idx} className="w-[252px]">
                  <SkeletonShareMapCard />
                </SwiperSlide>
              ))
            : sharedMaps.map((roadmap) => (
                <SwiperSlide key={roadmap.id} className="!w-[252px]">
                  <ShareMapCard
                    isEvent={false}
                    title={roadmap.title}
                    mapImageUrl={roadmap.thumbnail || '/sharemapmap.svg'}
                    participants={roadmap.likeCount}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
}
