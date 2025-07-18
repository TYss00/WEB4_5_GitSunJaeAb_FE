import { useEffect, useRef } from 'react';
import LandingServiceWrap from './LandingServiceWrap';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LandingService() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panels = gsap.utils.toArray('.panel') as HTMLElement[];

    panels.forEach((panel, i) => {
      const image = panel.querySelector('.image-box');
      const text = panel.querySelector('.text-box');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
        },
      });

      // 현재 이미지 축소 및 사라짐
      tl.to(image, {
        scale: 0.8,
        opacity: 0,
        ease: 'power2.out',
      });

      // 텍스트도 같이 사라지게
      tl.to(
        text,
        {
          opacity: 0,
          y: -50,
          ease: 'power2.out',
        },
        '<'
      ); // 동시에
    });
  }, []);

  return (
    <div ref={wrapperRef} className="landing-sections-wrapper">
      <LandingServiceWrap
        title="나만의 지도를 간편하게 만들어요!"
        description={`좋아하는 장소만 모아 나만의 테마 지도를 만들어보세요.\n산책로, 카페 리스트, 영화 속 배경지도\n클릭 몇번으로 완성되는 나만의 공간이 생겨요`}
        image="/markermap.jpg"
        zIndex={30}
      />

      <LandingServiceWrap
        title="같이 만드는 지도!"
        description={`나만의 지도를 혼자만 쓰기 아쉬울 때\n친구와 함께 만드는 공유 지도\n서로의 장소를 공유하고, 위키처럼 내용을 채워봐요`}
        image="/assets/SharedMap.jpg"
        reverse
        zIndex={20}
      />

      <LandingServiceWrap
        title="여기 어디인지 맞혀볼래요?"
        description={`여러분의 눈썰미와 추리력을 시험합니다.\n사진 한 장을 단서 삼아 장소를 추리하고,\n정답을 보내 보세요!`}
        image="/markermap.jpg"
        zIndex={10}
      />
    </div>
  );
}
