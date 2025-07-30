'use client';

import Image from 'next/image';
import Button from '../ui/Button';
import mainImg from '../../../public/assets/mainImg.jpg';
import Link from 'next/link';
import { LandingCategories } from '@/types/type';

export default function ExplorebyTheme({
  category,
}: {
  category: LandingCategories | null;
}) {
  if (!category) return null;
  return (
    <section className="w-[1100px] mx-auto flex items-center justify-between py-20">
      <div className="w-[500px]">
        <h2 className="text-[var(--primary-300)] text-3xl font-semibold mb-2">
          Explore by Theme
        </h2>
        <p className="text-[18px] text-[var(--gray-300)] mb-10">
          이런 카테고리는 어때요?
        </p>

        <p className="text-xl text-[var(--primary-300)] font-semibold mb-2">
          {category.name}
        </p>
        <p className="text-base text-[var(--gray-300)] mb-5 leading-[30px] line-clamp-3 whitespace-pre-line">
          {category.description || '이 카테고리에 대한 설명이 없습니다.'}
        </p>
        <Link href="/dashbord/roadmap">
          <Button
            buttonStyle="green"
            className="w-[120px] h-[34px] py-2 text-sm"
          >
            Start Exploring
          </Button>
        </Link>
      </div>

      <div
        className="w-[500px] h-[320px] overflow-hidden border border-[var(--primary-100)] relative"
        style={{
          borderRadius: '32% 68% 53% 47% / 48% 52% 48% 52%',
        }}
      >
        <Image
          src={category.categoryImage || mainImg}
          alt={`${category.name} 이미지`}
          fill
          priority
          sizes="100"
          className="object-cover"
        />
      </div>
    </section>
  );
}
