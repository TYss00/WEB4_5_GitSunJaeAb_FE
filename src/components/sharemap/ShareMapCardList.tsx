'use client';

import { DashboardShareMapCardProps } from '@/types/share';
import ShareMapCard from '../ui/card/ShareMapCard';

interface ShareMapCardListProps {
  data: DashboardShareMapCardProps[];
}

export default function ShareMapCardList({ data }: ShareMapCardListProps) {
  return (
    <section className="w-full max-w-[1100px] mx-auto mt-[80px] px-4 pb-[186px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[31px]">
        {data.map((item) => (
          <ShareMapCard
            key={item.id}
            id={item.id}
            title={item.title}
            mapImageUrl={item.thumbnail}
            category={item.categoryName}
          />
        ))}
      </div>
    </section>
  );
}
