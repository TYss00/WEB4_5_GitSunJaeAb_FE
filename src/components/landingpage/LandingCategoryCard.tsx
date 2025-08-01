'use client';

import Image from 'next/image';
import defaultCategoryImg from '../../../public/assets/defaultCategory.avif';
import { useEffect, useRef, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';
import { LandingCategoryCardProps } from '@/types/type';

export default function LandingCategoryCard({
  image,
  name,
  description,
}: LandingCategoryCardProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [bgColor, setBgColor] = useState<string>('#5E4431');

  useEffect(() => {
    const fac = new FastAverageColor();

    if (imgRef.current) {
      fac
        .getColorAsync(imgRef.current)
        .then((color) => {
          setBgColor(color.hex);
        })
        .catch((e) => {
          console.warn('색상 추출 실패:', e);
        });
    }
  }, [image]);

  return (
    <div className="relative flex-1 flex group overflow-hidden">
      {/* 숨겨진 이미지 (색 추출용) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image || defaultCategoryImg.src}
        ref={imgRef}
        crossOrigin="anonymous"
        className="hidden"
        alt="이미지 색상 추출용"
      />

      {/* 배경 이미지 */}
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
        <Image
          src={image || defaultCategoryImg}
          alt={name}
          fill
          priority
          sizes="25vw"
          className="object-cover"
        />
      </div>

      {/* 상단 페이드 오버레이 */}
      <div
        className="pointer-events-none absolute bottom-[16vh] left-0 w-full h-[10vh] z-20"
        style={{
          backgroundImage: `linear-gradient(to top, ${bgColor}, transparent)`,
        }}
      />

      {/* 텍스트 영역 */}
      <div
        className="absolute bottom-0 left-0 w-full h-[16vh] z-10 
          flex flex-col items-center justify-center transition-all duration-500"
        style={{ backgroundColor: bgColor }}
      >
        <p className="text-[var(--white)] text-2xl font-semibold transform transition-all duration-500 group-hover:-translate-y-4">
          {name}
        </p>
        <p
          className="text-[var(--white)] mt-1 px-8 opacity-0 translate-y-4 
            group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500
            text-sm leading-[1.5rem] line-clamp-2 whitespace-pre-wrap break-words"
        >
          {description}
        </p>
      </div>
    </div>
  );
}
