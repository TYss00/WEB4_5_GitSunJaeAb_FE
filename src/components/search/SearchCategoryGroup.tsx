import QuestCard from '@/components/ui/card/QuestCard';
import RoadMapCard from '@/components/ui/card/RoadMapCard';
import ShareMapCard from '@/components/ui/card/ShareMapCard';
import {
  QuestCardProps,
  RoadMapCardProps,
  ShareMapCardProps,
} from '@/types/type';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category');
  const isCategoryPage = category === cardType;

  // 개수 제한은 전체보기 페이지가 아닐 때만 적용
  const limitedItems = !isCategoryPage
    ? cardType === 'sharemap'
      ? items.slice(0, 4)
      : items.slice(0, 3)
    : items;

  if (limitedItems.length === 0) return null;

  // 결과 없으면 렌더링x
  if (items.length === 0) return null;

  return (
    <section className="mb-13 group">
      <div className="flex justify-between items-center mb-2.5">
        <h2 className="text-lg font-medium">{title}</h2>
        {!isCategoryPage ? (
          <Link
            href={`/search?q=${encodeURIComponent(query)}&category=${cardType}`}
            className="opacity-0 group-hover:opacity-100 transition text-sm text-[var(--gray-300)] cursor-pointer"
          >
            전체보기
          </Link>
        ) : (
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            className="transition text-sm text-[var(--gray-300)] hover:text-[var(--black)] cursor-pointer"
          >
            전체검색결과로 돌아가기
          </Link>
        )}
      </div>

      <div className="flex justify-between flex-wrap gap-y-4">
        {limitedItems.map((item, idx) => {
          switch (cardType) {
            case 'roadmap':
              return <RoadMapCard key={idx} {...(item as RoadMapCardProps)} />;
            case 'sharemap':
              return (
                <ShareMapCard key={idx} {...(item as ShareMapCardProps)} />
              );
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
