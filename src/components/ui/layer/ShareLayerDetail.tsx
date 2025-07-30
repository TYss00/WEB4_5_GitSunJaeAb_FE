'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';
import ShareMarkerDetail from './ShareMarkerDetail';
import { MarkerWithAddress } from '@/types/share';

interface ShareLayerDetailProps {
  name: string;
  markers: MarkerWithAddress[];
  onMarkerClick?: (lat: number, lng: number) => void;
}

export default function ShareLayerDetail({
  name,
  markers,
  onMarkerClick,
}: ShareLayerDetailProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full">
      {/* 레이어 헤더 */}
      <div
        className={`flex justify-between px-[15px] h-[55px] cursor-pointer transition-colors ${
          isOpen
            ? 'bg-[#EBF2F2] rounded-t-[5px]'
            : 'bg-[var(--gray-40)] rounded-[5px]'
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex gap-[10px] items-center">
          <Layers size={24} color={isOpen ? 'var(--primary-300)' : 'black'} />
          <span
            className={`text-[18px] font-semibold ${
              isOpen ? 'text-[var(--primary-300)]' : 'text-[var(--black)]'
            }`}
          >
            {name}
          </span>
        </div>

        {/* 토글 아이콘 */}
        <div className="flex items-center">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>

      {/* 마커 목록 */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen
            ? 'max-h-[633px] bg-[#EBF2F2] opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-[10px] max-h-[633px] overflow-y-auto rounded-b-[5px] flex flex-col gap-[15px]">
          {markers.map((marker) => (
            <ShareMarkerDetail
              key={marker.markerTempId}
              marker={marker}
              onClick={() => onMarkerClick?.(marker.lat, marker.lng)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
