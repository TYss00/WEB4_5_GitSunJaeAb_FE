'use client';

import { addSearchTerm } from '@/utils/searchHistory';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type SearchInputProps = {
  onClose?: () => void;
  searchValue?: string;
};

export default function SearchInput({
  onClose,
  searchValue = '',
}: SearchInputProps) {
  const [search, setSearch] = useState(searchValue);
  const router = useRouter();

  const handleSearch = () => {
    if (!search.trim()) return;

    // 저장
    addSearchTerm(search.trim());

    // 이동
    router.push(`/search?q=${encodeURIComponent(search.trim())}`);

    // 초기화
    // setSearch('');

    // 모달 닫기
    onClose?.();
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="relative w-[700px] m-auto">
      <input
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-3 py-2 border-b border-b-[var(--gray-100)] 
         focus:outline-none focus:border-b-[var(--primary-300)] "
      ></input>
      <Search
        size={18}
        color="var(--gray-200)"
        strokeWidth={1.5}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
}
