'use client'

import { useState } from 'react'
import Button from '../ui/Button'
import QuestDeatilRanking from './QuestDeatilRanking'
import { SubmissionInfo } from '@/types/type'
import { useAuthStore } from '@/store/useAuthStore'

type Props = {
  submission: SubmissionInfo[]
  onSelect: (answer: SubmissionInfo) => void
  onFormOpen: () => void
}

export default function QuestPlayList({
  submission,
  onSelect,
  onFormOpen,
}: Props) {
  const [activeTab, setActiveTab] = useState('전체')
  const tabs = ['전체', '정답', '오답']

  const { user } = useAuthStore()
  const hasParticipated = submission.some((s) => s.nickname === user?.nickname)

  const filtered =
    activeTab === '전체'
      ? submission
      : submission.filter((item) => {
          switch (activeTab) {
            case '정답':
              return item.recognized === true
            case '오답':
              return item.recognized === false
            case '대기':
              return item.recognized === null
            default:
              return true
          }
        })

  return (
    <div className="w-full border border-[var(--gray-200)] rounded-[10px] p-4">
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
          {/* 리스트 */}
          {filtered.map((item) => (
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
                    item.recognized === true
                      ? 'bg-[var(--primary-200)]'
                      : item.recognized === false
                      ? 'bg-[var(--red)]'
                      : 'bg-[var(--gray-300)]'
                  }`}
                >
                  {item.recognized === true
                    ? '정답'
                    : item.recognized === false
                    ? '오답'
                    : '대기'}
                </span>
              </div>
              <div className="py-2.5 flex flex-col justify-between">
                <h4 className="text-[18px] font-medium">{item.title}</h4>
                <div>
                  <p className="font-medium text-sm">{item.nickname}</p>
                  <p className="text-[13px] text-[var(--gray-200)]">
                    {item.submittedAt.slice(0, 10)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {!hasParticipated && (
            <Button
              onClick={onFormOpen}
              buttonStyle="green"
              className="w-full text-[15px] h-[38px] cursor-pointer"
            >
              참여하기
            </Button>
          )}
        </>
      )}
    </div>
  )
}
