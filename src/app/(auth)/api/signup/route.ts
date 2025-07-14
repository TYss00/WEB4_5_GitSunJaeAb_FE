import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { APIUrl } from '@/libs/api';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await axios.post(`${APIUrl}/auth/signup`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    return NextResponse.json(
      { message: error.response?.data?.message || '회원가입 실패' },
      { status: error.response?.status || 500 }
    );
  }
}
