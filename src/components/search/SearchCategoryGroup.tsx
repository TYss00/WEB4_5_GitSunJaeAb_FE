import QuestCard from '@/components/ui/card/QuestCard';
import RoadMapCard from '@/components/ui/card/RoadMapCard';
import ShareMapCard from '@/components/ui/card/ShareMapCard';
import { SearchCategoryGroupProps } from '@/types/search';
import {
  QuestCardProps,
  RoadMapCardProps,
  ShareMapCardProps,
} from '@/types/type';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SearchCategoryGroup({
  title,
  cardType,
  items,
  query,
}: SearchCategoryGroupProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const isCategoryPage = category === cardType;

  const columnCount = cardType === 'sharemap' ? 4 : 3;

  const limitedItems = !isCategoryPage ? items.slice(0, columnCount) : items;

  const emptySlotCount =
    limitedItems.length < columnCount ? columnCount - limitedItems.length : 0;

  return (
    <section className="mb-13 group px-2.5">
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

      {limitedItems.length === 0 ? (
        <p className="text-sm text-[var(--gray-300)]">
          &lsquo;{query}&rsquo; 관련 {title} 검색 결과가 없습니다.
        </p>
      ) : (
        <div
          className={`grid gap-x-6 gap-y-4 ${
            columnCount === 4 ? 'grid-cols-4' : 'grid-cols-3'
          }`}
        >
          {limitedItems.map((item, idx) => {
            switch (cardType) {
              case 'roadmap':
                return (
                  <RoadMapCard key={idx} {...(item as RoadMapCardProps)} />
                );
              case 'sharemap':
                return (
                  <ShareMapCard
                    category={''}
                    key={idx}
                    {...(item as ShareMapCardProps)}
                  />
                );
              case 'quest':
                return <QuestCard key={idx} {...(item as QuestCardProps)} />;
              default:
                return null;
            }
          })}

          {/* 빈 칸 채우기 */}
          {Array.from({ length: emptySlotCount }).map((_, idx) => (
            <div key={`empty-${idx}`} />
          ))}
        </div>
      )}
    </section>
  );
}
