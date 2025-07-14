import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { APIUrl } from '@/libs/api';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await axios.post(`${APIUrl}/auth/signin`, body, {
      headers: { 'Content-Type': 'application/json' },
    });

    const { accessToken, refreshToken } = response.data.token;

    const res = NextResponse.json({ message: '로그인 성공' });

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return res;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return NextResponse.json(
      { message: error.response?.data?.message || '로그인 실패' },
      { status: error.response?.status || 500 }
    );
  }
}
