'use client';

import Image from 'next/image';
import Input from '../ui/Input';
import Link from 'next/link';
import Button from '../ui/Button';
import PasswordInput from '../ui/PasswrodInput';

export default function Login() {
  return (
    <div className="min-h-screen w-full px-6 py-16 flex flex-col justify-center">
      {/* 로고 */}
      <h1 className="text-6xl text-[var(--primary-300)] font-[vitro-core] mb-12 text-center">
        MAPICK
      </h1>

      {/* 로그인 */}
      <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
        {/* 이메일 */}
        <Input label="이메일" type="email" placeholder="이메일을 입력하세요" />

        {/* 비밀번호 */}
        <div className="relative">
          <PasswordInput />
        </div>

        {/* 로그인 버튼 */}
        <Button
          buttonStyle="green"
          fullWidth
          className="h-[45px] py-2 rounded-lg text-sm"
        >
          로그인
        </Button>

        {/* 구글 로그인 버튼 */}
        <Button
          buttonStyle="withIcon"
          fullWidth
          className="h-[45px] py-2 rounded-lg text-sm gap-2"
          icon={
            <Image
              src="/assets/google.svg"
              alt="Google"
              width={18}
              height={18}
            />
          }
        >
          구글 계정으로 로그인
        </Button>

        {/* 회원가입 안내 */}
        <p className="text-sm text-center text-[var(--black)]">
          계정이 없으신가요?{' '}
          <Link
            href="/register"
            className="text-[var(--primary-300)] font-semibold cursor-pointer hover:underline"
          >
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
