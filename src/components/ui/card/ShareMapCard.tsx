'use client';

import { ShareMapCardUIProps } from '@/types/share';
import { useRouter } from 'next/navigation';

export default function ShareMapCard({
  id,
  isEvent = false,
  title,
  mapImageUrl,
  category,
  participants,
  className,
}: ShareMapCardUIProps) {
  const labelText = isEvent ? 'Event' : 'User';
  const labelColor = isEvent ? 'var(--blue)' : 'var(--primary-300)';
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashbord/sharemap/detail/${id}`);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className={`flex flex-col w-[252px] h-[350px] border border-[var(--gray-100)] rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out 
             hover:shadow-lg hover:-translate-y-1 bg-white ${className}`}
      >
        <div className="flex flex-col gap-[10px] justify-start m-[20px]">
          <div className="flex items-center justify-between">
            <span
              className="text-[16px] font-semibold line-clamp-1"
              style={{ color: labelColor }}
            >
              {labelText}
            </span>
            <span
              className="translate-x-2 px-[10px] py-[4px] rounded-full text-white text-[13px] truncate"
              style={{ backgroundColor: labelColor }}
            >
              {category}
            </span>
          </div>
          <span className="font-semibold leading-tight text-[clamp(10px,1vw,16px)] overflow-hidden text-ellipsis break-words max-h-[3em] line-clamp-1">
            {title}
          </span>
        </div>
        <div
          className="relative h-[260px] w-full"
          style={{
            backgroundImage: `url(${
              mapImageUrl || '/assets/defaultProfile.png'
            })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <span
            className="absolute right-4 bottom-4 inline-flex px-[12px] py-[6px] rounded-[10px] text-white text-[13px]"
            style={{ backgroundColor: labelColor }}
          >
            {participants}명 참여중
          </span>
        </div>
      </div>
    </>
  );
}
