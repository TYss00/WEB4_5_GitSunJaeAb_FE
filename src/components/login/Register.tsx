'use client';

import { useState } from 'react';
import Input from '../ui/Input';
import Link from 'next/link';
import Button from '../ui/Button';

export default function Register() {
  const [agree, setAgree] = useState(false);

  return (
    <div className="min-h-screen w-full px-6 flex flex-col justify-center">
      {/* 로고 */}
      <h1 className="text-6xl font-bold text-[#005C54] mb-12 text-center">
        MAPICK
      </h1>

      {/* 회원가입 */}
      <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
        {/* 닉네임 */}
        <Input label="닉네임" type="text" placeholder="닉네임을 입력하세요" />

        {/* 이메일 */}
        <Input label="이메일" type="email" placeholder="이메일을 입력하세요" />

        {/* 비밀번호 */}
        <div className="relative">
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="pr-10"
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="relative">
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            className="pr-10"
          />
        </div>

        {/* 이용약관 동의 */}
        <label className="text-sm text-black flex items-center gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="accent-[#005C54] w-4 h-4"
          />
          이용약관에 동의합니다.
        </label>

        {/* 회원가입 버튼 */}
        <Button
          buttonStyle="green"
          fullWidth
          className="h-[45px] py-2 rounded-lg text-sm"
        >
          회원가입
        </Button>

        {/* 회원가입 안내 */}
        <p className="text-sm text-center text-black">
          이미 계정이 있으신가요?{' '}
          <Link
            href="/login"
            className="text-[#005C54] font-semibold cursor-pointer hover:underline"
          >
            로그인하러가기
          </Link>
        </p>
      </div>
    </div>
  );
}
