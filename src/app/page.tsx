import Link from 'next/link'

export default async function page() {
  return (
    <>
      <div className="flex gap-4">
        <Link href="/login">
          <button>로그인</button>
        </Link>

        <Link href="/categories">
          <button>카테고리</button>
        </Link>

        <Link href="/dashbord/main">
          <button>메인대시보드</button>
        </Link>

        <Link href="/loadmap/detail/1">
          <button>공유지도 디테일</button>
        </Link>

        <Link href="/loadmap/write">
          <button>공유지도 작성페이지</button>
        </Link>
      </div>
      <h1>홈화면입니다.</h1>
    </>
  )
}
