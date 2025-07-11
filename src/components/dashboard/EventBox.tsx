'use client';

import { CardListProps } from '@/types/type';
import ShareMapCard from '../ui/card/ShareMapCard';
import QuestCard from '../ui/card/QuestCard';

export default function EventBox({ type }: CardListProps) {
  return (
    <section className="relative w-full flex justify-center mt-[-50px] z-10">
      <div className="bg-[#EBF2F2] rounded-[100px] shadow-lg px-10 py-8 w-[90%] max-w-[1000px]">
        <h2 className="text-[30px] text-[#005C54] font-semibold text-center">
          Event
        </h2>
        <div className="mx-auto mt-[19px] mb-[31px] w-[136px] h-[2px] bg-[#005C54] rounded-full" />
        <div className="flex gap-[18px] justify-center">
          {[...Array(3)].map((_, i) =>
            type === 'sharemap' ? (
              <ShareMapCard
                key={i}
                title={`공유 지도 ${i + 1}`}
                mapImageUrl="/map.png"
                participants={50}
                isEvent={true}
              />
            ) : type === 'quest' ? (
              <QuestCard
                key={i}
                isInProgress={i % 2 === 0}
                mapImageUrl="/map.png"
                title={`서울 퀘스트 ${i + 1}`}
                description="광화문 근처의 포인트를 클리어해보세요."
                hashtags={['광화문', '퀘스트', '도전']}
                profileImgUrl="/assets/google.svg"
                author="지지지"
                deadLine="2025-07-20"
              />
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
