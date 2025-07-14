'use client';

import { Bell, CircleUserRound, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import SearchModal from '../search/SearchModal';
import { useClickOut } from '@/hooks/useClickOut';
import Notification from '../notification/Notification';
import { usePathname } from 'next/navigation';
import { HeaderProps } from '@/types/type';

export default function Header({ isAdmin = false }: HeaderProps) {
  const pathname = usePathname();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const notiRef = useRef<HTMLDivElement>(null);

  useClickOut(searchRef, () => setIsSearchOpen(false));
  useClickOut(notiRef, () => setIsNotiOpen(false));

  const handleSearch = () => setIsSearchOpen((prev) => !prev);
  const handleNoti = () => setIsNotiOpen((prev) => !prev);

  const userNavItems = [
    { name: '로드맵', href: '/dashbord/roadmap' },
    { name: '공유지도', href: '/dashbord/sharemap' },
    { name: '퀘스트', href: '/dashbord/quest' },
  ];

  const adminNavItems = [
    { name: '신고 내역', href: '/admin/report' },
    { name: '사용자 관리', href: '/admin/users' },
    { name: '기타 관리', href: '/admin/manage' },
    { name: '공유지도', href: '/admin/sharemap' },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <header className="w-full h-20 px-11 flex items-center justify-between bg-[var(--white)] relative">
      {/* 로고 */}
      <Link
        href="/"
        className="text-3xl text-[var(--primary-300)] font-[vitro-core]"
      >
        MAPICK
      </Link>

      {/* 네비게이션 메뉴 */}
      <nav>
        <ul className="flex items-center gap-[60px] text-lg text-[var(--black)]">
          {navItems.map(({ name, href }) => {
            const isActive = pathname.startsWith(href);
            return (
              <li
                key={href}
                className={`transition cursor-pointer ${
                  isActive
                    ? 'text-[var(--primary-300)]'
                    : 'hover:text-[var(--primary-300)]'
                }`}
              >
                <Link href={href}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 우측 아이콘 */}
      <div className="flex items-center gap-6 text-[var(--black)]">
        {/* 알림 아이콘 */}
        <Bell
          size={25}
          strokeWidth={1.7}
          className="cursor-pointer hover:text-[var(--primary-300)]"
          onClick={handleNoti}
        />
        {!isAdmin && (
          <>
            {/* 검색 아이콘 or 닫기 아이콘 */}
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
          </>
        )}

        {/* 공통: 마이페이지 아이콘 */}
        <Link href="/mypage">
          <CircleUserRound
            size={25}
            strokeWidth={1.7}
            className={`cursor-pointer hover:text-[var(--primary-300)] ${
              pathname.startsWith('/mypage') ? 'text-[var(--primary-300)]' : ''
            }`}
          />
        </Link>
      </div>

      {/* 알림 모달 */}
      {isNotiOpen && (
        <div ref={notiRef} className="absolute top-[78px] right-[80px] z-50">
          <Notification onClose={() => setIsNotiOpen(false)} />
        </div>
      )}

      {/* 검색 모달 */}
      {!isAdmin && isSearchOpen && (
        <div
          ref={searchRef}
          className="absolute top-[80px] left-0 w-full bg-[var(--white)] shadow-md z-50"
        >
          <SearchModal onClose={() => setIsSearchOpen(false)} />
        </div>
      )}
    </header>
  );
}
