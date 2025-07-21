'use client'

import ReportModal from '@/components/common/modal/ReportModal'
import { MarkerDetailProps } from '@/types/type'
import { MapPin, Siren } from 'lucide-react'
import { useState } from 'react'

export default function MarkerDetail({
  title,
  description,
  isTextArea,
}: MarkerDetailProps) {
  const [isReportOpen, setIsReportOpen] = useState(false)
  return (
    <>
      <div className="flex flex-col justify-between px-[15px] py-[13px] w-full rounded-[5px] border border-[var(--primary-100)] bg-[var(--white)]">
        <div className="flex justify-between items-center mb-[3px]">
          <div className="flex gap-[10px] items-center">
            <MapPin size={24} color="var(--primary-100)" />

            <span className="text-[18px] text-[var(--primary-100)] font-semibold cursor-pointer">
              {title}
            </span>
          </div>
          <Siren
            size={18}
            color="black"
            className="cursor-pointer"
            onClick={() => setIsReportOpen(true)}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-[var(--primary-100)]">
            주소주소주소
          </span>
        </div>
        {isTextArea && (
          <div className="p-[5px] mt-[20px] border border-[var(--primary-100)] rounded-[5px] h-[100px] ">
            {description}
          </div>
        )}
      </div>

      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </>
  )
}
