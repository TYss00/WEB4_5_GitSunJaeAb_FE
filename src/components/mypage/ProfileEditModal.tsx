'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import ProfileTab from './profiletab/ProfileTab';
import InterestTab from './profiletab/InterestTab';
import AchievementTab from './profiletab/AchievementTab';

const TABS = ['프로필', '관심 분야', '업적'];

export default function ProfileEditModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('프로필');

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="w-[500px] h-[700px] px-[25px] pt-[20px] pb-[30px] flex flex-col justify-between items-center gap-[15px] bg-white rounded-[10px]">
        <div className="w-full flex justify-end">
          <X size={20} onClick={onClose} className="cursor-pointer" />
        </div>

        <div className="w-full flex justify-center gap-[15px] mb-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`text-sm font-medium pb-1 ${
                activeTab === tab
                  ? 'text-[var(--primary-300)] border-b-2 border-[var(--primary-300)]'
                  : 'text-[var(--gray-300)]'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 탭 */}
        <div className="flex-1 w-full overflow-y-auto">
          {activeTab === '프로필' && <ProfileTab />}
          {activeTab === '관심 분야' && <InterestTab />}
          {activeTab === '업적' && <AchievementTab />}
        </div>

        <Button
          buttonStyle="green"
          className="w-[180px] h-[40px] px-6 mt-2"
          onClick={onClose}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
