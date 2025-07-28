import RecentSearchItem from './RecentSearchItem';
import {
  useClearSearchHistory,
  useRecentSearches,
  useRemoveSearchTerm,
} from '@/hooks/useRecentSearches';

export default function RecentSearchList({
  onSelect,
}: {
  onSelect?: (term: string) => void;
}) {
  const { data: searches = [], isLoading } = useRecentSearches();
  const clearMutation = useClearSearchHistory();
  const removeMutation = useRemoveSearchTerm();

  return (
    <div className="w-[700px] h-[465px] m-auto px-2">
      <div className="flex justify-between items-center pt-5 pb-2 font-medium">
        <h3>최근 검색어</h3>
        {searches.length > 0 && (
          <button
            onClick={() => clearMutation.mutate()}
            className="text-[15px] cursor-pointer"
          >
            전체 삭제
          </button>
        )}
      </div>

      <div>
        {isLoading ? (
          <div className="flex flex-col gap-2 py-3">
            {[1].map((i) => (
              <div
                key={i}
                className="w-[600px] h-[20px] bg-gray-200 animate-pulse rounded"
              />
            ))}
          </div>
        ) : searches.length > 0 ? (
          searches.map((item) => (
            <RecentSearchItem
              key={item.id}
              term={item.keyword}
              date={item.createdAt.split('T')[0].replaceAll('-', '.')}
              onRemove={() => removeMutation.mutate(item.keyword)}
              onSelect={onSelect}
            />
          ))
        ) : (
          <p className="text-[var(--gray-200)] text-sm py-3 text-left">
            검색 내역이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
