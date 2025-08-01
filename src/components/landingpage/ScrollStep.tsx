import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollStepProps } from '@/types/type';

export default function ScrollStep({
  title,
  description,
  imageSrc,
  reverse,
  className,
}: ScrollStepProps) {
  const router = useRouter();
  return (
    <div
      className={twMerge(
        'absolute top-0 left-0 w-full h-screen flex items-center justify-center transition-opacity duration-500',
        className
      )}
    >
      <div
        className={twMerge(
          'flex w-full max-w-screen',
          reverse ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        {/* 텍스트 영역 */}
        <div className="w-1/2 flex flex-col justify-center text">
          <div className="space-y-6 mx-auto">
            <h2 className="text-3xl font-bold whitespace-pre-line leading-snug text-[var(--primary-300)]">
              {title}
            </h2>
            <p className="text-lg whitespace-pre-line leading-relaxed text-[var(--gray-300)]">
              {description}
            </p>
            <Button
              buttonStyle="smGreen"
              className="w-[160px] h-[50px] rounded-[14px] text-lg font-medium"
              onClick={() => {
                ScrollTrigger.getAll().forEach((t) => t.kill());
                router.push('/login');
              }}
            >
              Get Start
            </Button>
          </div>
        </div>

        {/* 이미지 영역 */}
        <div className="w-1/2 relative h-screen flex justify-center items-center image overflow-hidden">
          <div className="image-inner w-full h-full relative origin-center overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="100"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
