'use client'
import { useRouter } from 'next/navigation'
import {
  ChevronLeft,
  Eye,
  MoreVertical,
  X,
  Lightbulb,
  CalendarDays,
} from 'lucide-react'
import { useState } from 'react'
import { QuestInfo } from '@/types/type'
import Image from 'next/image'
import { differenceInDays } from 'date-fns'

export default function QuestDetailHeader({
  questInfo,
}: {
  questInfo: QuestInfo
}) {
  const router = useRouter()
  const [isHintOpen, setIsHintOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const deadline = new Date(questInfo.deadline.slice(0, 10))
  const today = new Date()
  const remainingDays = differenceInDays(deadline, today)
  return (
    <div className="w-[1100px] m-auto">
      {/* 뒤로가기 */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-[var(--primary-300)] cursor-pointer"
      >
        <ChevronLeft size={18} />
        뒤로가기
      </button>

      {/* 진행/마감 */}
      <div className="mt-4 flex items-center gap-2.5">
        <p className="text-[11px] text-[var(--white)] p-[5px] rounded-[8px] bg-[var(--primary-300)]">
          {questInfo.isActive ? '진행중' : '마감'}
        </p>
        {remainingDays >= 0 ? (
          <p className="text-sm text-[var(--gray-300)]">
            마감까지 {remainingDays}일전
          </p>
        ) : (
          ''
        )}
        {/* 마감일 */}
        <p className="flex gap-[5px] items-center text-xs text-[var(--gray-200)]">
          <CalendarDays size={15} color="var(--gray-200)" />~
          {questInfo.deadline.slice(0, 10)}
        </p>
      </div>

      {/* 제목 + 좋아요/조회수/메뉴or신고 */}
      <div className="mt-4 flex justify-between items-start">
        <div className="flex flex-col gap-[10px]">
          <h2 className="font-semibold text-[25px]">{questInfo.title}</h2>
          <p className="text-[18px]">{questInfo.description}</p>
        </div>
        {/* 좋아요/조회수/메뉴or신고 */}
        <div className="flex gap-4">
          {/* 조회수 */}
          <div className="flex gap-1 items-center">
            <Eye size={18} />
            <span className="font-medium text-[15px]">
              {questInfo.viewCount}
            </span>
          </div>
          {/* 메뉴버튼 */}
          <button className="cursor-pointer">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* 작성자 */}
      <div className="mt-4 flex gap-2 items-center">
        {/* 프로필 이미지 */}
        <div className="bg-gray-600 size-[34px] rounded-full overflow-hidden">
          <Image
            src={questInfo.member.profileImage ?? '/assets/defaultProfile.png'}
            alt="작성자 프로필 이미지"
            width={34}
            height={34}
          />
        </div>
        {/* 닉네임 */}
        <p className="text-[15px]">{questInfo.member.nickname}</p>
      </div>

      {/* 퀘스트 이미지 */}
      <div
        className="mt-4 bg-gray-400 w-[1100px] h-[500px] rounded-[10px] relative bg-cover bg-center bg-no-repeat"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundImage: `url(${questInfo.questImage})`,
        }}
      >
        {/* 힌트 */}
        {(isHovered || isHintOpen) && (
          <button
            onClick={() => setIsHintOpen((prev) => !prev)}
            className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 
              rounded-[6px] text-[16px] font-medium transition bg-[var(--white)]/60 cursor-pointer
            ${
              isHintOpen ? ' text-[var(--red)]' : ' text-[var(--primary-300)]'
            }`}
          >
            {isHintOpen ? (
              <>
                <X size={20} />
                힌트 닫기
              </>
            ) : (
              <>
                <Lightbulb size={20} />
                힌트 보기
              </>
            )}
          </button>
        )}
      </div>
      {/* 힌트 내용 */}
      {isHintOpen && (
        <div className="mt-3 bg-[var(--gray-40)]/80 border-l-2 border-[var(--primary-300)] p-3 text-sm text-[var(--gray-700)]">
          {questInfo.hint ?? '힌트 없음'}
        </div>
      )}
    </div>
  )
}
