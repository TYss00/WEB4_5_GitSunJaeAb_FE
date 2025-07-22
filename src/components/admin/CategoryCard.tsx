'use client';

import Image from 'next/image';
import { Pencil, X } from 'lucide-react';
import { CategoryCardProps } from '@/types/admin';

export default function CategoryCard({
  category,
  onEditClick,
  onDelete,
}: CategoryCardProps) {
  return (
    <div className="w-[100px] h-[126px] rounded-md overflow-hidden border border-black bg-[var(--white)] relative">
      <div className="relative w-full h-[100px]">
        <Image
          src={category.categoryImage || '/assets/steak.jpg'}
          alt={category.name || '카테고리 이미지'}
          fill
          sizes="100px"
          className="object-cover"
          priority
        />
      </div>

      <p className="text-center text-base">{category.name}</p>

      <div className="absolute top-1 left-1">
        <button
          className="bg-black rounded-full p-[4px] text-white hover:scale-110 transition cursor-pointer"
          onClick={() => onDelete(category)}
        >
          <X size={15} />
        </button>
      </div>
      <div className="absolute top-1 right-1">
        <button
          className="bg-black rounded-full p-[4px] text-white hover:scale-110 transition cursor-pointer"
          onClick={() => onEditClick(category)}
        >
          <Pencil size={15} />
        </button>
      </div>
    </div>
  );
}
