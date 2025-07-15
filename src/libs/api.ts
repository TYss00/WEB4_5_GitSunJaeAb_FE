const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('환경 변수 NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.');
}

interface RequestOptions extends RequestInit {
  body?: any;
}

export async function api<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'API 요청 실패');
  }

  return res.json();
}
