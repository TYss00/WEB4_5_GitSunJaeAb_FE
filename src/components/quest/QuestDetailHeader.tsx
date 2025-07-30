
'use client'
import { useParams, useRouter } from 'next/navigation'

import {
  ChevronLeft,
  Eye,
  X,
  Lightbulb,
  CalendarDays,
  Ellipsis,
  PencilLine,
  Trash2,
  Siren,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { QuestInfo } from '@/types/type'
import Image from 'next/image'
import { differenceInDays } from 'date-fns'
import axiosInstance from '@/libs/axios'
import { useAuthStore } from '@/store/useAuthStore'
import ReportModal from '../common/modal/ReportModal'
import ConfirmModal from '../common/modal/ConfirmModal'


export default function QuestDetailHeader({
  questInfo,
  questId,
}: {
  questInfo: QuestInfo;
  questId: number;
}) {

  const { id } = useParams()
  const currentUserId = useAuthStore((state) => state.user?.id)

  const router = useRouter()
  const [isHintOpen, setIsHintOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const [isReportOpen, setIsReportOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const deadline = new Date(questInfo.deadline.slice(0, 10))
  const today = new Date()
  const remainingDays = differenceInDays(deadline, today)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/quests/${id}`)
      router.push('/dashbord/quest')
    } catch (error) {
      console.error('삭제 실패: ', error)
      alert('삭제 권한이 없거나 실패했습니다.')
    } finally {
      setIsDeleteOpen(false)
    }
  }

  return (
    <>
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
          <p className="text-[13px] text-[var(--white)] p-[5px] rounded-[8px] bg-[var(--primary-300)]">
            {questInfo.isActive ? '진행중' : '마감'}
          </p>
          <div>
            {/* 마감일 */}
            <p className="flex gap-[5px] items-center text-xs text-[var(--gray-200)]">
              <CalendarDays size={15} color="var(--gray-200)" />~
              {questInfo.deadline.slice(0, 10)}
            </p>
            {remainingDays >= 0 ? (
              <p className="text-sm text-[var(--gray-300)]">
                마감까지 {remainingDays}일전
              </p>
            ) : (
              ''
            )}
          </div>
        </div>

        {/* 제목 + 좋아요/조회수/메뉴or신고 */}
        <div className="mt-4 flex justify-between items-start">
          <h2 className="font-semibold text-[25px]">{questInfo.title}</h2>

          {/* 좋아요/조회수/메뉴or신고 */}
          <div className="flex gap-4">
            {/* 조회수 */}
            <div className="flex gap-1 items-center">
              <Eye size={18} />
              <span className="font-medium text-[15px]">
                {questInfo.viewCount}
              </span>
            </div>
            {currentUserId === questInfo.member.id ? (
              // 작성자일 경우: 점 3개 메뉴 (수정/삭제)
              <div className="relative" ref={dropdownRef}>
                <Ellipsis
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                />
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow z-50">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        router.push(`/dashbord/quest/edit/${id}`)
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                    >
                      <PencilLine size={18} />
                      수정하기
                    </button>
                    <div className="border-t border-gray-200 mx-2" />
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsDeleteOpen(true)
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-500"
                    >
                      <Trash2 size={18} />
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Siren
                size={18}
                className="cursor-pointer text-red-500"
                onClick={() => setIsReportOpen(true)}
              />
            )}
          </div>

          <div className="relative">
            {/* 메뉴버튼 */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="cursor-pointer"
            >
              <MoreVertical size={18} />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded shadow z-50 flex flex-col w-max">
                <div
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-500"
                  onClick={() => {
                    setIsReportOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <Siren size={16} />
                  <span>신고하기</span>
                </div>
              </div>
            )}
          </div>

        </div>
        <p className="text-[18px] mt-4">{questInfo.description}</p>
        {/* 작성자 */}
        <div className="mt-4 flex gap-2 items-center">
          {/* 프로필 이미지 */}
          <div className="bg-gray-600 size-[34px] rounded-full overflow-hidden">
            <Image
              src={
                questInfo.member.profileImage ?? '/assets/defaultProfile.png'
              }
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
      {isReportOpen && (
        <ReportModal
          reportType="quest"
          targetId={Number(questId)}
          onClose={() => setIsReportOpen(false)}
        />
      )}
      {isDeleteOpen && (
        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onDelete={handleDelete}
          confirmType="post"
        />
      )}
    </>
  )
}
