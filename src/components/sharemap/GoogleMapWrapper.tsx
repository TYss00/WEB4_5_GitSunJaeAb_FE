'use client';

import { reverseGeocode } from '@/libs/geocode';
import useShareStore from '@/store/useShareStore';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.5665,
  lng: 126.978,
};

interface GoogleMapWrapperProps {
  mapRef: React.RefObject<google.maps.Map | null>;
}

export default function GoogleMapWrapper({ mapRef }: GoogleMapWrapperProps) {
  const addMarker = useShareStore((state) => state.addMarker);
  const selectedLayerId = useShareStore((state) => state.selectedLayerId);
  const getFilteredMarkers = useShareStore((state) => state.filteredMarkers); // 함수로 가져오기

  const filteredMarkers = getFilteredMarkers(); // 여기서 호출

  const handleClick = useCallback(
    async (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      if (
        !selectedLayerId ||
        selectedLayerId === 'all' ||
        isNaN(Number(selectedLayerId))
      ) {
        toast.error('마커를 추가하려면 먼저 레이어를 선택하세요.');
        return;
      }

      let address = '주소를 불러올 수 없습니다';
      try {
        address = await reverseGeocode(lat, lng);
      } catch (err) {
        console.error('역지오코딩 실패:', err);
      }

      addMarker({
        lat,
        lng,
        name: '',
        description: '',
        address,
        color: '#FF0000',
        customImageId: '',
        layerTempId: Number(selectedLayerId),
      });
    },
    [addMarker, selectedLayerId]
  );

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
            key={marker.markerTempId}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
