import QuestCard from '@/components/ui/card/QuestCard';
import RoadMapCard from '@/components/ui/card/RoadMapCard';
import ShareMapCard from '@/components/ui/card/ShareMapCard';
import {
  QuestCardProps,
  RoadMapCardProps,
  ShareMapCardProps,
} from '@/types/type';

type SearchCategoryGroupProps = {
  title: string;
  cardType: 'sharemap' | 'roadmap' | 'quest';
  items: ShareMapCardProps[] | RoadMapCardProps[] | QuestCardProps[];
};
export default function SearchCategoryGroup({
  title,
  cardType,
  items,
}: SearchCategoryGroupProps) {
  // 결과 없으면 렌더링x
  if (items.length === 0) return null;

  return (
    <section className="mb-[30px] group">
      <div className="flex justify-between items-center mb-2.5">
        <h2 className="text-lg font-medium">{title}</h2>
        {/* <button className="opacity-0 group-hover:opacity-100 transition text-sm text-[var(--gray-300)] cursor-pointer">
          전체보기
        </button> */}
      </div>

      <div className="flex gap-2 flex-wrap">
        {items.map((item, idx) => {
          switch (cardType) {
            case 'sharemap':
              return (
                <ShareMapCard key={idx} {...(item as ShareMapCardProps)} />
              );
            case 'roadmap':
              return <RoadMapCard key={idx} {...(item as RoadMapCardProps)} />;
            case 'quest':
              return <QuestCard key={idx} {...(item as QuestCardProps)} />;
            default:
              return null;
          }
        })}
      </div>
    </section>
  );
}
