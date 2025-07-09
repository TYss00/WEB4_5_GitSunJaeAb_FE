'use client';

import Image from 'next/image';

export default function Banner() {
  return (
    <section className="relative w-full h-[460px]">
      <Image
        src="/assets/SharedMap.jpg"
        alt="공유지도 배너"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-[#FFFFFF] text-center">
        <h1 className="text-4xl font-bold mb-2">공유지도</h1>
        <p className="text-lg">여러 유저들과 협업하여 지도를 만들어요</p>
      </div>
    </section>
  );
}
