'use client';

import Image from 'next/image';
import { Folder } from 'lucide-react';
import CategoryAddCard from '@/components/admin/CategoryAddCard';

const categories = ['음식', '등산', '레트로', '서울', '역사', '인천'];

export default function CategoryManage() {
  return (
    <div className="w-[732px] mx-auto border border-[var(--gray-50)] rounded-[10px] px-[16px] py-[16px]">
      <h2 className="text-lg font-semibold text-[var(--primary-300)] mb-[16px] flex items-center gap-2">
        <Folder size={24} className="text-[var(--primary-300)]" />
        카테고리 관리
      </h2>

      <div className="flex flex-wrap gap-[16px]">
        {categories.map((name, idx) => (
          <div
            key={idx}
            className="w-[100px] h-[126px] rounded-md overflow-hidden border border-[var(--gray-100)] bg-[var(--white)]"
          >
            <Image
              src="/assets/steak.jpg"
              alt={name}
              width={100}
              height={100}
              className="w-full h-[100px] object-cover"
            />
            <p className="text-center py-[4px] text-[15px]">{name}</p>
          </div>
        ))}

        <div className="basis-full h-0" />
        <CategoryAddCard
          onClick={() => {
            alert('카테고리 추가 클릭!');
          }}
        />
      </div>
    </div>
  );
}
