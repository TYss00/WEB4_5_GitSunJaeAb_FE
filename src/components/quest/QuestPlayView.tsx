'use client';
import { useAuthStore } from '@/store/useAuthStore';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';
import axiosInstance from '@/libs/axios';
import { toast } from 'react-toastify';
import { QuestPlayViewProps } from '@/types/quest';

export default function QuestPlayView({
  submission,
  onBack,
  onJudge,
  questAuthorId,
}: QuestPlayViewProps) {
  const currentUser = useAuthStore((state) => state.user);
  const isAuthor = currentUser?.id === questAuthorId;

  const handleJudge = async (isRecognized: boolean) => {
    if (!submission.id) {
      toast.error('memberQuestId가 없습니다.');
      return;
    }

    try {
      await axiosInstance.put('/quests/memberQuest/judge', {
        memberQuestId: submission.id,
        isRecognized,
      });
      toast.success(isRecognized ? '정답 처리 완료' : '오답 처리 완료');

      onJudge(submission.id, isRecognized);
      onBack();
    } catch (err) {
      console.error('판정 실패', err);
      toast.error('판정 처리 중 오류 발생');
    }
  };

  return (
    <div className="w-full h-full border border-[var(--gray-200)] rounded-[10px] p-4">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        className="flex items-center text-[var(--primary-300)] cursor-pointer"
      >
        <ChevronLeft size={18} />
        뒤로가기
      </button>

      {/* 작성자 정보 */}
      <div className="mt-3 flex items-center gap-2.5">
        <div className="relative bg-gray-500 rounded-full size-9.5">
          <Image
            src={submission.profileImage || '/assets/defaultProfile.png'}
            alt="프로필 이미지"
            fill
            className="object-cover rounded-full"
          />
        </div>
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
        <h2 className="text-[18px] font-medium mb-2">
          {submission.description}
        </h2>
        <div className="relative h-[330px] bg-gray-300 rounded-lg">
          <Image
            src={submission.imageUrl || '/assets/defaultImage.png'}
            alt="제출 이미지"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* 정답/오답 버튼 - 작성자일 때만 표시 */}
      {isAuthor && submission.isRecognized === null && (
        <div className="mt-5 flex justify-center gap-20">
          <Button
            buttonStyle="smGreen"
            className="px-6 py-2 text-[15px]"
            onClick={() => handleJudge(true)}
          >
            정답
          </Button>
          <Button
            buttonStyle="white"
            className="px-6 py-2 text-[15px]"
            onClick={() => handleJudge(false)}
          >
            오답
          </Button>
        </div>
      )}
    </div>
  );
}
