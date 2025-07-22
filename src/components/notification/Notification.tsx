'use client';
import { X } from 'lucide-react';
import NotiListItem from './NotiListItem';
import { useRef, useState } from 'react';

type NotificationProps = {
  onClose: () => void;
};

type NotificationType = '게시글' | '관리자';

// 나중에 api 보고 수정
type NotificationItem = {
  id: number;
  type: NotificationType;
  message: string;
  time: string;
  isRead: boolean;
};

// 더미 알림 데이터
// 나중에 api로 불러오기 + 프로필정보 필요
const dummyNotifications: NotificationItem[] = [
  {
    id: 1,
    type: '게시글',
    message: '철수님이 게시글에 댓글을 남겼습니다.',
    time: '12:14 PM',
    isRead: false,
  },
  {
    id: 2,
    type: '게시글',
    message: '영희님이 좋아요를 눌렀습니다.',
    time: '1:20 PM',
    isRead: false,
  },
  {
    id: 3,
    type: '게시글',
    message: '새 퀘스트가 시작되었습니다.',
    time: '2:05 PM',
    isRead: false,
  },
  {
    id: 4,
    type: '관리자',
    message: '관리자 공지가 등록되었습니다.',
    time: '어제',
    isRead: false,
  },
  {
    id: 5,
    type: '게시글',
    message: '댓글에 답글이 달렸습니다.',
    time: '2일 전',
    isRead: true,
  },
  {
    id: 6,
    type: '게시글',
    message: '새로운 게시글이 작성되었습니다.',
    time: '3일 전',
    isRead: true,
  },
  {
    id: 7,
    type: '게시글',
    message: '좋아요를 받았습니다.',
    time: '4일 전',
    isRead: true,
  },
  {
    id: 8,
    type: '게시글',
    message: '게시글이 수정되었습니다.',
    time: '5일 전',
    isRead: true,
  },
];

export default function Notification({ onClose }: NotificationProps) {
  const [activeTab, setActiveTab] = useState<'전체' | '게시글' | '관리자'>(
    '전체'
  );
  const notiListRef = useRef<HTMLDivElement>(null);

  // 탭 필터
  const filteredNotis =
    activeTab === '전체'
      ? dummyNotifications
      : dummyNotifications.filter((n) => n.type === activeTab);

  // 탭별 알림 수 - 읽지 않은 알림 수만 카운트
  const tabCounts = {
    전체: dummyNotifications.filter((n) => !n.isRead).length,
    게시글: dummyNotifications.filter((n) => n.type === '게시글' && !n.isRead)
      .length,
    관리자: dummyNotifications.filter((n) => n.type === '관리자' && !n.isRead)
      .length,
  };

  return (
    <div className="absolute w-[440px] border border-[var(--gray-100)] shadow-md right-12 bg-[var(--white)] z-40 rounded-[10px]">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-[14px] p-4">
        <h2 className="text-[18px] font-medium">알림</h2>
        <X
          onClick={onClose}
          size={20}
          className="cursor-pointer hover:text-[var(--red)]"
        ></X>
      </div>
      {/* 탭메뉴 */}
      <div
        className="flex justify-between items-center 
            border-b border-b-[var(--gray-100)] pb-[10px]"
      >
        <div className="flex gap-6 text-[16px] pl-4 font-medium">
          {(['전체', '게시글', '관리자'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  notiListRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative flex items-center gap-1.5 transition cursor-pointer
                  ${
                    isActive
                      ? 'text-[var(--primary-300)] after:content-[""] after:absolute after:left-0 after:-bottom-[12px] after:h-[3px] after:w-full after:bg-[var(--primary-300)]/80 rounded-full'
                      : 'text-[#222]'
                  }
                `}
              >
                {tab}
                <span
                  className={`
                    inline-block px-4 rounded-[12px] text-[13px]
                    ${
                      isActive
                        ? 'bg-[var(--primary-300)]/10 text-[var(--primary-300)]'
                        : 'bg-[#222222]/10 text-[#222]'
                    }
                  `}
                >
                  {tabCounts[tab]}
                </span>
              </button>
            );
          })}
        </div>
        <button className="text-[15px] pr-4 cursor-pointer">전체읽음</button>
      </div>
      {/* 리스트 */}
      <div
        ref={notiListRef}
        className="px-2.5 pt-2.5 h-[390px] overflow-y-auto"
      >
        {filteredNotis.map((noti) => (
          // 나중에 프로필 이미지도 넘기기
          <NotiListItem
            key={noti.id}
            message={noti.message}
            time={noti.time}
            isRead={noti.isRead}
          />
        ))}
      </div>
    </div>
  );
}
