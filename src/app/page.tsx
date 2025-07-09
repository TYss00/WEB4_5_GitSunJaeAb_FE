import Link from 'next/link';

export default async function page() {
  return (
    <>
      <div className="flex gap-4">
        <Link href="/login">
          <button>로그인</button>
        </Link>

        <Link href="/inputtest">
          <button>인풋테스트</button>
        </Link>
      </div>
      <h1>홈화면입니다.</h1>
    </>
  );
}
