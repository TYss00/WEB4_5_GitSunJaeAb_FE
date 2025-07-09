'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function CardList() {
  const [sort, setSort] = useState<'recent' | 'popular'>('recent');

  return (
    <section className="w-full max-w-[1100px] mx-auto mt-[146px] px-4 pb-[186px]">
      <div className="flex justify-between items-center mb-[27px]">
        <div className="relative w-[190px]">
          <select className="w-full border border-[#E4E4E4] rounded-[5px] px-[12px] py-[10px] text-[16px] appearance-none">
            <option>전체</option>
            <option>이벤트</option>
            <option>사용자</option>
          </select>
          <ChevronDown
            className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none text-[#000000]"
            size={24}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSort('recent')}
            className={`px-4 py-2 text-[18px] font-bold ${
              sort === 'recent' ? ' text-[#005C54]' : 'text-[#9F9F9F] '
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setSort('popular')}
            className={`px-4 py-2 text-[18px] font-bold ${
              sort === 'popular' ? 'text-[#005C54]' : 'text-[#9F9F9F]'
            }`}
          >
            인기순
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[31px]">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-[250px] h-[350px] bg-gray-100 rounded-[10px] shadow"
          />
        ))}
      </div>
    </section>
  );
}
