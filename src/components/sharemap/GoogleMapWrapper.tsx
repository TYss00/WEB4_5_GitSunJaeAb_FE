'use client';

import useStore from '@/store/useStore';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useCallback, useRef } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.5665, // 서울 중심
  lng: 126.978,
};

export default function GoogleMapWrapper() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!, // .env 설정 필수
  });

  const addMarker = useStore((state) => state.addMarker);
  const selectedLayerId = useStore((state) => state.selectedLayerId);
  const getFilteredMarkers = useStore((state) => state.filteredMarkers); // 함수로 가져오기

  const filteredMarkers = getFilteredMarkers(); // 여기서 호출

  const mapRef = useRef<google.maps.Map | null>(null);

  const handleClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      addMarker({
        lat,
        lng,
        name: '',
        description: '',
        color: '#FF0000',
        imageUrl: '',
        layer: selectedLayerId ?? 'unassigned', // ❗ string 타입으로 변경했으므로 string 사용
      });
    },
    [addMarker, selectedLayerId]
  );

  if (!isLoaded) return <div>지도 불러오는 중...</div>;

  return (
    <div className="w-full h-full relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={handleClick}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {filteredMarkers.map((marker) => (
          <MarkerF
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
