'use client';

import { Crown } from 'lucide-react';
import Button from '../ui/Button';
import { useState } from 'react';

export default function QuestDeatilRanking() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-[30px] w-[428px] p-4 border border-[var(--gray-200)] rounded-[10px]">
      {/* 1~3등 영역 */}
      <div className="py-4 flex justify-around">
        {/* 2등 */}
        <div className="text-center">
          <p className="pt-4.5 font-medium">2</p>
          <div className="bg-gray-400 rounded-full size-20"></div>
          <h4 className="pt-1">아아</h4>
        </div>

        {/* 1등 */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="bg-gray-400 rounded-full size-25"></div>
            <Crown
              size={24}
              className="text-[#FFC107] absolute -top-4.5 left-1/2 -translate-x-1/2"
              fill="#FFC107"
            />
          </div>
          <h4>콜라</h4>
        </div>

        {/* 3등 */}
        <div className="text-center">
          <p className="pt-4.5 font-medium">3</p>
          <div className="bg-gray-400 rounded-full size-20"></div>
          <h4 className="pt-1">덥다</h4>
        </div>
      </div>
      {/* 4등 이하 영역 */}
      {isOpen && (
        <div className="mt-4.5 transition-all duration-300 ease-in-out">
          {[4, 5, 6, 7, 8, 9, 10].map((rank) => (
            <div
              key={rank}
              className="flex gap-4 items-center border border-[var(--gray-50)] px-4 py-2 bg-[var(--gray-40)] rounded-[8px] mb-4"
            >
              <p className="font-medium text-[15px]">{rank}</p>
              <div className="bg-gray-800 rounded-full size-10"></div>
              <h4 className="text-[15px]">해삐</h4>
            </div>
          ))}
        </div>
      )}

      {/* 전체보기 버튼 */}
      <Button
        buttonStyle="green"
        className="w-full text-[15px] h-[38px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? '닫기' : '전체 랭킹 보기'}
      </Button>
    </div>
  );
}
