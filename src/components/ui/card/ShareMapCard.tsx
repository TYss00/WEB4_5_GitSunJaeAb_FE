'use client'

import { ShareMapCardProps } from '@/types/type'

export default function ShareMapCard({
  isEvent = false,
  title,
  mapImageUrl,
  participants,
}: ShareMapCardProps) {
  const labelText = isEvent ? 'Event' : 'User'
  const labelColor = isEvent ? 'var(--blue)' : 'var(--primary-300)'
  return (
    <>
      <div
        className="flex flex-col w-[252px] h-[350px] border border-[var(--gray-100)] rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out 
             hover:shadow-lg hover:-translate-y-1"
      >
        <div className="flex flex-col gap-[20px] justify-start m-[20px] bg-white">
          <span
            className="text-[14px] font-semibold"
            style={{ color: labelColor }}
          >
            {labelText}
          </span>
          <span className="text-[18px] font-semibold">{title}</span>
        </div>
        <div
          className="flex-grow relative"
          style={{
            backgroundImage: `url(${mapImageUrl})`,
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
  )
}
