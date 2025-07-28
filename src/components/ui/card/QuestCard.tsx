'use client';

import { QuestCardProps } from '@/types/type';
import { truncateText } from '@/utils/truncateText';
import { Heart, CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function QuestCard({
  id,
  isInProgress,
  mapImageUrl,
  title,
  description,
  hashtags,
  profileImgUrl,
  author,
  deadLine,
}: QuestCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const likeHandler = () => {
    setIsLiked((prev) => !prev);
  };
  const labelText = isInProgress ? '진행중' : '마감';
  const labelColor = isInProgress ? 'var(--primary-300)' : 'var(--gray-200)';

  const truncatedTitle = truncateText(title, 16);
  const truncatedDescription = truncateText(description, 22);

  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashbord/quest/detail/${id}`);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="relative flex flex-col w-[350px] h-[278px] border border-[var(--gray-100)] rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out 
             hover:shadow-lg hover:-translate-y-1"
        style={{
          backgroundImage: `url(${mapImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <span
          className="absolute top-[10px] left-[10px] inline-block rounded-[10px] px-[10px] py-[5px] text-[11px] text-[var(--white)] font-semibold leading-none"
          style={{ backgroundColor: labelColor }}
        >
          {labelText}
        </span>
        <div
          className="flex flex-col gap-[5px] justify-end w-full h-full px-[15px] py-[25px] "
          style={{
            backgroundImage: `linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 55%, rgba(255,255,255,0) 100%)`,
          }}
        >
          <div className="flex justify-between w-full">
            <span className="text-[20px] font-semibold">{truncatedTitle}</span>
            <button onClick={likeHandler}>
              <Heart
                size={20}
                fill={isLiked ? 'red' : 'none'}
                color="black"
                strokeWidth={isLiked ? 0 : 2}
              />
            </button>
          </div>
          <span className="text-[16px]">{truncatedDescription}</span>
          <div className="flex gap-[10px] flex-wrap">
            {hashtags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] text-[var(--primary-300)] font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between w-full ">
            <div className="flex items-center gap-[5px]">
              <span
                className="size-[20px] rounded-full"
                style={{
                  backgroundImage: `url(${profileImgUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <span className="text-[10px] text-[var(--gray-200)]">
                {author}
              </span>
            </div>
            <div className="flex gap-[10px]">
              <span className="flex text-[10px] text-[var(--gray-200)] gap-[5px]">
                <CalendarDays size={15} color="var(--gray-200)" /> {deadLine}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
