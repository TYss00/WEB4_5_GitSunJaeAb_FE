'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Input from '../ui/Input';
import MypageLayer from './MypageLayer';
import MypagePost from './MypagePost';

export default function Mypage() {
  const [activeTab, setActiveTab] = useState('작성글');

  return (
    <section className="w-full bg-[#F6F6F6] px-48 pt-6 pb-15">
      <div className="flex justify-between items-center mb-10">
        {/* 메뉴 */}
        <ul className="flex gap-8 text-lg text-[#606060] font-medium">
          {['작성글', '참여글', '좋아요글', '레이어'].map((tab) => (
            <li
              key={tab}
              className={`pb-1 cursor-pointer border-b-2 transition-all ${
                activeTab === tab
                  ? 'text-[#005C54] border-[#005C54]'
                  : 'text-[#606060] border-transparent'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>

        {/* 검색 */}
        <div className="relative">
          <Input
            className="w-[250px] bg-white border-white pr-10"
            placeholder="검색어를 입력해주세요"
          />
          <Search
            size={16}
            strokeWidth={3}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9F9F9F]"
          />
        </div>
      </div>

      {/* 카드 or 테이블 */}
      <div className="overflow-hidden mt-4">
        {activeTab === '레이어' ? <MypageLayer /> : <MypagePost />}
      </div>
    </section>
  );
}
