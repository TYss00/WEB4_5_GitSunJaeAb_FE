'use client';

import Input from '../ui/Input';
import Link from 'next/link';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { getUser, loginUser } from '@/libs/auth';
import { AxiosError } from 'axios';
import PasswordInput from '../ui/PasswrodInput';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import { setAccessTokenToStore } from '@/utils/setAccessTokenToStore';
import Image from 'next/image';
import { toast } from 'react-toastify';

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  // 일반 로그인
  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      const accessToken = data.token?.accessToken;
      if (!accessToken) {
        toast.error('로그인 실패');
        return;
      }

      // 토큰 저장 및 Zustand 동기화
      await setAccessTokenToStore(accessToken);

      // 사용자 정보 수동 요청 → 캐시에 저장됨
      const user = await queryClient.fetchQuery({
        queryKey: ['user'],
        queryFn: getUser,
      });

      useAuthStore.getState().setUser(user);

      // 처음 로그인 시 카테고리 설정
      if (user.loginCount === 1) {
        router.push('/categories');
      } else if (user.role === 'ROLE_ADMIN') {
        router.push('/admin/report');
      } else {
        router.push('/dashbord');
      }

      toast.success('로그인 성공');
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || '로그인 실패');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error('이메일과 비밀번호를 입력해주세요.');
    }

    loginMutate(form);
  };

  // 구글 로그인
  const handleGoogleRedirectLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const redirectUri = 'http://localhost:3000/auth/google/callback';
    const scope = 'openid email profile';
    const responseType = 'id_token';
    const state = crypto.randomUUID(); // CSRF 방지용 (선택)
    const nonce = crypto.randomUUID(); // 보안 권장

    const googleUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=${responseType}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&nonce=${nonce}` +
      `&state=${state}`;

    window.location.href = googleUrl;
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
        onSubmit={handleSubmit}
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
          <PasswordInput
            value={form.password}
            onChange={handleChange}
            name="password"
          />
        </div>

        {/* 로그인 버튼 */}
        <Button
          buttonStyle="green"
          fullWidth
          className="h-[45px] py-2 rounded-lg text-sm"
          type="submit"
          disabled={isPending}
        >
          로그인
        </Button>

        {/* 구글 로그인 버튼 */}
        <Button
          buttonStyle="withIcon"
          fullWidth
          className="h-[45px] py-2 rounded-lg text-sm gap-2"
          onClick={handleGoogleRedirectLogin}
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
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
}
