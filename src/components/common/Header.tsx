'use client';

import { Bell, CircleUserRound, Search } from 'lucide-react'; // 아이콘 라이브러리
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full h-20 px-11 flex items-center justify-between bg-white">
      {/* 로고 */}
      <Link href="/" className="text-3xl font-bold text-[#005C54]">
        MAPICK
      </Link>

      {/* 메뉴들 */}
      <nav>
        <ul className="flex items-center gap-[130px] text-lg text-black">
          <li className="hover:text-[#005C54] transition cursor-pointer">
            로드맵
          </li>
          <li className="hover:text-[#005C54] transition cursor-pointer">
            공유지도
          </li>
          <li className="hover:text-[#005C54] transition cursor-pointer">
            퀘스트
          </li>
        </ul>
      </nav>

      {/* 아이콘들 */}
      <div className="flex items-center gap-6 text-black">
        <Bell
          size={25}
          strokeWidth={1.7}
          className="cursor-pointer hover:text-[#005C54]"
        />
        <Search
          size={25}
          strokeWidth={1.7}
          className="cursor-pointer hover:text-[#005C54]"
        />
        <CircleUserRound
          size={25}
          strokeWidth={1.7}
          className="cursor-pointer hover:text-[#005C54]"
        />
      </div>
    </header>
  );
}
