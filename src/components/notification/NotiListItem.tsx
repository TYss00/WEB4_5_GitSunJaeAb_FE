'use client';

import Image from 'next/image';
import notiImg from '../../../public/assets/notiImg.svg';
import defaultProfileImg from '../../../public/assets/defaultProfile_white.png';
import { AppNotification } from '@/types/notiType';

type NotiListItemProps = {
  noti: AppNotification;
  onClick: (noti: AppNotification) => void;
};

export default function NotiListItem({ noti, onClick }: NotiListItemProps) {
  return (
    <div
      onClick={() => onClick(noti)}
      className="px-4 py-2 bg-[var(--gray-40)] rounded-[8px] 
    mb-[10px] hover:bg-[var(--primary-50)] hover:text-[var(--primary-300)]"
    >
      <div className="flex items-center gap-4">
        {/* 프로필 이미지 / 공지 이미지 */}
        <div className="relative">
          {noti.type === '공지' ? (
            <div className="size-[50px] overflow-hidden rounded-full">
              <Image
                src={notiImg}
                alt="공지 아이콘"
                width={50}
                height={50}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="size-[50px] overflow-hidden rounded-full">
              {noti.senderProfileImage ? (
                <Image
                  src={noti.senderProfileImage}
                  alt="프로필 이미지"
                  width={50}
                  height={50}
                  className="object-cover"
                />
              ) : (
                <Image
                  src={defaultProfileImg}
                  alt="프로필 이미지"
                  width={50}
                  height={50}
                  className="object-cover"
                />
              )}
            </div>
          )}
          {!noti.isRead && (
            <div className="absolute top-[1px] right-[3px] size-2.5 bg-[var(--red)] rounded-full border border-[var(--white)]" />
          )}
        </div>

        {/* 알림 내용 + 날짜 */}
        <div>
          <p className="font-medium text-[15px] pb-1">{noti.message}</p>
          <p className="text-sm text-[var(--gray-200)]">
            <span className="text-[var(--gray-300)]">{noti.title}</span> ·{' '}
            {noti.time}
          </p>
        </div>
      </div>
    </div>
  );
}
