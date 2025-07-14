'use client';

import { useState } from 'react';
import { UserCog } from 'lucide-react';
import Button from '@/components/ui/Button';

const TABS = ['전체 사용자', '관리자', '블랙 리스트'];

const dummyEmails = [
  { name: '지지', email: 'jiji@naver.com' },
  { name: '은은', email: 'ee@naver.com' },
  { name: '관리자1', email: 'admin@admin.com' },
];

export default function UserManagement() {
  const [selectedTab, setSelectedTab] = useState<string>('전체 사용자');

  return (
    <div className="w-[1000px] bg-[var(--white)] rounded-lg p-4 flex flex-col justify-start border border-[var(--gray-50)]">
      {/* 상단 타이틀 */}
      <div className="flex items-center gap-2 text-[var(--primary-300)] font-semibold text-[18px] mb-[16px]">
        <UserCog size={20} className="mr-1" />
        사용자 관리
      </div>

      {/* 탭 메뉴 */}
      <div className="flex gap-[26px] mb-4 text-[15px] font-medium">
        {TABS.map((tab) => (
          <span
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`cursor-pointer pb-1 ${
              selectedTab === tab
                ? 'text-[var(--primary-300)] border-b-2 border-[var(--primary-300)]'
                : 'text-[var(--gray-300)]'
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* 선택된 탭 내용 */}
      <div className="text-[#333] text-[15px]">
        {selectedTab === '블랙 리스트' ? (
          <div className="bg-[#F5F5F5] px-[8px] py-[6px] text-[13px] space-y-[2px] rounded-md">
            {dummyEmails.map(({ name, email }) => (
              <div key={email}>
                <span className="text-[15px] text-[var(--black)] mr-1">
                  {name}
                </span>
                <span className="text-[var(--gray-300)] text-[13px]">
                  {email}
                </span>
              </div>
            ))}
            <div className="flex justify-center gap-2 mt-[10px]">
              <Button
                buttonStyle="smGreen"
                className="w-[100px] h-[28px] text-[15px]"
              >
                추가하기
              </Button>
              <Button
                buttonStyle="white"
                className="w-[100px] h-[28px] text-[15px]"
              >
                수정하기
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-[var(--gray-300)] text-[14px]">
            {selectedTab} 탭의 내용을 여기에 추가하세요.
          </div>
        )}
      </div>
    </div>
  );
}
