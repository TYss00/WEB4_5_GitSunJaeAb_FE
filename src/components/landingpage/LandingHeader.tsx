import Link from 'next/link';

export default function LandingHeader() {
  return (
    <header
      className="w-full h-20 px-11 flex items-center justify-between 
            bg-[var(--white)]/95 backdrop-blur-md fixed z-50"
    >
      {/* 로고 */}
      <Link
        href="/"
        className="text-3xl text-[var(--primary-300)] font-[vitro-core]"
      >
        MAPICK
      </Link>

      {/* 로그인 */}
      <Link href="/login" className="text-[18px]">
        LOGIN
      </Link>
    </header>
  );
}
