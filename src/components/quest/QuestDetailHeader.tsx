'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Heart, Eye, MoreVertical } from 'lucide-react';
export default function QuestDetailHeader() {
  const router = useRouter();
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
        <p className="font-medium text-[var(--white)] px-4.5 py-2 rounded-[8px] bg-[var(--primary-300)]">
          진행중
        </p>
        <p className="text-sm text-[var(--gray-300)]">마감까지 6일전</p>
      </div>

      {/* 제목 + 좋아요/조회수/메뉴or신고 */}
      <div className="mt-4 flex justify-between items-center">
        <h2 className="font-medium text-[20px]">여긴 어디게?</h2>
        {/* 좋아요/조회수/메뉴or신고 */}
        <div className="flex gap-4">
          {/* 좋아요 */}
          <div className="flex gap-1 items-center">
            <button className="cursor-pointer">
              <Heart size={18} />
            </button>
            <span className="font-medium text-[15px]">4</span>
          </div>
          {/* 조회수 */}
          <div className="flex gap-1 items-center">
            <Eye size={18} />
            <span className="font-medium text-[15px]">22</span>
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
        <div className="bg-gray-600 size-9 rounded-full"></div>
        {/* 닉네임 */}
        <p className="text-[15px]">짱구</p>
        {/* 작성일 */}
        <p className="text-xs text-[var(--gray-200)]">2025. 07. 06</p>
      </div>

      {/* 퀘스트 이미지 */}
      <div className="mt-4 bg-gray-400 w-[1100px] h-[500px] rounded-[10px]"></div>
    </div>
  );
}
