export async function geocodeAddress(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  console.log('지오코딩 요청 URL:', url); // 요청 URL 확인용

  const response = await fetch(url);
  const data = await response.json();

  console.log('지오코딩 응답:', data); // 응답 내용 확인용

  if (data.status !== 'OK') throw new Error('주소 변환 실패');

  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
}
