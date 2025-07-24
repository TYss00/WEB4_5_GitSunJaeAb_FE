'use client'

import ReportModal from '@/components/common/modal/ReportModal'
import { reverseGeocode } from '@/libs/geocode'
import { MarkerDetailProps } from '@/types/type'
import { MapPin, Siren } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function MarkerDetail({
  title,
  description,
  location,
  isTextArea,
}: MarkerDetailProps) {
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const result = await reverseGeocode(location.lat, location.lng)
        setAddress(result)
      } catch (err) {
        setAddress('주소 변환 실패')
      }
    }

    fetchAddress()
  }, [location.lat, location.lng])
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
            {address}
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
