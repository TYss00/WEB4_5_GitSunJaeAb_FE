'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Download, Layers } from 'lucide-react'
import { LayerDetailProps } from '@/types/type'
import axiosInstance from '@/libs/axios'
import { toast } from 'react-toastify'

export default function LayerDetail({
  title,
  id,
  defaultOpen = false,
  children,
}: LayerDetailProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const handleZzim = async () => {
    try {
      await axiosInstance.post(`/layers/member?layerId=${id}`)
      toast.success('레이어 찜 완료!')
    } catch{
      toast.error('레이어 찜 오류')
    }
  }
  return (
    <>
      <div className="w-full">
        <div
          className={`flex justify-between px-[15px] h-[55px] transition-colors ${
            isOpen
              ? 'bg-[#EBF2F2] rounded-t-[5px]'
              : 'bg-[var(--gray-40)] rounded-[5px]'
          }`}
        >
          <div className="flex gap-[10px] items-center">
            <Layers
              size={24}
              color={`${isOpen ? 'var(--primary-300)' : 'black'}`}
            />
            <span
              className={`text-[18px] ${
                isOpen ? 'text-[var(--primary-300)]' : 'text-[var(--black)]'
              }`}
            >
              {title}
            </span>
          </div>
          <div className="flex gap-[10px] items-center">
            <Download
              size={18}
              onClick={handleZzim}
              className="cursor-pointer"
            />
            {isOpen ? (
              <ChevronUp size={24} onClick={() => setIsOpen((prev) => !prev)} />
            ) : (
              <ChevronDown
                size={24}
                onClick={() => setIsOpen((prev) => !prev)}
              />
            )}
          </div>
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpen
              ? 'max-h-[633px] bg-[#EBF2F2] opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-[10px] rounded-b-[5px] flex flex-col gap-[15px] max-h-[633px] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
