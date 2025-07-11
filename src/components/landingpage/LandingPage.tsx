'use client';

import Image from 'next/image';
import Button from '../ui/Button';

export default function LandingPage() {
  return (
    <>
      <section className="w-full mx-auto pt-[76px] pb-[110px]">
        <Image
          src="/assets/land1.svg"
          alt="배너"
          width={1142}
          height={760}
          priority
          className="object-cover mx-auto"
        />
      </section>
      <section className="w-full h-[1024px] flex">
        {/* 왼쪽 텍스트 영역 */}
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="max-w-[440px]">
            <h2 className="text-[28px] font-bold text-[var(--black)] mb-[30px]">
              나만의 지도를 간편하게 만들어요!
            </h2>
            <p className="text-[20px] text-[#000] leading-[1.8] mb-[30px]">
              좋아하는 장소만 모아 나만의 테마 지도를 만들어보세요.
              <br />
              산책로, 카페 리스트, 영화 속 배경지도
              <br />
              클릭 몇번으로 완성되는 나만의 공간이 생겨요
            </p>
            <Button
              buttonStyle="smGreen"
              className="w-[170px] h-[50px] rounded-[20px]"
            >
              Get Start
            </Button>
          </div>
        </div>

        {/* 오른쪽 이미지 영역 */}
        <div className="w-1/2 h-full relative">
          <Image
            src="/markermap.jpg"
            alt="배너"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </section>
      <section className="w-full h-[1024px] flex">
        {/* 왼쪽 이미지 영역 */}
        <div className="w-1/2 h-full relative">
          <Image
            src="/assets/SharedMap.jpg"
            alt="배너"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </div>
        {/* 오른쪽 텍스트 영역 */}
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="max-w-[440px]">
            <h2 className="text-[28px] font-bold text-[var(--black)] mb-[30px]">
              같이 만드는 지도!
            </h2>
            <p className="text-[20px] text-[#000] leading-[1.8] mb-[30px]">
              나만의 지도를 혼자만 쓰기 아쉬울 때
              <br />
              친구와 함께 만드는 공유 지도
              <br />
              서로의 장소를 공유하고, 위키처럼 내용을 채워봐요
            </p>
            <Button
              buttonStyle="smGreen"
              className="w-[170px] h-[50px] rounded-[20px]"
            >
              Get Start
            </Button>
          </div>
        </div>
      </section>
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
        <div className="flex w-full h-[690px]">
          <div className="relative flex-1 flex items-end justify-center py-6">
            <Image
              src="/cafe.png"
              alt="카페"
              fill
              priority
              sizes="25vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 w-full h-[290px] bg-gradient-to-t from-[#5E4431] via-[#5E4431]/100 to-transparent flex items-end justify-center pb-[76px]">
              <span className="text-[var(--white)] text-[24px] font-medium">
                카페
              </span>
            </div>
          </div>
          <div className="relative flex-1 flex items-end justify-center py-6">
            <Image
              src="/movieplace.png"
              alt="영화 촬영지"
              fill
              priority
              sizes="25vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 w-full h-[290px] bg-gradient-to-t from-[#B39F86] via-[#B39F86]/100 to-transparent flex items-end justify-center pb-[76px]">
              <span className="text-[var(--white)] text-[24px] font-medium">
                영화 촬영지
              </span>
            </div>
          </div>
          <div className="relative flex-1 flex items-end justify-center py-6">
            <Image
              src="/trip.png"
              alt="여행"
              fill
              priority
              sizes="25vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 w-full h-[290px] bg-gradient-to-t from-[#718C97] via-[#718C97]/100 to-transparent flex items-end justify-center pb-[76px]">
              <span className="text-[var(--white)] text-[24px] font-medium">
                여행
              </span>
            </div>
          </div>
          <div className="relative flex-1 flex items-end justify-center py-6">
            <Image
              src="/retro.png"
              alt="레트로"
              fill
              priority
              sizes="25vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 w-full h-[290px] bg-gradient-to-t from-[#211810] via-[#211810]/100 to-transparent flex items-end justify-center pb-[76px]">
              <span className="text-[var(--white)] text-[24px] font-medium">
                레트로
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
