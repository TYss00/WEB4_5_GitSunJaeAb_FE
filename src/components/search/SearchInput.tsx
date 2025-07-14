'use client';

import { addSearchTerm } from '@/utils/searchHistory';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import RecentSearchList from './RecentSearchList';
import { useClickOut } from '@/hooks/useClickOut';

type SearchInputProps = {
  onClose?: () => void;
  searchValue?: string;
  onSearchComplete?: () => void;
};

export default function SearchInput({
  onClose,
  searchValue = '',
  onSearchComplete,
}: SearchInputProps) {
  const [search, setSearch] = useState(searchValue);
  const [showRecent, setShowRecent] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 최근 검색어 리스트 닫기
  useClickOut(containerRef, () => setShowRecent(false));

  // searchValue 가 바뀔 경우 상태 반영
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  const handleSearch = () => {
    if (!search.trim()) return;

    // 저장
    addSearchTerm(search.trim());

    // 이동
    router.push(`/search?q=${encodeURIComponent(search.trim())}`);

    setShowRecent(false);

    // 모달 닫기
    onClose?.();

    onSearchComplete?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRecentSelect = (term: string) => {
    setSearch(term);
    setShowRecent(false);
    addSearchTerm(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
    onClose?.();
  };

  const handleSearchFocus = () => {
    // if (search.trim() !== '') {
    //   setShowRecent(true);
    // }
    setShowRecent(true);
  };

  return (
    <div ref={containerRef} className="relative w-[700px] m-auto">
      <input
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowRecent(true);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setIsFocused(true);
          handleSearchFocus();
        }}
        onBlur={() => setIsFocused(false)}
        className="w-full px-2 py-2 border-b border-b-[var(--gray-100)] 
         focus:outline-none focus:border-b-[var(--primary-300)] "
      ></input>
      <Search
        size={18}
        color={
          isFocused || search.trim() ? 'var(--primary-300)' : 'var(--gray-200)'
        }
        strokeWidth={1.5}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-200"
        onClick={handleSearch}
      />

      {showRecent && (
        <div className="absolute left-1/2 -translate-x-1/2 bg-[var(--white)] w-screen h-[480px] shadow-md z-50">
          <div className="w-[800px] m-auto">
            <RecentSearchList onSelect={handleRecentSelect} />
          </div>
        </div>
      )}
    </div>
  );
}
