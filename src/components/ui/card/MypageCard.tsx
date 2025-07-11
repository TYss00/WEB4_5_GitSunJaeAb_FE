'use client';

import { MypageCardProps } from '@/types/type';
import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function MypageCard({
  title,
  date,
  type,
  mapImageUrl,
  isLiked = false,
  onToggleLike,
}: MypageCardProps & { onToggleLike?: () => void }) {
  const typeColorMap: Record<string, string> = {
    공개: 'bg-[#E7FAE2] text-[var(--primary-300)]',
    비공개: 'bg-[var(--gray-200)] text-[var(--white)]',
    퀘스트: 'bg-[var(--primary-200)] text-[var(--white)]',
    공유: 'bg-[#5BBBF6] text-[var(--white)]',
  };

  const badgeClass = typeColorMap[type] || 'bg-gray-200 text-gray-600';

  return (
    <div
      className="w-full h-[227px] 2xl:h-[300px] bg-white overflow-hidden rounded-lg shadow-sm cursor-pointer transition-all duration-300 ease-in-out 
             hover:shadow-lg hover:-translate-y-1"
    >
      {/* 이미지 */}
      <div className="relative w-full h-2/3">
        <Image
          src={mapImageUrl}
          alt={title}
          fill
          priority
          sizes="250px"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <span
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${badgeClass}`}
        >
          {type}
        </span>
      </div>

      {/* 텍스트, 제목,날짜,하트 */}
      <div className="p-3 pl-4 2xl:p-5 flex flex-col h-1/3">
        <p className="text-base text-[var(--black)] pt-1">{title}</p>

        <div className="flex items-center justify-between pt-1 pb-2">
          <p className="text-sm text-[var(--gray-200)]">{date}</p>
          <button
            onClick={onToggleLike}
            className="w-6 h-6 flex items-center justify-center text-[var(--gray-200)]"
          >
            <Heart
              size={16}
              strokeWidth={3}
              fill={isLiked ? '#f87171' : 'none'}
              className={`transition-colors ${
                isLiked ? 'text-[var(--red)]' : 'text-[var(--gray-200)]'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
