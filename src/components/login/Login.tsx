'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Input from '../ui/Input';
import Link from 'next/link';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/libs/auth';
import { AxiosError } from 'axios';
// import Cookies from 'js-cookie';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePassword = () => setPasswordVisible((prev) => !prev);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(form.email, form.password);

      console.log('로그인 응답 전체:', response);
      const accessToken = response.token?.accessToken;

      if (accessToken) {
        // localStorage.setItem('accessToken', accessToken);
        // console.log(
        //   '로그인 성공. accessToken localStorage에 저장됨:',
        //   accessToken
        // );
        router.push('/');
      } else {
        console.warn('accessToken이 응답에 없음. 로그인 실패 처리 필요');
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error('로그인 에러:', error);
      alert(error.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <div className="min-h-screen w-full px-6 py-16 flex flex-col justify-center">
      {/* 로고 */}
      <h1 className="text-6xl text-[var(--primary-300)] font-[vitro-core] mb-12 text-center">
        MAPICK
      </h1>

      {/* 로그인 */}
      <form
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
        onSubmit={handleLogin}
      >
        {/* 이메일 */}
        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        {/* 비밀번호 */}
        <div className="relative">
          <Input
            label="비밀번호"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="비밀번호를 입력하세요"
            className="pr-10"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 bottom-3 text-[var(--primary-300)]"
          >
            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* 로그인 버튼 */}
        <Button
          buttonStyle="green"
          fullWidth
          className="h-[45px] py-2 rounded-lg text-sm"
          type="submit"
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
      </form>
    </div>
  );
}
