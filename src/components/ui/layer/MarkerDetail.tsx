'use client'

import { MarkerDetailProps } from '@/types/type'
import { MapPin, Siren } from 'lucide-react'

export default function MarkerDetail({ isTextArea }: MarkerDetailProps) {
  return (
    <>
      <div className="flex flex-col justify-between px-[15px] py-[13px] w-[470px] rounded-[5px] border border-[var(--primary-100)] bg-[var(--white)]">
        <div className="flex justify-between items-center mb-[3px]">
          <div className="flex gap-[10px] items-center">
            <MapPin size={24} color="var(--primary-100)" />

            <span className="text-[18px] text-[var(--primary-100)] font-semibold cursor-pointer">
              장소 이름
            </span>
          </div>
          <Siren size={18} color="black" className="cursor-pointer" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-[var(--primary-100)]">
            주소주소주소
          </span>
        </div>
        {isTextArea && (
          <div className="p-[5px] mt-[20px] border border-[var(--primary-100)] rounded-[5px] h-[100px] ">
            내용입니다~
          </div>
        )}
      </div>
    </>
  )
}
