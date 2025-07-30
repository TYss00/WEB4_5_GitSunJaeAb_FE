'use client';

import { LandingCategories } from '@/types/type';
import ExplorebyTheme from './ExplorebyTheme';
import HotNow from './HotNow';
import ShareMap from './ShareMap';
import TrendingQuests from './TrendingQuests';
import { useEffect, useState } from 'react';
import { getPopularCategories } from '@/libs/category';

export default function MainDash() {
  const [selectedCategory, setSelectedCategory] =
    useState<LandingCategories | null>(null);
  const [categories, setCategories] = useState<LandingCategories[] | null>(
    null
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getPopularCategories();
        setCategories(data);
        if (data && data.length > 0) {
          // 첫 번째 카테고리를 기본 선택
          setSelectedCategory(data[0]);
        }
      } catch (err) {
        console.error('카테고리 불러오기 실패', err);
      }
    };

    fetchCategories();
  }, []);

  if (!categories) return null; // or 스켈레톤 컴포넌트 표시

  return (
    <>
      <ExplorebyTheme category={selectedCategory} />
      <HotNow onCategorySelect={setSelectedCategory} />
      <ShareMap />
      <TrendingQuests />
    </>
  );
}
