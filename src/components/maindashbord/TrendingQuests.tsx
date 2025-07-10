'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';

export default function TrendingQuests() {
  return (
    <section className="py-10 px-43 h-[259px] pt-10">
      <div className="max-w-screen-xl mx-auto flex flex-row items-center gap-15 2xl:pl-22">
        <div className="flex flex-col items-start mr-5">
          <h3 className="text-3xl font-semibold text-[#005C54] mb-2">
            Trending Quests?
          </h3>
          <p className="text-gray-600 mb-4">
            지금 가장 인기 있는 퀘스트에 도전해보세요!
          </p>
          <div className="flex gap-2 self-end">
            <button className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-gray-500">
              <ChevronLeft size={16} />
            </button>
            <button className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-gray-500">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 퀘스트 카드 */}
        <div className="bg-[#E9F2F2] flex items-center rounded-lg p-5 gap-6 w-[753px] h-[159px] ml-auto 2xl:ml-0">
          <div className="flex-1 ml-3">
            <div className="flex items-center gap-4 text-sm text-[#222222] mb-3">
              <p className="text-base">지은지은</p>
              <p className="text-[#9F9F9F]">2025.07.04</p>
            </div>
            <p className="text-base font-medium mt-1 mb-4">
              여기는 아무도 못 찾을걸???
            </p>
            <Button
              buttonStyle="green"
              className="w-[82px] h-[29px] px-4 py-2 rounded-lg text-sm"
            >
              Let’s go
            </Button>
          </div>

          {/* 이미지 */}
          <div className="w-[260px] h-[120px] relative rounded-lg overflow-hidden">
            <Image
              src="/assets/quests.svg"
              alt="quest"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
