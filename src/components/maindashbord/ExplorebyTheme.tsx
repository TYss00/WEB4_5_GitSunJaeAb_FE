'use client';

import Image from 'next/image';
import Button from '../ui/Button';
import mainImg from '../../../public/assets/mainImg.jpg';
import Link from 'next/link';

export default function ExplorebyTheme() {
  return (
    <section className="w-[1100px] mx-auto flex items-center justify-between py-20">
      <div>
        <h2 className="text-[var(--primary-300)] text-3xl font-semibold mb-2">
          Explore by Theme
        </h2>
        <p className="text-[18px] text-[var(--gray-300)] mb-10">
          이런 카테고리는 어때요?
        </p>

        <p className="text-xl text-[var(--primary-300)] font-semibold mb-2">
          등산
        </p>
        <p className="text-base text-[var(--gray-300)] mb-5 leading-[30px]">
          걷고, 오르고, 나만의 길을 남겨보세요
          <br />
          풍경 좋은 능선도, 조용한 오솔길도 모두 이 지도에 이어집니다
          <br />
          당신의 경험이 누군가의 다음 여정이 될 수 있어요
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
          src={mainImg}
          alt="main banner"
          fill
          priority
          sizes="100"
          className="object-cover"
        />
      </div>
    </section>
  );
}
