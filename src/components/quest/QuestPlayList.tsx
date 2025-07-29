'use client'

import { useState } from 'react'
import Button from '../ui/Button'
import QuestDeatilRanking from './QuestDeatilRanking'

type Answer = {
  id: number
  title: string
  user: string
  date: string
  type: '정답' | '오답' | '참여'
  content: string
  profileImage?: string
}

type Props = {
  answers: Answer[]
  onSelect: (answer: Answer) => void
  onFormOpen: () => void
}

export default function QuestPlayList({
  answers,
  onSelect,
  onFormOpen,
}: Props) {
  const [activeTab, setActiveTab] = useState('전체')
  const tabs = ['전체', '정답', '오답']

  const filtered =
    activeTab === '전체'
      ? answers
      : answers.filter((item) => item.type === activeTab)

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
              key={item.id}
              className="flex gap-3 mb-4 cursor-pointer"
            >
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
                  <p className="text-[13px] text-[var(--gray-200)]">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <Button
            onClick={onFormOpen}
            buttonStyle="green"
            className="w-full text-[15px] h-[38px] cursor-pointer"
          >
            참여하기
          </Button>
        </>
      )}
    </div>
  )
}
