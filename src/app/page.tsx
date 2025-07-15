import Link from 'next/link';

export default async function page() {
  return (
    <>
      <div className="flex gap-4">
        <Link href="/landing">
          <button>랜딩페이지</button>
        </Link>

        <Link href="/login">
          <button>로그인</button>
        </Link>

        <Link href="/categories">
          <button>카테고리</button>
        </Link>

        <Link href="/dashbord">
          <button>메인대시보드</button>
        </Link>

        <Link href="/admin/report">
          <button>관리자페이지</button>
        </Link>

        <Link href="/123">
          <button>404페이지</button>
        </Link>
      </div>
    </>
  );
}
