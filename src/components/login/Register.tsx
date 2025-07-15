'use client';

import { useState } from 'react';
import Input from '../ui/Input';
import Link from 'next/link';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { signupUser } from '@/libs/auth';
import { AxiosError } from 'axios';
import PasswordInput from '../ui/PasswrodInput';
// import PasswordInput from '../ui/PasswrodInput';

export default function Register() {
  const router = useRouter();
  const [agree, setAgree] = useState(false);

  const [form, setForm] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.nickname ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      return alert('모든 항목을 입력해주세요.');
    }

    if (!agree) return alert('이용약관에 동의해주세요.');
    if (form.password !== form.confirmPassword)
      return alert('비밀번호가 일치하지 않습니다.');

    try {
      await signupUser(form.name, form.nickname, form.email, form.password);
      alert('회원가입 성공!');
      router.push('/login');
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      console.error('회원가입 실패:', error.response?.data);
      alert(error.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <div className="min-h-screen w-full px-6 flex flex-col justify-center">
      {/* 로고 */}
      <h1 className="text-6xl font-[vitro-core] text-[var(--primary-300)] mb-12 text-center">
        MAPICK
      </h1>

      {/* 회원가입 */}
      <form
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
        onSubmit={handleSubmit}
      >
        {/* 이름 */}
        <Input
          label="이름"
          type="text"
          placeholder="이름을 입력하세요"
          value={form.name}
          onChange={handleChange}
          name="name"
        />

        {/* 닉네임 */}
        <Input
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력하세요"
          value={form.nickname}
          onChange={handleChange}
          name="nickname"
        />

        {/* 이메일 */}
        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          value={form.email}
          onChange={handleChange}
          name="email"
        />

        {/* 비밀번호 */}
        <div className="relative">
          <PasswordInput
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="relative">
          <PasswordInput
            placeholder="비밀번호를 다시 입력하세요"
            value={form.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
        </div>

        {/* 이용약관 동의 */}
        <label className="text-sm text-[var(--black)] flex items-center gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="accent-[#005C54] w-4 h-4"
            name="agree"
          />
          이용약관에 동의합니다.
        </label>

        {/* 회원가입 버튼 */}
        <Button
          buttonStyle="green"
          fullWidth
          className="h-[45px] py-2 rounded-lg text-sm"
          type="submit"
        >
          회원가입
        </Button>

        {/* 회원가입 안내 */}
        <p className="text-sm text-center text-[var(--black)]">
          이미 계정이 있으신가요?{' '}
          <Link
            href="/login"
            className="text-[var(--primary-300)] font-semibold cursor-pointer hover:underline"
          >
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
