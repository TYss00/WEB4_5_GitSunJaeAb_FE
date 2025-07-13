'use client';

import { useRouter } from 'next/navigation';
import { CardListProps } from '@/types/type';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import RoadMapCard from '../ui/card/RoadMapCard';
import ShareMapCard from '../ui/card/ShareMapCard';
import QuestCard from '../ui/card/QuestCard';

export default function CardList({ type }: CardListProps) {
  const [sort, setSort] = useState<'recent' | 'popular'>('recent');
  const router = useRouter();

  const handleCardClick = (id: number) => {
    let basePath = '';
    if (type === 'roadmap') basePath = '/dashbord/roadmap/detail';
    else if (type === 'sharemap') basePath = '/dashbord/sharemap/detail';
    else if (type === 'quest') basePath = '/dashbord/quest/detail';

    router.push(`${basePath}/${id}`);
  };

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

      <div
        className={`grid ${
          type === 'sharemap' ? 'grid-cols-4' : 'grid-cols-3'
        } gap-[31px]`}
      >
        {[...Array(type === 'sharemap' ? 12 : 9)].map((_, i) => {
          const fakeId = i + 1;

          if (type === 'roadmap') {
            return (
              <div
                key={i}
                onClick={() => handleCardClick(fakeId)}
                className="cursor-pointer"
              >
                <RoadMapCard
                  category="여행"
                  title={`서울 투어 ${i + 1}`}
                  description="서울 명소를 여행하는 로드맵입니다."
                  hashtags={['서울', '여행', '명소']}
                  mapImageUrl="/map.png"
                  profileImgUrl="/assets/google.svg"
                  author="지지지"
                  viewCount={100}
                  shareCount={10}
                />
              </div>
            );
          } else if (type === 'sharemap') {
            return (
              <div
                key={i}
                onClick={() => handleCardClick(fakeId)}
                className="cursor-pointer"
              >
                <ShareMapCard
                  title={`공유 지도 ${i + 1}`}
                  mapImageUrl="/map.png"
                  participants={50}
                  isEvent={i % 2 === 0}
                />
              </div>
            );
          } else if (type === 'quest') {
            return (
              <div
                key={i}
                onClick={() => handleCardClick(fakeId)}
                className="cursor-pointer"
              >
                <QuestCard
                  isInProgress={i % 2 === 0}
                  mapImageUrl="/map.png"
                  title={'서울 퀘스트'}
                  description="광화문 근처의 포인트를 클리어해보세요."
                  hashtags={['광화문', '퀘스트', '도전']}
                  profileImgUrl="/assets/google.svg"
                  author="지지지"
                  deadLine="2025-07-20"
                />
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}
