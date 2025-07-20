import { LandingCategories } from '@/types/type';
import LandingCategoryCard from './LandingCategoryCard';
import { useQuery } from '@tanstack/react-query';
import { getPopularCategories } from '@/libs/category';
import LandingCategorySkeleton from './LandingCategorySkeleton';

export default function LandingCategory() {
  const { data, isLoading, isError } = useQuery<LandingCategories[]>({
    queryKey: ['landingCategory'],
    queryFn: getPopularCategories,
  });

  if (isError) {
    console.error('카테고리를 불러오는 중 에러 발생');
  }

  return (
    <section className="w-full">
      {/* 상단 텍스트 */}
      <div className="text-center mb-[40px] pt-[124px]">
        <h2 className="text-3xl font-bold text-[var(--primary-300)] mb-5">
          인기 있는 카테고리
        </h2>
        <p className="text-[18px] font-medium">
          요즘 뜨는 카테고리, 한눈에 살펴보세요
        </p>
      </div>
      {/* 컨텐츠 영역 */}
      <div className="flex w-full h-[68vh]">
        {isLoading || !data
          ? Array.from({ length: 4 }).map((_, i) => (
              <LandingCategorySkeleton key={i} />
            ))
          : data
              .slice(0, 4)
              .map((cat) => (
                <LandingCategoryCard
                  key={cat.id}
                  image={cat.categoryImage}
                  name={cat.name}
                  description={cat.description}
                />
              ))}
      </div>
    </section>
  );
}
