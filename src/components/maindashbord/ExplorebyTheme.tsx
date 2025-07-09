'use client';

import Image from 'next/image';
import Button from '../ui/Button';

export default function ExplorebyTheme() {
  return (
    <section className="max-w-screen-2xl mx-auto flex flex-row items-center pb-20">
      <div className="max-w-lg ml-45 2xl:ml-55">
        <h2 className="text-[#005C54] text-3xl font-semibold mb-2">
          Explore by Theme
        </h2>
        <p className="text-xl text-[#606060] mb-10">이런 카테고리는 어때요?</p>

        <p className="text-xl text-[#005C54] font-semibold mb-2">등산</p>
        <p className="text-base text-[#222222] mb-4">
          걷고, 오르고, 나만의 길을 남겨보세요
          <br />
          풍경 좋은 능선도, 조용한 오솔길도 모두 이 지도에 이어집니다
          <br />
          당신의 경험이 누군가의 다음 여정이 될 수 있어요
        </p>
        <Button
          buttonStyle="green"
          className="w-[124px] h-[34px] px-4 py-2 text-sm"
        >
          Start Exploring
        </Button>
      </div>

      <div className="w-[500px] h-[300px] ml-60 relative overflow-hidden">
        <Image
          src="/assets/maindashbord.svg"
          alt="masked"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
