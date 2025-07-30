'use client';

import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { DashboardShareMapCardProps } from '@/types/share';
import ShareMapCard from '../ui/card/ShareMapCard';
import ShareMapSkeletonCard from '../dashboard/skeleton/ShareMapSkeletonCard';

interface ShareMapCardListProps {
  data: DashboardShareMapCardProps[];
  isLoading?: boolean;
}

export default function ShareMapCardList({
  data,
  isLoading: isLoading,
}: ShareMapCardListProps) {
  const [sort, setSort] = useState<'recent' | 'popular'>('recent');
  const [categoryFilter, setCategoryFilter] = useState('전체');

  const filteredAndSorted = useMemo(() => {
    let filtered = data;

    if (categoryFilter !== '전체') {
      filtered = data.filter((item) => item.categoryName === categoryFilter);
    }

    if (sort === 'popular') {
      return [...filtered].sort((a, b) => b.likeCount - a.likeCount);
    } else {
      return [...filtered].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  }, [data, sort, categoryFilter]);

  const categoryOptions = [
    '전체',
    ...Array.from(new Set(data.map((d) => d.categoryName))),
  ];

  return (
    <section className="w-full max-w-[1100px] mx-auto mt-[80px] px-4 pb-[186px]">
      {/* 정렬 및 카테고리 필터 */}
      <div className="flex justify-between items-center mb-[27px]">
        {/* 카테고리 셀렉트 */}
        <div className="relative w-[190px]">
          <select
            className="w-full border border-[#E4E4E4] rounded-[5px] px-[12px] py-[10px] text-[16px] appearance-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categoryOptions.map((option) => (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[31px]">
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <ShareMapSkeletonCard key={idx} />
            ))
          : filteredAndSorted.map((item) => (
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
    </section>
  );
}
