'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '../ui/Button';

const categories = [
  '프론트엔드',
  '백엔드',
  'AI',
  '데이터',
  '모바일',
  '게임',
  '보안',
  '클라우드',
  'UI/UX',
  '블록체인',
  'IoT',
  '로봇',
  'DevOps',
  '메타버스',
  '챗봇',
  'PM',
  'QA',
  '창업',
];

export default function CategoriesSetting() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <h1 className="text-[#005C54] text-4xl font-bold mb-10">
        관심 분야를 설정해주세요.
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-20">
        {categories.map((category) => (
          <button
            // 키를 카테코리로해서 중복되면 안됩니다.
            key={category}
            onClick={() => toggleCategory(category)}
            className={`border px-4 py-2 rounded-full text-sm transition ${
              selected.includes(category)
                ? 'bg-[#005C54] text-white border-[#005C54]'
                : 'border-gray-300 text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <Button
        buttonStyle="green"
        className="w-[80px] h-[40px] px-6 py-3 rounded-lg text-base mb-3"
      >
        확인
      </Button>

      {/* 나중에 경로수정 */}
      <Link href="/" className="text-[#005C54] cursor-pointer hover:underline">
        → 다음에 할게요
      </Link>
    </div>
  );
}
