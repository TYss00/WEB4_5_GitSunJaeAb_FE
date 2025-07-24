'use client';

import Image from 'next/image';
import { Pencil, X, Info } from 'lucide-react';
import { ManageCardProps } from '@/types/admin';
import { useState } from 'react';
import ManageCardModal from '../modal/ManageCardModal';

export default function ManageCard<T extends { id: number }>({
  name,
  image,
  type,
  onEditClick,
  onDelete,
  onEditSubmit,
  item,
  description,
}: ManageCardProps<T>) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <div className="w-[100px] h-[126px] rounded-md overflow-hidden border border-[var(--gray-100)] bg-[var(--white)] relative group">
        {/* 이미지 영역 */}
        <div className="relative w-full h-[100px]">
          <Image
            src={image || '/assets/steak.jpg'}
            alt={name || '이미지'}
            fill
            sizes="100px"
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* 이름 + info 아이콘 */}
        <div className="flex justify-center pl-2 items-center gap-1 relative">
          <p className="text-base font-semibold truncate">{name}</p>
          {type === 'category' && (
            <button
              onClick={() => setShowOverlay(true)}
              className="cursor-pointer"
            >
              <Info size={16} className="text-black" />
            </button>
          )}
        </div>

        {/* 삭제 버튼 */}
        {onDelete && (
          <div className="absolute top-1 left-1">
            <button
              className="bg-black rounded-full p-[4px] text-white hover:scale-110 transition"
              onClick={() => onDelete(item)}
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* 수정 버튼 */}
        {onEditClick && (
          <div className="absolute top-1 right-1">
            <button
              className="bg-black rounded-full p-[4px] text-white hover:scale-110 transition"
              onClick={() => onEditClick(item)}
            >
              <Pencil size={15} />
            </button>
          </div>
        )}
      </div>

      {/* 확대 설명 오버레이 */}
      {showOverlay && type === 'category' && (
        <ManageCardModal
          name={name}
          image={image}
          description={description}
          item={item}
          onClose={() => setShowOverlay(false)}
          onEditSubmit={
            onEditSubmit
              ? async (updatedItem) => {
                  onEditSubmit(updatedItem);
                }
              : undefined
          }
          onDelete={onDelete}
        />
      )}
    </>
  );
}
