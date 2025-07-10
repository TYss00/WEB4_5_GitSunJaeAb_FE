'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import RoadMapCard from '../ui/card/RoadMapCard';

export default function PopularLoadmap() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-8 py-16 flex items-center justify-between relative z-15">
        <div className="flex-shrink-0 w-[260px] text-[#005C54] mt-[60px] text-right">
          <h2 className="text-4xl font-semibold mb-3">인기 로드맵</h2>
          <p className="text-xl text-black">유저들이 선택한 최고의 로드맵</p>
        </div>

        <div className="relative flex-1 pl-8">
          <div className="absolute 2xl:w-[1650px] w-[1200px] h-[430px] bg-[#005C54] rounded-tl-[200px] translate-x-[calc(100vw-100%)] -z-10" />

          <div className="absolute top-20 left-[540px] flex gap-2">
            <button className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white">
              <ChevronLeft size={16} strokeWidth={3} />
            </button>
            <button className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white">
              <ChevronRight size={16} strokeWidth={3} />
            </button>
          </div>
          <div className="relative flex gap-6 overflow-x-auto mt-[70px] pl-20 pr-4 items-end">
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <RoadMapCard
                  key={idx}
                  category="여행"
                  mapImageUrl="/map.png"
                  title={`서울 투어 ${idx + 1}`}
                  description="서울 명소를 여행하는 로드맵입니다."
                  hashtags={['서울', '여행', '명소']}
                  profileImgUrl="/assets/google.svg"
                  author="지지지"
                  viewCount={100}
                  shareCount={10}
                  className={
                    idx === 0
                      ? 'w-[400px] h-[336px]'
                      : 'w-[300px] h-[278px] self-end'
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
