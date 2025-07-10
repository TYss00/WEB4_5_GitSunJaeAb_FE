'use client';

import { ChevronRight } from 'lucide-react';

interface HistoryModalProps {
  onClose: () => void;
}

export default function HistoryModal({ onClose }: HistoryModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-[var(--white)] rounded-[12px] w-[350px] max-h-[350px] overflow-y-auto shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] font-semibold">최근 변경 내역</h2>
          <button onClick={onClose}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="space-y-[10px] text-[14px] text-[var(--black)]">
          <div className="flex justify-between">
            <span className="w-[60px] font-medium">짱아</span>
            <span className="flex-1 text-center text-nowrap">
              서울 마라탕집 <span className="text-[var(--primary-300)]">+</span>
            </span>
            <span className="w-[60px] text-right text-[#7F7F7F]">방금</span>
          </div>

          <div className="flex justify-between">
            <span className="w-[60px] font-medium">짱아2</span>
            <span className="flex-1 text-center text-nowrap">
              서울 마라탕집 <span className="text-[var(--red)]">-</span>
            </span>
            <span className="w-[60px] text-right text-[#7F7F7F]">5분 전</span>
          </div>

          <div className="flex justify-between">
            <span className="w-[60px] font-medium">짱아</span>
            <span className="flex-1 text-center text-nowrap">
              서울 술집 <span className="text-[var(--primary-300)]">+</span>
            </span>
            <span className="w-[60px] text-right text-[#7F7F7F]">7분 전</span>
          </div>

          <div className="flex justify-between">
            <span className="w-[60px] font-medium">짱아</span>
            <span className="flex-1 text-center text-nowrap">
              서울 양꼬치집 <span className="text-[var(--primary-300)]">+</span>
            </span>
            <span className="w-[60px] text-right text-[#7F7F7F]">8분 전</span>
          </div>

          <div className="flex justify-between">
            <span className="w-[60px] font-medium">짱아5</span>
            <span className="flex-1 text-center text-nowrap">
              서울 중국집 <span className="text-[var(--primary-300)]">+</span>
            </span>
            <span className="w-[60px] text-right text-[#7F7F7F]">9분 전</span>
          </div>

          <div className="flex justify-between">
            <span className="w-[60px] font-medium">짱아6</span>
            <span className="flex-1 text-center text-nowrap">
              서울 삼겹살집 <span className="text-[var(--primary-300)]">+</span>
            </span>
            <span className="w-[60px] text-right text-[#7F7F7F]">10분 전</span>
          </div>

          <div className="flex justify-between">
            <span className="w-[60px] font-medium">짱아</span>
            <span className="flex-1 text-center text-nowrap">
              서울 마라탕집 <span className="text-[var(--primary-300)]">+</span>
            </span>
            <span className="w-[60px] text-right text-[#7F7F7F]">10분 전</span>
          </div>
        </div>
      </div>
    </div>
  );
}
