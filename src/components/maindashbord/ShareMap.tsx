'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import ShareMapCard from '../ui/card/ShareMapCard';

export default function ShareMap() {
  return (
    <section className="bg-[#F6F6F6] py-12 px-43 2xl:px-100">
      <div className="flex gap-8 items-start">
        {/* 왼쪽 대표 카드 */}
        <div className="w-[400px]">
          <ShareMapCard
            isEvent={true}
            title="서울시와 함께 하는 야경지도"
            mapImageUrl="/sharemapmap.svg"
            participants={24}
            className="w-[400px] h-[440px]"
          />
        </div>

        {/* 오른쪽 슬라이더 영역 */}
        <div className="flex-1 flex flex-col gap-4">
          {/* 타이틀 */}
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-semibold text-[#005C54] leading-tight">
              Popular Collaborative Maps
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-base text-[#606060]">
                유저들과 함께 완성한 로드맵을 만나보세요
              </p>
              <div className="flex gap-2">
                <button className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-gray-500">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-gray-500">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* 슬라이더 카드 영역 */}
          <div className="overflow-hidden">
            <div className="flex gap-4 transition-transform duration-300 ease-in-out">
              {/* map으로 반복 */}
              {[1, 2].map((i) => (
                <ShareMapCard
                  key={i}
                  isEvent={false}
                  title={`유저 인기 장소 ${i}`}
                  mapImageUrl="/sharemapmap.svg"
                  participants={5}
                  className="w-[330px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
