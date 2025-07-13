'use client';

import { Bell, CircleUserRound, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import SearchModal from './search/SearchModal';
import { useClickOut } from '@/hooks/useClickOut';

export default function Header() {
  // 검색 아이콘 클릭 시 검색 모달 보여지도록
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useClickOut(modalRef, () => setIsSearchOpen(false));

  const handleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <header className="w-full h-20 px-11 flex items-center justify-between bg-[var(--white)] relative">
      {/* 로고 */}
      <Link
        href="/"
        className="text-3xl text-[var(--primary-300)] font-[vitro-core]"
      >
        MAPICK
      </Link>

      {/* 메뉴들 */}
      <nav>
        <ul className="flex items-center gap-[130px] text-lg text-[var(--black)]">
          <li className="hover:text-[var(--primary-300)] transition cursor-pointer">
            <Link href="/dashbord/load/main">로드맵</Link>
          </li>
          <li className="hover:text-[var(--primary-300)] transition cursor-pointer">
            <Link href="/dashbord/sharedmap/main">공유지도</Link>
          </li>
          <li className="hover:text-[var(--primary-300)] transition cursor-pointer">
            <Link href="/dashbord/quest/main">퀘스트</Link>
          </li>
        </ul>
      </nav>

      {/* 아이콘들 */}
      <div className="flex items-center gap-6 text-[var(--black)]">
        <Bell
          size={25}
          strokeWidth={1.7}
          className="cursor-pointer hover:text-[var(--primary-300)]"
        />
        {/* 검색 아이콘 / 닫기 아이콘 */}
        {isSearchOpen ? (
          <X
            size={25}
            strokeWidth={1.7}
            className="cursor-pointer hover:text-[var(--primary-300)]"
            onClick={() => setIsSearchOpen(false)}
          />
        ) : (
          <Search
            size={25}
            strokeWidth={1.7}
            className="cursor-pointer hover:text-[var(--primary-300)]"
            onClick={handleSearch}
          />
        )}
        <Link href="/mypage">
          <CircleUserRound
            size={25}
            strokeWidth={1.7}
            className="cursor-pointer hover:text-[var(--primary-300)]"
          />
        </Link>
      </div>

      {/* 검색 모달 추가 */}
      {isSearchOpen && (
        <div
          ref={modalRef}
          className="absolute top-[80px] left-0 w-full bg-[var(--white)] shadow-md z-50"
        >
          <SearchModal onClose={() => setIsSearchOpen(false)} />
        </div>
      )}
    </header>
  );
}
