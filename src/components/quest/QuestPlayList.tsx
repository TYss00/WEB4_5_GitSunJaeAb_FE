'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import QuestDeatilRanking from './QuestDeatilRanking';
import { useAuthStore } from '@/store/useAuthStore';
import { QuestPlayListProps } from '@/types/quest';

export default function QuestPlayList({
  submission,
  onSelect,
  onFormOpen,
  questIsActive,
  questAuthorId,
}: QuestPlayListProps) {
  const [activeTab, setActiveTab] = useState('전체');
  const tabs = ['전체', '정답', '오답', '대기'];

  const { user } = useAuthStore();
  const hasParticipated = submission.some((s) => s.nickname === user?.nickname);
  const isAuthor = user?.id === questAuthorId;

  const canParticipate = !hasParticipated && questIsActive && !isAuthor;

  const sortedSubmissions = [...submission].sort(
    (a, b) =>
      new Date(b.createdAt ?? b.submittedAt).getTime() -
      new Date(a.createdAt ?? a.submittedAt).getTime()
  );

  const filtered =
    activeTab === '전체'
      ? sortedSubmissions
      : sortedSubmissions.filter((item) => {
          switch (activeTab) {
            case '정답':
              return item.isRecognized === true;
            case '오답':
              return item.isRecognized === false;
            case '대기':
              return item.isRecognized === null;
            default:
              return true;
          }
        });

  const emptyMessage = {
    전체: '참여한 사람이 없습니다.',
    정답: '정답자가 없습니다.',
    오답: '오답자가 없습니다.',
    대기: '대기 중인 사람이 없습니다.',
  }[activeTab];

  return (
    <div className="w-full h-full border border-[var(--gray-200)] rounded-[10px] p-4">
      <div className="w-full flex justify-between">
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
        <ul>
          <li
            onClick={() => setActiveTab('랭킹')}
            className={`px-1 cursor-pointer transition-all ${
              activeTab === '랭킹'
                ? 'text-[var(--primary-300)] font-semibold'
                : 'text-[var(--gray-300)]'
            }`}
          >
            랭킹
          </li>
        </ul>
      </div>

      {activeTab === '랭킹' ? (
        <QuestDeatilRanking />
      ) : (
        <>
          <div className="h-[460px] overflow-y-auto">
            {/* 리스트 */}
            {filtered.length === 0 ? (
              <p className="text-[var(--gray-300)] text-center py-8">
                {emptyMessage}
              </p>
            ) : (
              filtered.map((item) => (
                <div
                  onClick={() => onSelect(item)}
                  key={item.submittedAt}
                  className="flex gap-3 mb-4 cursor-pointer"
                >
                  <div
                    className="bg-gray-600 relative w-[160px] h-[100px] rounded-[10px]"
                    style={{
                      backgroundImage: `url(${item.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <span
                      className={`absolute bottom-1.5 left-1.5 text-white rounded-[10px] px-2.5 py-1 ${
                        item.isRecognized === true
                          ? 'bg-[var(--primary-200)]'
                          : item.isRecognized === false
                          ? 'bg-[var(--red)]'
                          : 'bg-[var(--gray-300)]'
                      }`}
                    >
                      {item.isRecognized === true
                        ? '정답'
                        : item.isRecognized === false
                        ? '오답'
                        : '대기'}
                    </span>
                  </div>
                  <div className="py-2.5 flex flex-col justify-between">
                    <h4 className="text-[18px] font-medium">{item.title}</h4>
                    <div>
                      <p className="font-medium text-sm">{item.nickname}</p>
                      <p className="text-[13px] text-[var(--gray-200)]">
                        {item.createdAt!.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {canParticipate && (
            <Button
              onClick={onFormOpen}
              buttonStyle="green"
              className="w-full text-[15px] h-[38px] cursor-pointer mt-3"
            >
              참여하기
            </Button>
          )}
        </>
      )}
    </div>
  );
}
