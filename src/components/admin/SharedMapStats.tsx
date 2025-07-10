'use client';

import { ChartBar } from 'lucide-react';

export default function SharedMapStats() {
  const data = [
    { label: '서울시 야경 지도', percentage: 60 },
    { label: '부산 지도', percentage: 33 },
  ];

  return (
    <div className="w-[350px] h-[178px] bg-[var(--white)] rounded-xl p-4 space-y-4 border border-[var(--gray-50)]">
      <div className="flex items-center text-[16px] text-[var(--primary-300)] font-semibold">
        <ChartBar size={20} className="mr-1" />
        공유지도 참여율
      </div>

      {data.map(({ label, percentage }) => (
        <div key={label} className="text-[15px] text-[var(--black)] space-y-1">
          <div className="flex justify-between">
            <span>{label}</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full h-2 bg-[#EFEFEF] rounded-full">
            <div
              className="h-full bg-[var(--primary-300)] rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
