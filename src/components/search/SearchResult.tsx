'use client';

import { useSearchParams } from 'next/navigation';
import SearchInput from './SearchInput';
import SearchResultSection from './SearchResultSection';

export default function SearchResult() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="pt-5">
      {/* 검색바 */}
      <SearchInput searchValue={query} />
      {/* 결과 전체 섹션 */}
      <SearchResultSection />
    </div>
  );
}
