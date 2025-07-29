import { ChevronLeft } from 'lucide-react'

type Answer = {
  id: number
  title: string
  user: string
  date: string
  type: '정답' | '오답' | '참여'
  content: string
  profileImage?: string
}

type Props = {
  answer: Answer
  onBack: () => void
}

export default function QuestPlayView({ answer, onBack }: Props) {
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
        <div className="bg-gray-500 rounded-full size-9.5"></div>

        {/* 이름+작성일 */}
        <div>
          <p className="text-[15px] font-medium">{answer.user}</p>
          <p className="text-xs text-[var(--gray-200)]">{answer.date}</p>
        </div>
      </div>
      {/* 내용 + 이미지 */}
      <div className="mt-2">
        <h2 className="text-[18px] font-medium mb-2">{answer.title}</h2>
        <div className="h-[200px] bg-gray-300 rounded-lg" />
      </div>
    </div>
  )
}
