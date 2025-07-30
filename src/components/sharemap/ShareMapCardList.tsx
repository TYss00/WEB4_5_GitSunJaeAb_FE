'use client';

import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { DashboardShareMapCardProps } from '@/types/share';
import ShareMapCard from '../ui/card/ShareMapCard';
import ShareMapSkeletonCard from '../dashboard/skeleton/ShareMapSkeletonCard';

interface ShareMapCardListProps {
  data: DashboardShareMapCardProps[];
  isLoading?: boolean;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ShareMapCardList({
  data,
  isLoading = false,
  categories,
  selectedCategory,
  onCategoryChange,
}: ShareMapCardListProps) {
  const [sort, setSort] = useState<'recent' | 'popular'>('recent');

  const filteredAndSorted = useMemo(() => {
    let filtered = data;

    if (selectedCategory !== '전체') {
      filtered = data.filter((item) => item.categoryName === selectedCategory);
    }

    if (sort === 'popular') {
      return [...filtered].sort((a, b) => b.likeCount - a.likeCount);
    } else {
      return [...filtered].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  }, [data, sort, selectedCategory]);

  return (
    <section className="w-full max-w-[1100px] mx-auto mt-[80px] px-4 pb-[186px]">
      {/* 정렬 및 카테고리 필터 */}
      <div className="flex justify-between items-center mb-[27px]">
        {/* 카테고리 셀렉트 */}
        <div className="relative w-[190px]">
          <select
            className="w-full border border-[#E4E4E4] rounded-[5px] px-[12px] py-[10px] text-[16px] appearance-none"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none text-[#000000]"
            size={24}
          />
        </div>

        {/* 정렬 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={() => setSort('recent')}
            className={`px-4 py-2 text-[18px] font-bold ${
              sort === 'recent' ? 'text-[#005C54]' : 'text-[#9F9F9F]'
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setSort('popular')}
            className={`px-4 py-2 text-[18px] font-bold ${
              sort === 'popular' ? 'text-[#005C54]' : 'text-[#9F9F9F]'
            }`}
          >
            인기순
          </button>
        </div>
      </div>

      {/* 카드 리스트 */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[31px]">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ShareMapSkeletonCard key={idx} />
          ))}
        </div>
      ) : filteredAndSorted.length === 0 ? (
        <div className="text-center text-gray-500 text-[24px] mt-15">
          앗! 이 카테고리는 아직 비어있어요.
          <br />
          다른 카테고리를 살펴보거나 직접 지도를 만들어볼까요?
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[31px]">
          {filteredAndSorted.map((item) => (
            <ShareMapCard
              key={item.id}
              id={item.id}
              title={item.title}
              mapImageUrl={item.thumbnail}
              category={item.categoryName}
              participants={item.participants}
            />
          ))}
        </div>
      )}
    </section>
  );
}
