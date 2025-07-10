'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

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

          <div className="relative flex gap-6 overflow-x-auto mt-[40px] pl-20 pr-4 items-end">
            <div className="absolute top-2 left-[505px] flex gap-2">
              <button className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white">
                <ChevronLeft size={16} strokeWidth={3} />
              </button>
              <button className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white">
                <ChevronRight size={16} strokeWidth={3} />
              </button>
            </div>

            {/* 카드파트 공용컴포넌트추가시 수정부분 */}
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx === 0
                      ? 'w-[400px] h-[336px]'
                      : 'w-[300px] h-[278px] self-end'
                  } bg-white rounded-xl shadow-md shrink-0`}
                >
                  <div className="w-full h-[140px] bg-gray-300 rounded-t-xl" />
                  <div className="p-4 text-sm text-gray-800">
                    <p className="font-semibold mb-1">로드맵 이름</p>
                    <p className="text-sm text-gray-500 mb-2">내용~..</p>
                    <div className="text-xs text-[#007B7B] space-x-2">
                      <span>#해시태그</span>
                      <span>#해시태그</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
