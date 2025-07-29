'use client';

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

  const handleSearch = async () => {
    await addSearchTerm(term);

    if (onSelect) {
      onSelect(term);
    } else {
      router.push(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  return (
    <div className="flex justify-between py-2">
      <div
        onClick={handleSearch}
        className="flex gap-1 items-center cursor-pointer"
      >
        <Search size={18} strokeWidth={1.5} />
        <p>{term}</p>
      </div>

      <div className="flex gap-1 items-center">
        <p className="text-sm">{date}</p>
        <X
          size={18}
          strokeWidth={1.5}
          className="cursor-pointer hover:text-[var(--red)]"
          onMouseDown={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      </div>
    </div>
  );
}
