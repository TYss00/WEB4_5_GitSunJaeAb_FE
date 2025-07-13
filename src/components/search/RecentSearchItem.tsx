import { SearchItemProps } from '@/types/type';
import { addSearchTerm } from '@/utils/searchHistory';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RecentSearchItem({
  term,
  date,
  onRemove,
  onSelect,
}: SearchItemProps & { onSelect?: (term: string) => void }) {
  const router = useRouter();

  const handleSearch = () => {
    // 다시 최근 검색어 갱신
    addSearchTerm(term);

    if (onSelect) {
      // 모달 닫고 이동
      onSelect(term);
    } else {
      router.push(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  return (
    <div className="flex justify-between py-2">
      {/* 검색 아이콘 + 최근 검색어 */}
      <div
        onClick={handleSearch}
        className="flex gap-1 items-center cursor-pointer"
      >
        <Search size={18} color="var(--black)" strokeWidth={1.5} className="" />
        <p>{term}</p>
      </div>

      {/* 검색 날짜 + 개별 삭제 아이콘 */}
      <div className="flex gap-1 items-center">
        <p className="text-sm">{date}</p>
        <X
          size={18}
          strokeWidth={1.5}
          className="text-[var(--black)] cursor-pointer hover:text-[var(--red)] recent-search-item"
          onMouseDown={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        ></X>
      </div>
    </div>
  );
}
