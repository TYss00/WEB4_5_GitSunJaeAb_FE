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
  const [isLoading, setIsLoading] = useState(true);

  const setSelectedCategoryIds = useProfileEditStore(
    (state) => state.setSelectedCategoryIds
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/categories');
        setAllCategories(res.data.categories);
      } catch (err) {
        console.error('카테고리 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!member) return;
    const names =
      member.memberInterests?.flatMap((i) => i.categories.map((c) => c.name)) ??
      [];
    setSelectedNames(names);
  }, [member]);

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
      <div className="flex justify-center">
        <p className="w-[105px] text-3xl text-[var(--primary-300)] mb-14 font-bold border-b-2 border-[var(--primary-300)]">
          관심분야
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2">
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[36px] animate-pulse bg-[var(--gray-100)] rounded-full"
              />
            ))
          : allCategories.map((category) => (
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
