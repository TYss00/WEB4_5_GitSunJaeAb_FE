import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import Button from '../ui/Button';

type Props = {
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
  className?: string;
};

export default function ScrollStep({
  title,
  description,
  imageSrc,
  reverse,
  className,
}: Props) {
  return (
    <div
      className={twMerge(
        'absolute top-0 left-0 w-full h-screen flex items-center justify-center transition-opacity duration-500',
        className
      )}
    >
      <div
        className={twMerge(
          'flex w-full',
          reverse ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        {/* 텍스트 영역 */}
        <div className="w-1/2 flex flex-col justify-center text">
          <div className="m-auto">
            <h2 className="text-[32px] font-bold whitespace-pre-line mb-[30px]">
              {title}
            </h2>
            <p className="text-[20px] whitespace-pre-line mb-[30px]">
              {description}
            </p>
            <Button
              buttonStyle="smGreen"
              className="w-[170px] h-[50px] rounded-[13px] text-[18px] font-medium"
            >
              Get Start
            </Button>
          </div>
        </div>

        {/* 이미지 영역 */}
        <div className="w-1/2 relative h-screen image">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover w-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
