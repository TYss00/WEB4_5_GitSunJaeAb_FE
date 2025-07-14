type NotiListItemProps = {
  message: string;
  time: string;
  isRead: boolean;
};

export default function NotiListItem({
  message,
  time,
  isRead,
}: NotiListItemProps) {
  return (
    <div
      className="px-4 py-2 bg-[var(--gray-40)] rounded-[8px] 
    mb-[10px] hover:bg-[var(--primary-50)] hover:text-[var(--primary-300)]"
    >
      <div className="flex items-center gap-4">
        {/* 프로필 이미지 / 공지 이미지 */}
        <div className="relative">
          <div className="size-[50px] bg-gray-500 rounded-full"></div>
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
