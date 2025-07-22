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
  const markers = useStore((state) => state.markers);

  const mapRef = useRef<google.maps.Map | null>(null);

  const handleClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      console.log('클릭 위치:', lat, lng);

      addMarker({ lat, lng });
    },
    [addMarker]
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
        {Object.entries(markers).map(([id, marker]) => (
          <MarkerF key={id} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </div>
  );
}
