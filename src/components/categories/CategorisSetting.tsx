'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '../ui/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchCategories, postCategoryInterests } from '@/libs/category';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import LoadingSpener from '../common/LoadingSpener';

export default function CategoriesSetting() {
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const toggleCategory = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const { mutate: submitInterests, isPending } = useMutation({
    mutationFn: postCategoryInterests,
    onSuccess: () => {
      toast.success('관심 분야 등록 완료!');
      router.push('/dashbord');
    },
    onError: () => {
      toast.error('등록 중 오류가 발생했습니다.');
    },
  });

  const handleSubmit = () => {
    if (selected.length === 0) {
      toast.error('1개 이상 선택해주세요.');
      return;
    }

    submitInterests(selected);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <LoadingSpener />
      </div>
    );
  }
  if (isError) return <p>카테고리를 불러오지 못했습니다.</p>;

  return (
    <div className="flex flex-col items-center px-4 py-8 pt-30 2xl:pt-50">
      <h1 className="text-[var(--primary-300)] text-4xl font-bold mb-10">
        관심 분야를 설정해주세요
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-20">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`border px-4 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-150 ${
              selected.includes(category.id)
                ? 'bg-[var(--primary-300)] text-[var(--white)] border-[var(--primary-300)]'
                : 'border-gray-300 text-gray-800'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <Button
        buttonStyle="green"
        className="w-[80px] h-[40px] px-6 py-3 rounded-lg text-base mb-3"
        onClick={handleSubmit}
        disabled={isPending}
      >
        확인
      </Button>

      {/* 나중에 경로수정 */}
      <Link
        href="/dashbord"
        className="text-[var(--primary-300)] cursor-pointer hover:underline"
      >
        → 다음에 할게요
      </Link>
    </div>
  );
}
