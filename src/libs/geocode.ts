export async function geocodeAddress(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== 'OK') throw new Error('주소 변환 실패');

  const { lat, lng } = data.results[0].geometry.location;

  const fullAddress = data.results[0].formatted_address;

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
