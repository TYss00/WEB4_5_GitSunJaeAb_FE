'use client';

import { addSearchTerm } from '@/utils/searchHistory';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import RecentSearchList from './RecentSearchList';
import { useClickOut } from '@/hooks/useClickOut';
import { SearchInputProps } from '@/types/search';

export default function SearchInput({
  onClose,
  searchValue = '',
  onSearchComplete,
}: SearchInputProps) {
  const [search, setSearch] = useState(searchValue);
  const [showRecent, setShowRecent] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOut(containerRef, () => setShowRecent(false));

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  const handleSearch = async () => {
    if (!search.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addSearchTerm(search.trim());
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setShowRecent(false);
      onClose?.();
      onSearchComplete?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleRecentSelect = (term: string) => {
    setSearch(term);
    setShowRecent(false);

    router.push(`/search?q=${encodeURIComponent(term)}`);
    onClose?.();
  };

  const handleSearchFocus = () => {
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
      />
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
