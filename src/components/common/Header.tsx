'use client';

import { Bell, CircleUserRound, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: '로드맵', href: '/dashbord/roadmap' },
    { name: '공유지도', href: '/dashbord/sharemap' },
    { name: '퀘스트', href: '/dashbord/quest' },
  ];

  return (
    <header className="w-full h-20 px-11 flex items-center justify-between bg-[var(--white)]">
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

      {/* 아이콘들 */}
      <div className="flex items-center gap-6 text-[var(--black)]">
        <Bell
          size={25}
          strokeWidth={1.7}
          className="cursor-pointer hover:text-[var(--primary-300)]"
        />
        <Search
          size={25}
          strokeWidth={1.7}
          className="cursor-pointer hover:text-[var(--primary-300)]"
        />
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
    </header>
  );
}
