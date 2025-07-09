'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ShareMap() {
  return (
    <section className="bg-[#F6F6F6] py-12 px-43 2xl:px-100">
      <div className="flex gap-8 items-start">
        {/* 공용컴포넌트 카드부분넣기 예시(만들면 치우고 넣으면됨) */}
        <div className="w-[340px] h-[420px] bg-white rounded-lg border border-[#3B82F6] shadow-sm p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-[#3B82F6] font-medium mb-1">Event</p>
            <h3 className="text-base font-semibold text-[#222222] mb-4 leading-tight">
              서울시와 함께 하는 야경지도
            </h3>
            <div className="bg-gray-200 w-full h-[260px] rounded" />
          </div>
          <span className="text-xs bg-[#3B82F6] text-white px-3 py-1 rounded-full w-fit">
            24명 참여중
          </span>
        </div>

        {/* 오른쪽 */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 flex flex-col gap-2">
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

          {/* 카드 2개 */}
          <div className="flex gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="w-[260px] h-[200px] bg-white rounded-lg shadow-sm p-4 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-[#005C54] mb-1">
                    User
                  </p>
                  <h4 className="text-sm font-semibold text-[#222222] mb-2">
                    벚꽃 명소
                  </h4>
                  <div className="bg-gray-200 w-full h-[110px] rounded" />
                </div>
                <span className="text-xs bg-[#005C54] text-white px-3 py-1 rounded-full w-fit">
                  5명 참여중
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
