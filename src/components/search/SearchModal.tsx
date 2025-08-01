'use client';

import { useRouter } from 'next/navigation';
import RecentSearchList from './RecentSearchList';
import SearchInput from './SearchInput';
import { SearchModalProps } from '@/types/search';

export default function SearchModal({ onClose }: SearchModalProps) {
  const router = useRouter();
  return (
    <>
      <div className="bg-[var(--white)] z-50 pt-5">
        <SearchInput onClose={onClose} />
        <RecentSearchList
          onSelect={(term) => {
            onClose();
            router.push(`/search?q=${encodeURIComponent(term)}`);
          }}
        />
      </div>
    </>
  );
}
