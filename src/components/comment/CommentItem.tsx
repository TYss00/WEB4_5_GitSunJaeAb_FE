'use client'

import { Siren } from 'lucide-react'
import { useState } from 'react'
import ReportModal from '../common/modal/ReportModal'

export default function CommentItem() {
  const [isReportOpen, setIsReportOpen] = useState(false)
  return (
    <>
      <li className="flex flex-col gap-2 py-2">
        <div className="flex items-center gap-2">
          {/* 프로필이미지 */}
          <div className="size-[34px] bg-gray-500 rounded-full"></div>
          {/* 작성자 + 작성일 */}
          <div className="w-full">
            <div className="flex w-full justify-between">
              <h4 className="text-[15px] font-medium">짱아</h4>
              <Siren
                size={16}
                className="cursor-pointer"
                onClick={() => setIsReportOpen(true)}
              />
            </div>
            <p className="text-xs text-[var(--gray-200)]">2025.07.06</p>
          </div>
        </div>
        <p className="text-sm px-1.5">이런거 좋네</p>
      </li>

      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </>
  )
}
