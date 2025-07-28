import { useMarkAsRead } from '@/libs/notification';
import Image from 'next/image';
import notiImg from '../../../public/assets/notiImg.svg';

type NotiListItemProps = {
  id: number;
  message: string;
  time: string;
  isRead: boolean;
  type: '게시글' | '공지';
};

export default function NotiListItem({
  id,
  message,
  time,
  isRead,
  type,
}: NotiListItemProps) {
  const { mutate, isPending } = useMarkAsRead();

  const handleClick = () => {
    if (!isRead && !isPending) {
      mutate(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="px-4 py-2 bg-[var(--gray-40)] rounded-[8px] 
    mb-[10px] hover:bg-[var(--primary-50)] hover:text-[var(--primary-300)]"
    >
      <div className="flex items-center gap-4">
        {/* 프로필 이미지 / 공지 이미지 */}
        <div className="relative">
          {type === '공지' ? (
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
            // 프로필 이미지로 변경예정
            <div className="size-[40px] bg-gray-500 rounded-full" />
          )}
          {!isRead && (
            <div className="absolute top-[1px] right-[3px] size-2.5 bg-[var(--red)] rounded-full border border-[var(--white)]" />
          )}
        </div>

        {/* 알림 내용 + 날짜 */}
        <div>
          <p className="font-medium pb-1">{message}</p>
          <p className="text-sm text-[var(--gray-200)]">{time}</p>
        </div>
      </div>
    </div>
  );
}
