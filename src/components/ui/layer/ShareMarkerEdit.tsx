'use client';

import { useEffect, useState } from 'react';
import { MapPin, Trash2 } from 'lucide-react';
import Button from '../Button';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { geocodeAddress } from '@/libs/geocode';
import { getShareStoreByRoomId } from '@/store/useShareStore'; // ✅ 변경된 부분
import { MarkerWithAddress } from '@/types/share';

export interface AddressData {
  address: string;
}

interface ShareMarkerEditProps {
  roadmapId: number; // ✅ 추가
  marker?: MarkerWithAddress;
  isTextArea?: boolean;
  onDelete: () => void;
  mapRef: React.RefObject<google.maps.Map | null>;
}

export default function ShareMarkerEdit({
  roadmapId, // ✅ 추가
  marker,
  isTextArea,
  onDelete,
  mapRef,
}: ShareMarkerEditProps) {
  const useShareStore = getShareStoreByRoomId(`sharemap-room-${roadmapId}`); // ✅ getShareStoreByRoomId 사용

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState(
    marker?.address || '주소를 입력해주세요.'
  );
  const [placeName, setPlaceName] = useState(marker?.name || '이름 없음');
  const [description, setDescription] = useState(marker?.description || '');
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    setPlaceName(marker?.name || '이름 없음');
    setDescription(marker?.description || '');
  }, [marker]);

  const addMarker = useShareStore((state) => state.addMarker);
  const selectedLayerId = useShareStore((state) => state.selectedLayerId);
  const updateMarker = useShareStore((state) => state.updateMarker);

  const handleComplete = async (data: AddressData) => {
    const fullAddress = data.address;
    setAddress(fullAddress);
    setIsModalOpen(false);

    try {
      const coords = await geocodeAddress(fullAddress);
      if (!coords) return;

      mapRef.current?.panTo({ lat: coords.lat, lng: coords.lng });

      addMarker({
        lat: coords.lat,
        lng: coords.lng,
        address: fullAddress,
        name: '',
        description: '',
        color: '#FF0000',
        customImageId: '',
        layerTempId: typeof selectedLayerId === 'number' ? selectedLayerId : 0,
      });

      onDelete();
    } catch (err) {
      console.error('지오코딩 실패:', err);
    }
  };

  const handleNameSave = () => {
    setIsEditingName(false);
    if (marker?.markerTempId) {
      updateMarker(marker.markerTempId, { name: placeName });
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSave();
    }
  };

  const handleDescriptionBlur = () => {
    if (marker?.markerTempId) {
      updateMarker(marker.markerTempId, { description });
    }
  };

  return (
    <div className="flex flex-col justify-between px-[15px] py-[13px] w-full rounded-[5px] border border-[var(--primary-100)] bg-[var(--white)]">
      <div className="flex justify-between items-center mb-[3px]">
        <div className="flex gap-[10px] items-center">
          <MapPin
            size={24}
            color="var(--primary-100)"
            onClick={() => {
              if (marker) {
                mapRef.current?.panTo({ lat: marker.lat, lng: marker.lng });
              }
            }}
          />
          {isEditingName ? (
            <input
              autoFocus
              className="text-[18px] font-semibold text-[var(--primary-100)] border-b border-[var(--primary-100)] bg-transparent outline-none"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              onKeyDown={handleNameKeyDown}
              onBlur={handleNameSave}
              placeholder="장소 이름을 입력해주세요."
            />
          ) : (
            <span
              className="text-[18px] text-[var(--primary-100)] font-semibold cursor-pointer"
              onClick={() => {
                setIsEditingName(true);
              }}
            >
              {placeName || '장소 이름을 입력해주세요.'}
            </span>
          )}
        </div>
        <Trash2
          size={18}
          color="red"
          onClick={onDelete}
          className="cursor-pointer"
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-[13px] text-[var(--primary-100)]">{address}</span>
        <Button
          className="text-[10px] font-semibold px-[23px] py-[9px]"
          onClick={() => setIsModalOpen(true)}
        >
          주소찾기
        </Button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/25 bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-[400px] relative">
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <DaumPostcodeEmbed onComplete={handleComplete} />
            </div>
          </div>
        )}
      </div>

      {isTextArea && (
        <textarea
          className="p-[5px] mt-[20px] border border-[var(--primary-100)] rounded-[5px] h-[100px] focus:outline-none"
          placeholder="장소에 대한 설명을 입력해주세요."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleDescriptionBlur}
        ></textarea>
      )}
    </div>
  );
}
