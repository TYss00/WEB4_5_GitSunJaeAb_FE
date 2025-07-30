import { useAuthStore } from '@/store/useAuthStore'
import { QuestInfo, SubmissionInfo } from '@/types/type'
import { ChevronLeft, CircleCheck, CircleX } from 'lucide-react'
import Image from 'next/image'

type Props = {
  questInfo: QuestInfo
  submission: SubmissionInfo
  onBack: () => void
}

export default function QuestPlayView({
  questInfo,
  submission,
  onBack,
}: Props) {
  const currentUserId = useAuthStore((state) => state.user?.id)

  return (
    <div className="w-full border border-[var(--gray-200)] rounded-[10px] p-4">
      {/* 뒤로가기버튼 */}
      <button
        onClick={onBack}
        className="flex items-center text-[var(--primary-300)] cursor-pointer"
      >
        <ChevronLeft size={18} />
        뒤로가기
      </button>
      {/* 작성자 정보 */}
      <div className="mt-3 flex items-center gap-2.5">
        {/* 프로필이미지 */}
        <div className="relative bg-gray-500 rounded-full size-9.5">
          <Image
            src={submission.profileImage}
            alt="프로필 이미지"
            fill
            className="object-fill"
          />
        </div>

        {/* 이름+작성일 */}
        <div>
          <p className="text-[15px] font-medium">{submission.nickname}</p>
          <p className="text-xs text-[var(--gray-200)]">
            {submission.submittedAt?.slice(0, 10)}
          </p>
        </div>
      </div>
      {/* 내용 + 이미지 */}
      <div className="mt-2">
        <h2 className="text-[18px] font-medium mb-2">{submission.title}</h2>
        <div className="relative h-[200px] bg-gray-300 rounded-lg">
          <Image
            src={submission.imageUrl}
            alt="제출 이미지"
            fill
            className="object-cover"
          />
        </div>
      </div>
      {currentUserId === questInfo.member.id && (
        <>
          <div className="flex gap-[10px] mt-4">
            <CircleCheck size={30} color="green" />
            <CircleX size={30} color="red" />
          </div>
        </>
      )}
    </div>
  )
}
