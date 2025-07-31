'use client';

import { X } from 'lucide-react';
import NotiListItem from './NotiListItem';
import { useRef, useState } from 'react';
import { useMarkAsRead } from '@/libs/notification';
import { useRouter } from 'next/navigation';
import { AppNotification } from '@/types/notiType';

type NotificationProps = {
  notifications: AppNotification[];
  onClose: () => void;
};

export default function Notification({
  notifications,
  onClose,
}: NotificationProps) {
  const [activeTab, setActiveTab] = useState<'전체' | '게시글' | '공지'>(
    '전체'
  );
  const notiListRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { mutate } = useMarkAsRead();

  // 탭 필터
  const filteredNotis =
    activeTab === '전체'
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  // 탭별 읽지 않은 알림 수
  const tabCounts = {
    전체: notifications.filter((n) => !n.isRead).length,
    게시글: notifications.filter((n) => n.type === '게시글' && !n.isRead)
      .length,
    공지: notifications.filter((n) => n.type === '공지' && !n.isRead).length,
  };

  // 전체읽음 처리
  const handleAllRead = () => {
    const unreadNotis = filteredNotis.filter((n) => !n.isRead);
    unreadNotis.forEach((noti) => mutate(noti.id));
  };

  // 알림 클릭 시 라우팅 처리
  const handleNotificationClick = (noti: AppNotification) => {
    if (!noti.isRead) {
      mutate(noti.id);
    }

    // 공유지도인지 개인 로드맵인지
    const isSharedMap = noti.relatedRoadmap?.mapType === 'SHARED';
    const roadmapRoute = isSharedMap
      ? '/dashbord/sharemap/detail'
      : '/dashbord/roadmap/detail';

    switch (noti.notificationType) {
      case 'COMMENT':
        if (noti.relatedQuestId) {
          router.push(`/dashbord/quest/detail/${noti.relatedQuestId}`);
        } else if (noti.relatedRoadmap?.id) {
          router.push(`${roadmapRoute}/${noti.relatedRoadmap.id}`);
        }
        console.log(`${roadmapRoute}/${noti.relatedRoadmap!.id}`);
        break;
      case 'ZZIM':
      case 'FORK':
      case 'BOOKMARK':
        if (noti.relatedRoadmap?.id) {
          router.push(`${roadmapRoute}/${noti.relatedRoadmap.id}`);
        }
        break;
      case 'QUEST':
      case 'QUEST_DEADLINE':
        router.push(`/dashbord/quest/detail/${noti.relatedQuestId}`);
        break;
      case 'ANNOUNCEMENT':
      case 'ETC':
        return;
    }
    // 클릭 시 알림창 닫기
    onClose();
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
          {(['전체', '게시글', '공지'] as const).map((tab) => {
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
                      : 'text-[var(--black)]'
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
                        : 'bg-[var(--black)]/10 text-[var(--black)]'
                    }
                  `}
                >
                  {tabCounts[tab]}
                </span>
              </button>
            );
          })}
        </div>
        <button
          onClick={handleAllRead}
          className="text-[15px] pr-4 cursor-pointer"
        >
          전체읽음
        </button>
      </div>
      {/* 리스트 */}
      <div
        ref={notiListRef}
        className="px-2.5 pt-2.5 h-[390px] overflow-y-auto"
      >
        {filteredNotis.length === 0 ? (
          <p className="text-left text-[var(--gray-200)] p-2">
            알림이 없습니다
          </p>
        ) : (
          [...filteredNotis]
            .sort((a, b) => Number(a.isRead) - Number(b.isRead))
            .map((noti) => (
              <NotiListItem
                key={noti.id}
                noti={noti}
                onClick={handleNotificationClick}
              />
            ))
        )}
      </div>
    </div>
  );
}
