'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';
import { useQuery } from '@tanstack/react-query';
import { getTrendingQuests } from '@/libs/mainDashboard';
import defaultQuestImg from '../../../public/assets/SharedMap.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import type { NavigationOptions } from 'swiper/types';
import { formatDate } from '@/utils/formatDate';
import SkeletonQuestCard from './SkeletonQuestCard';
import { TrendingQuest } from '@/types/mainDash';
import Link from 'next/link';

export default function TrendingQuests() {
  const {
    data: quests = [],
    isPending,
    isError,
  } = useQuery<TrendingQuest[], Error>({
    queryKey: ['quests'],
    queryFn: getTrendingQuests,
  });

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const swiper = swiperRef.current;

    if (
      swiper &&
      prevRef.current &&
      nextRef.current &&
      swiper.navigation &&
      typeof swiper.navigation.init === 'function' &&
      typeof swiper.navigation.update === 'function'
    ) {
      const navigation = swiper.params.navigation as NavigationOptions;

      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;

      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [quests]);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  if (isError) {
    console.error('퀘스트 로딩 오류');
  }

  return (
    <section className="py-10 w-[1100px] mx-auto">
      <div className="flex justify-between">
        <div className="flex flex-col items-start mr-5">
          <h3 className="text-3xl font-semibold text-[var(--primary-300)] mb-2">
            Trending Quests?
          </h3>
          <p className="text-[var(--gray-300)] mb-4">
            지금 가장 인기 있는 퀘스트에 도전해보세요!
          </p>
          {/* 슬라이드 navi */}
          <div className="flex gap-2 self-end">
            <button
              ref={prevRef}
              onClick={handlePrev}
              className="w-6 h-6 rounded-full border border-[var(--gray-200)] flex items-center justify-center text-[var(--gray-200)] cursor-pointer hover:text-[var(--primary-300)] hover:border-[var(--primary-300)]"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              ref={nextRef}
              onClick={handleNext}
              className="w-6 h-6 rounded-full border border-[var(--gray-200)] flex items-center justify-center text-[var(--gray-200)] cursor-pointer hover:text-[var(--primary-300)] hover:border-[var(--primary-300)]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 퀘스트 카드 슬라이드 */}
        <div className="w-[753px] h-[159px] ml-auto 2xl:ml-0 overflow-hidden">
          <Swiper
            modules={[Navigation, EffectFade, Autoplay]}
            navigation={false}
            effect="fade"
            loop
            autoplay={{ delay: 7000 }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="w-full h-full"
          >
            {isPending
              ? Array.from({ length: 2 }).map((_, i) => (
                  <SwiperSlide key={`skeleton-${i}`}>
                    <SkeletonQuestCard />
                  </SwiperSlide>
                ))
              : quests.map((quest) => (
                  <SwiperSlide key={quest.id}>
                    <div className="bg-[var(--primary-50)] rounded-lg p-5 w-full h-full flex items-center gap-6">
                      <div className="flex-1 ml-3">
                        <div className="flex items-center gap-4 text-sm mb-3">
                          <p className="text-base">{quest.member.nickname}</p>
                          <p className="text-[var(--gray-200)]">
                            {formatDate(quest.createdAt)}
                          </p>
                        </div>
                        <p className="text-base font-medium mt-1 mb-4">
                          {quest.title}
                        </p>
                        <Link href={`/dashbord/quest/detail/${quest.id}`}>
                          <Button
                            buttonStyle="green"
                            className="w-[82px] h-[29px] px-4 py-2 rounded-lg text-sm"
                          >
                            Let’s go
                          </Button>
                        </Link>
                      </div>
                      <div className="w-[260px] h-[120px] relative rounded-lg overflow-hidden">
                        <Image
                          src={
                            imgError || !quest.questImage?.startsWith('http')
                              ? defaultQuestImg
                              : quest.questImage
                          }
                          onError={() => setImgError(true)}
                          alt="title"
                          fill
                          sizes="100vw, 260px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
