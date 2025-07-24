'use client';

import Image from 'next/image';
import { Pencil, X } from 'lucide-react';
import { ManageCardProps } from '@/types/admin';

export default function ManageCard<T>({
  name,
  image,
  onEditClick,
  onDelete,
  item,
}: ManageCardProps<T>) {
  return (
    <div className="w-[100px] h-[126px] rounded-md overflow-hidden border border-[var(--gray-100)] bg-[var(--white)] relative">
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

      <p className="text-center text-base">{name}</p>

      {onDelete && (
        <div className="absolute top-1 left-1">
          <button
            className="bg-black rounded-full p-[4px] text-white hover:scale-110 transition cursor-pointer"
            onClick={() => onDelete(item)}
          >
            <X size={15} />
          </button>
        </div>
      )}
      {onEditClick && (
        <div className="absolute top-1 right-1">
          <button
            className="bg-black rounded-full p-[4px] text-white hover:scale-110 transition cursor-pointer"
            onClick={() => onEditClick(item)}
          >
            <Pencil size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
