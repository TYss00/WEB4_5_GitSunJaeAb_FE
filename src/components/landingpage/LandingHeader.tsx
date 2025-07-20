'use client';

import { useRouter } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LandingHeader() {
  const router = useRouter();

  const handleRouter = (path: string) => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    router.push(path);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="w-full h-20 px-11 flex items-center justify-between 
            bg-[var(--white)]/95 backdrop-blur-md fixed z-50"
    >
      {/* 로고 */}
      <button
        onClick={handleScrollTop}
        className="text-3xl text-[var(--primary-300)] font-[vitro-core] cursor-pointer"
      >
        MAPICK
      </button>

      {/* 로그인 */}
      <button
        onClick={() => handleRouter('/login')}
        className="text-[18px] font-medium rounded-[20px] px-3.5 py-[5px] 
        border border-[var(--primary-300)] text-[var(--primary-300)]
        hover:bg-[var(--primary-300)] hover:text-[var(--white)] transition-all cursor-pointer"
      >
        LOGIN
      </button>
    </header>
  );
}
