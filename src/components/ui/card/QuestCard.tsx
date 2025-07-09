'use client'

import { QuestCardProps } from '@/types/type'
import { truncateText } from '@/utils/truncateText'
import { Heart, CalendarDays } from 'lucide-react'
import { useState } from 'react'

export default function QuestCard({
  isInProgress,
  mapImageUrl,
  title,
  description,
  hashtags,
  profileImgUrl,
  author,
  deadLine,
}: QuestCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const likeHandler = () => {
    setIsLiked((prev) => !prev)
  }
  const labelText = isInProgress ? '진행중' : '마감'
  const labelColor = isInProgress ? '#005C54' : '#9F9F9F'

  const truncatedTitle = truncateText(title, 16)
  const truncatedDescription = truncateText(description, 22)
  return (
    <>
      <div
        className="relative flex flex-col w-[350px] h-[278px] border border-[#d9d9d9] rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out 
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
                className="text-[11px] text-[#005C54] font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between w-full ">
            <div className="flex items-center gap-[5px]">
              <span
                className="size-[20px] rounded-full"
                style={{ backgroundImage: `url(${profileImgUrl})` }}
              />
              <span className="text-[10px] text-[#9F9F9F]">{author}</span>
            </div>
            <div className="flex gap-[10px]">
              <span className="flex text-[10px] text-[#9F9F9F] gap-[5px]">
                <CalendarDays size={15} color="#9F9F9F" /> {deadLine}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
