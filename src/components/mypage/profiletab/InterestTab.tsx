'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/libs/axios';
import { useProfileStore } from '@/store/profileStore';
import { Category } from '@/types/myprofile';
import { useProfileEditStore } from '@/store/profileeditStore';

export default function InterestTab() {
  const member = useProfileStore((state) => state.member);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const setSelectedCategoryIds = useProfileEditStore(
    (state) => state.setSelectedCategoryIds
  );

  // 전체 카테고리 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/categories');
        setAllCategories(res.data.categories);
      } catch (err) {
        console.error('카테고리 불러오기 실패:', err);
      }
    };
    fetchCategories();
  }, []);

  // 멤버의 기존 관심 카테고리 → 선택 목록 초기화
  useEffect(() => {
    if (!member) return;
    const names =
      member.memberInterests?.flatMap((i) => i.categories.map((c) => c.name)) ??
      [];
    setSelectedNames(names);
  }, [member]);

  // 선택된 name → id 배열 저장
  useEffect(() => {
    const selectedIds = allCategories
      .filter((cat) => selectedNames.includes(cat.name))
      .map((cat) => cat.id);
    setSelectedCategoryIds(selectedIds);
  }, [selectedNames, allCategories, setSelectedCategoryIds]);

  const toggleCategory = (categoryName: string) => {
    setSelectedNames((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div className="mt-7 h-[300px]">
      {/* 제목 및 버튼 렌더링 생략 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2">
        {allCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.name)}
            className={`w-full px-4 py-2 rounded-full text-sm border transition text-center ${
              selectedNames.includes(category.name)
                ? 'bg-[var(--primary-300)] text-white border-[var(--primary-300)]'
                : 'border-[var(--gray-200)] text-[var(--gray-400)]'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
