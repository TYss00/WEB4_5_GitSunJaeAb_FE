const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error('환경 변수 NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.');
}

interface RequestOptions<B extends BodyInit | null | undefined = undefined>
  extends RequestInit {
  body?: B;
}

export async function api<T, B extends BodyInit | null | undefined = undefined>(
  endpoint: string,
  options: RequestOptions<B> = {}
): Promise<T> {
  const { body, headers, ...rest } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body,
    ...rest,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'API 요청 실패');
  }

  return res.json();
}

export const APIUrl = `${API_URL}`;
