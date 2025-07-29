'use client';

import { MarkerWithAddress } from '@/types/share';
import { MapPin } from 'lucide-react';

interface ShareMarkerDetailProps {
  marker: MarkerWithAddress;
}

export default function ShareMarkerDetail({ marker }: ShareMarkerDetailProps) {
  return (
    <div className="flex flex-col justify-between px-[15px] py-[13px] w-full rounded-[5px] border border-[var(--primary-100)] bg-[var(--white)]">
      {/* 제목 */}
      <div className="flex justify-between items-center mb-[3px]">
        <div className="flex gap-[10px] items-center">
          <MapPin size={24} color="var(--primary-100)" />
          <span className="text-[18px] font-semibold text-[var(--primary-100)]">
            {marker.name || '이름 없음'}
          </span>
        </div>
      </div>

      {/* 주소 */}
      <div className="flex justify-between items-center">
        <span className="text-[13px] text-[var(--primary-100)]">
          {marker.address}
        </span>
      </div>

      {/* 설명 */}
      {marker.description && (
        <p className="mt-[20px] text-[14px] text-black whitespace-pre-line">
          {marker.description}
        </p>
      )}
    </div>
  );
}
