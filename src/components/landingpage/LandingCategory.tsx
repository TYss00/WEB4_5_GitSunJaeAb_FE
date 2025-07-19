import { LandingCategories } from '@/types/type';
import LandingCategoryCard from './LandingCategoryCard';
import { useQuery } from '@tanstack/react-query';
import { getPopularCategories } from '@/libs/category';

export default function LandingCategory() {
  const { data, isLoading, isError } = useQuery<LandingCategories[]>({
    queryKey: ['landingCategory'],
    queryFn: getPopularCategories,
  });

  if (isLoading) return <p className="text-center mt-20">로딩 중...</p>;
  if (isError || !data)
    return (
      <p className="text-center mt-20 text-red-500">
        카테고리를 불러올 수 없습니다.
      </p>
    );

  return (
    <section className="w-full">
      {/* 상단 텍스트 */}
      <div className="text-center mb-[40px] pt-[124px]">
        <h2 className="text-[28px] font-semibold text-[var(--black)] mb-[30px]">
          인기 있는 카테고리
        </h2>
        <p className="text-[20px] text-[var(--black)]">
          요즘 뜨는 카테고리, 한눈에 살펴보세요
        </p>
      </div>

      {/* 4개 컬러 사각형 + 텍스트 */}
      <div className="flex w-full h-[600px]">
        {data.map((cat) => (
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
