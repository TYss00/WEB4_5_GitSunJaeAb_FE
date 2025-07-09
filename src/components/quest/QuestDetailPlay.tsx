'use client';

import { useState } from 'react';
import Button from '../ui/Button';

type Answer = {
  id: number;
  title: string;
  user: string;
  date: string;
  type: '정답' | '오답' | '참여';
};

// 임시 더미데이터
const dummyAnswers: Answer[] = [
  { id: 1, title: '여기잖아', user: '지지', date: '2025.07.07', type: '정답' },
  { id: 2, title: '여기 아님', user: '코코', date: '2025.07.08', type: '오답' },
  { id: 3, title: '확실해', user: '루비', date: '2025.07.09', type: '참여' },
];

export default function QuestDetailPlay() {
  const [activeTab, setActiveTab] = useState('전체');
  const tabs = ['전체', '정답', '오답'];

  const filtered =
    activeTab === '전체'
      ? dummyAnswers
      : dummyAnswers.filter((item) => item.type === activeTab);

  return (
    <div className="w-[428px] border border-[var(--gray-200)] rounded-[10px] p-4">
      {/* 탭메뉴 */}
      <ul className="flex gap-4 mb-4">
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-1 cursor-pointer transition-all ${
              activeTab === tab
                ? 'text-[var(--primary-300)] font-semibold'
                : 'text-[var(--gray-300)]'
            }`}
          >
            {tab}
          </li>
        ))}
      </ul>
      {/* 리스트 */}
      {filtered.map((item) => (
        <div key={item.id} className="flex gap-3 mb-4">
          <div className="bg-gray-600 relative w-[160px] h-[100px] rounded-[10px]">
            <span
              className={`absolute bottom-1.5 left-1.5 text-white rounded-[10px] ${
                item.type === '정답'
                  ? 'bg-[var(--primary-200)] px-2.5 py-1'
                  : item.type === '오답'
                  ? 'bg-[var(--red)] px-2.5 py-1'
                  : 'hidden'
              }`}
            >
              {item.type}
            </span>
          </div>
          <div className="py-2.5 flex flex-col justify-between">
            <h4 className="text-[18px] font-medium">{item.title}</h4>
            <div>
              <p className="font-medium text-sm">{item.user}</p>
              <p className="text-[13px] text-[var(--gray-200)]">{item.date}</p>
            </div>
          </div>
        </div>
      ))}
      <Button buttonStyle="green" className="w-full text-[15px] h-[38px]">
        참여하기
      </Button>
    </div>
  );
}
