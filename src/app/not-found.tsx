'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Lottie from 'react-lottie-player';
import searchAnimation from '../../public/assets/searchAnimation.json';
import { useAuthStore } from '@/store/useAuthStore';

export default function NotFound() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-[960px] w-full gap-[60px]">
        <div className="flex flex-col items-start">
          <span className="text-[16px] text-[var(--primary-300)] mb-[16px]">
            404 error
          </span>
          <h1 className="text-[36px] font-bold text-[var(--black)] mb-[16px]">
            페이지를 찾을 수 없어요.
          </h1>
          <p className="text-[var(--black)] text-[24px] mb-[50px] leading-relaxed">
            요청하신 페이지는 존재하지 않거나 <br />
            다른 위치로 옮겨졌습니다.
          </p>

          <div className="flex items-center gap-[36px]">
            <Button
              buttonStyle="smGreen"
              onClick={() => {
                if (accessToken) {
                  router.push('/dashbord');
                } else {
                  router.push('/landing');
                }
              }}
              className="w-[162px] h-[52px] text-[18px]"
            >
              홈페이지로 이동
            </Button>
            <Button
              buttonStyle="white"
              onClick={() => router.back()}
              className="w-[162px] h-[52px] text-[18px]"
            >
              이전 페이지로 이동
            </Button>
          </div>
        </div>

        <div className="relative w-[500px] h-[500px] shrink-0">
          <Image
            src="/assets/404.svg"
            alt="404"
            fill
            priority
            className="object-contain z-0"
          />

          <div className="absolute z-10 bottom-[90px] right-[50px] w-[160px] h-[160px]">
            <Lottie loop animationData={searchAnimation} play />
          </div>
        </div>
      </div>
    </div>
  );
}
