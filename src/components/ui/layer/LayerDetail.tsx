'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Download, Layers } from 'lucide-react'
import { LayerDetailProps } from '@/types/type'

export default function LayerDetail({
  title,
  defaultOpen = false,
  children,
}: LayerDetailProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <>
      <div className="w-[490px]">
        <div
          className={`flex justify-between px-[15px] h-[55px]  cursor-pointer transition-colors ${
            isOpen
              ? 'bg-[#EBF2F2] rounded-t-[5px]'
              : 'bg-[var(--gray-30)] rounded-[5px]'
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
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
            <Download size={18} />
            {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpen
              ? 'max-h-[500px] bg-[#EBF2F2] opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-[10px]  rounded-b-[5px] flex flex-col gap-[15px]">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
