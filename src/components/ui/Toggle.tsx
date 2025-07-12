'use client'

import { ToggleProps } from '@/types/type'
import {
  CirclePause,
  CirclePlay,
  Eye,
  EyeOff,
  Navigation,
  NavigationOff,
} from 'lucide-react'
import { useMemo, useState } from 'react'

export default function Toggle({ label, onChange }: ToggleProps) {
  const [isActive, setIsActive] = useState(true)

  const toggleHandler = () => {
    setIsActive((prev) => {
      const next = !prev
      if (onChange) onChange(next)
      return next
    })
  }

  const { iconOn, iconOff, labelOn, labelOff } = useMemo(() => {
    switch (label) {
      case '공개':
        return {
          iconOn: <Eye size={25} />,
          iconOff: <EyeOff size={25} className="opacity-50" />,
          labelOn: '공개',
          labelOff: '비공개',
        }
      case '경로':
        return {
          iconOn: <Navigation size={25} />,
          iconOff: <NavigationOff size={25} className="opacity-50" />,
          labelOn: '경로',
          labelOff: '경로',
        }
      case '애니메이션':
        return {
          iconOn: <CirclePlay size={25} />,
          iconOff: <CirclePause size={25} className="opacity-50" />,
          labelOn: '애니메이션',
          labelOff: '애니메이션',
        }
      default:
        return {
          iconOn: null,
          iconOff: null,
          labelOn: '',
          labelOff: '',
        }
    }
  }, [label])

  return (
    <>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-[10px] text-[18px]">
          <div className="relative w-[25px] h-[25px]">
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {iconOn}
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                isActive ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {iconOff}
            </div>
          </div>
          {isActive ? labelOn : labelOff}
        </div>
        <div
          className={`relative w-[64px] h-[31px] p-[5px] rounded-full cursor-pointer transition-colors duration-300 ${
            isActive ? 'bg-[var(--primary-300)] ' : 'bg-[var(--gray-50)] '
          } `}
          onClick={toggleHandler}
        >
          <span
            className={`absolute top-[5px] left-[5px] size-[21px] bg-[var(--white)] rounded-full transition-transform duration-300 ${
              isActive ? 'translate-x-0' : 'translate-x-[33px]'
            }`}
          />
        </div>
      </div>
    </>
  )
}
