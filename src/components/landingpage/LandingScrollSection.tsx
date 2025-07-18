import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollStep from './ScrollStep';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingScrollSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3000',
          scrub: 1,
          pin: true,
        },
      });

      tl.to('.step-1 .text', { opacity: 0, duration: 0.3 }, 0)
        .fromTo(
          '.step-2 .image',
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          0.5
        )
        .to('.step-1 .image', { opacity: 0, duration: 0.3 }, 1)
        .fromTo(
          '.step-2 .text',
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          1.5
        )
        .to('.step-2 .text', { opacity: 0, duration: 0.3 }, 2)
        .fromTo(
          '.step-3 .image',
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          2.5
        )
        .to('.step-2 .image', { opacity: 0, duration: 0.3 }, 3)
        .fromTo(
          '.step-3 .text',
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          3.5
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-screen h-screen overflow-hidden relative"
    >
      <ScrollStep
        className="step-1"
        imageSrc="/markermap.jpg"
        title="나만의 지도를 간편하게 만들어요!"
        description={`좋아하는 장소만 모아 나만의 테마 지도를 만들어보세요.\n산책로, 카페 리스트, 영화 속 배경지도\n클릭 몇번으로 완성되는 나만의 공간이 생겨요`}
      />
      <ScrollStep
        className="step-2"
        imageSrc="/assets/SharedMap.jpg"
        title="같이 만드는 지도!"
        description={`나만의 지도를 혼자만 쓰기 아쉬울 때\n친구와 함께 만드는 공유 지도\n서로의 장소를 공유하고, 위키처럼 내용을 채워봐요`}
        reverse
      />
      <ScrollStep
        className="step-3"
        imageSrc="/markermap.jpg"
        title="여기 어디인지 맞혀볼래요?"
        description={`여러분의 눈썰미와 추리력을 시험합니다.\n사진 한 장을 단서 삼아 장소를 추리하고,\n정답을 보내 보세요!`}
      />
    </section>
  );
}
