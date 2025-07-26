import { useEffect, useState } from 'react';
import RecentSearchItem from './RecentSearchItem';
import {
  clearSearchHistory,
  getRecentSearches,
  removeSearchTerm,
} from '@/utils/searchHistory';
import { SearchRecord } from '@/types/search';

export default function RecentSearchList({
  onSelect,
}: {
  onSelect?: (term: string) => void;
}) {
  const [searches, setSearches] = useState<SearchRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecentSearches();
      setSearches(data);
    };
    fetchData();
  }, []);

  const handleClearAll = async () => {
    await clearSearchHistory();
    setSearches([]);
  };

  const handleRemove = async (term: string) => {
    await removeSearchTerm(term);
    setSearches((prev) => prev.filter((t) => t.keyword !== term));
  };

  return (
    <div className="w-[700px] h-[465px] m-auto px-2">
      <div className="flex justify-between items-center pt-5 pb-2 font-medium">
        <h3>최근 검색어</h3>
        {searches.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-[15px] cursor-pointer"
          >
            전체 삭제
          </button>
        )}
      </div>

      <div>
        {searches.length > 0 ? (
          searches.map((item) => (
            <RecentSearchItem
              key={item.id}
              term={item.keyword}
              date={item.createdAt.split('T')[0].replaceAll('-', '.')}
              onRemove={() => handleRemove(item.keyword)}
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
