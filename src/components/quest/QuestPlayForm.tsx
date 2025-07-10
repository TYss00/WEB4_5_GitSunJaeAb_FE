import { ChevronLeft, ImagePlus } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Props = {
  onBack: () => void;
};

export default function QuestPlayForm({ onBack }: Props) {
  return (
    <div className="w-[428px] border border-[var(--gray-200)] rounded-[10px] p-4">
      {/* 뒤로가기 */}
      <button
        onClick={onBack}
        className="flex items-center text-[var(--primary-300)] cursor-pointer"
      >
        <ChevronLeft size={18} />
        뒤로가기
      </button>
      <form className="mt-4">
        {/* 이미지 등록 */}
        <div
          className="w-full aspect-[16/9] bg-[var(--gray-50)] relative cursor-pointer
                rounded-[10px] border-2 border-dotted border-[var(--gray-200)]"
        >
          <ImagePlus className="text-[var(--gray-200)] absolute left-1/2 top-1/2 -translate-1/2" />
        </div>
        <div className="mt-4">
          {/* 제목 입력 */}
          <h4>제목</h4>
          <Input />
          {/* 내용 입력 */}
          <h4 className="mt-4">내용</h4>
          <Input />
        </div>
        <div className="mt-4 flex gap-4 justify-center">
          <Button
            buttonStyle="white"
            className="px-10 h-[42px] rounded-[8px] cursor-pointer"
          >
            취소
          </Button>
          <Button className="px-10 cursor-pointer">등록</Button>
        </div>
      </form>
    </div>
  );
}
