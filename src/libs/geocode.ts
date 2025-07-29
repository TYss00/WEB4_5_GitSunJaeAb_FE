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

  const fullAddress = data.results[0].formatted_address;
  // 행정구역 (시) 추출
  // const cityComponent = result.address_components.find((comp: any) =>
  //   comp.types.includes('administrative_area_level_1')
  // );
  // const city = cityComponent?.long_name || 'Unknown';
  console.log('위도:', lat);
  console.log('경도:', lng);
  console.log('시:', fullAddress);

  return { lat, lng, address: fullAddress };
}

export async function reverseGeocode(lat: number, lng: number) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== 'OK' || !data.results.length) {
    throw new Error('주소 변환 실패');
  }

  return data.results[0].formatted_address;
}
