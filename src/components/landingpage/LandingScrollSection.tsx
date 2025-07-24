import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollStep from './ScrollStep';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingScrollSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=5000',
          scrub: 1,
          pin: true,
        },
      });

      tl.to(q('.step-1 .text'), { opacity: 0 }, 0)
        .to(
          q('.step-1 .image-inner'),
          {
            scale: 0.6,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          0.2
        )
        .fromTo(
          q('.step-2 .image-inner'),
          { height: '150px', opacity: 0 },
          {
            height: '100%',
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          0.6
        )
        .fromTo(
          q('.step-2 .text'),
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          1.4
        )
        .to(q('.step-2 .text'), { opacity: 0 }, 2.0)
        .to(
          q('.step-2 .image-inner'),
          {
            scale: 0.6,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          2.2
        )
        .fromTo(
          q('.step-3 .image-inner'),
          {
            width: '150px',
            opacity: 0,
            transformOrigin: 'center center',
          },
          {
            width: '100%',
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          2.6
        )
        .fromTo(
          q('.step-3 .text'),
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          3.4
        );
    }, containerRef);

    return () => {
      // 안전한 DOM이 남아있는 타이밍에 gsap 종료 처리
      try {
        ctx.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        ScrollTrigger.clearScrollMemory();
      } catch (e) {
        console.warn('랜딩페이지 스크롤 트리거 에러 :', e);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full relative overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div className="min-h-[5000px] relative">
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
          imageSrc="/assets/landingQuestImg.jpg"
          title="사진 속 장소를 추리해보세요"
          description={`풍경 속 단서를 찾아보세요.\n여러분의 눈썰미와 감각으로 장소를 추리하는 퀘스트\n지금 바로 퀘스트에 도전해보세요!`}
        />
      </div>
    </section>
  );
}
