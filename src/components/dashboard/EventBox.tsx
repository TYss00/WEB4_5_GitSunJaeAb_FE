import { CardListProps } from '@/types/type';
import ShareMapCard from '../ui/card/ShareMapCard';
import QuestCard from '../ui/card/QuestCard';
import { DashboardShareMapCardProps } from '@/types/share';

interface EventBoxProps extends CardListProps {
  data?: DashboardShareMapCardProps[];
}

export default function EventBox({ type, data }: EventBoxProps) {
  return (
    <section className="relative w-full flex justify-center mt-[-50px] z-10">
      <div className="bg-[#EBF2F2] rounded-[100px] shadow-lg px-10 py-8 w-[90%] max-w-[1000px]">
        <h2 className="text-[30px] text-[#005C54] font-semibold text-center">
          Hot
        </h2>
        <div className="mx-auto mt-[19px] mb-[31px] w-[136px] h-[2px] bg-[#005C54] rounded-full" />
        <div className="flex gap-[18px] justify-center">
          {type === 'sharemap' && data
            ? data.map((item) => (
                <ShareMapCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  mapImageUrl={item.thumbnail}
                  participants={item.participants}
                  category={item.categoryName}
                  isEvent={true}
                />
              ))
            : type === 'quest'
            ? [...Array(3)].map((_, i) => (
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
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
