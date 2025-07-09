export default function CommentItem() {
  return (
    <li className="pb-4">
      <div className="flex items-center gap-2">
        {/* 프로필이미지 */}
        <div className="size-[34px] bg-gray-500 rounded-full"></div>
        {/* 작성자 + 작성일 */}
        <div>
          <h4 className="text-[15px] font-medium">짱아</h4>
          <p className="text-xs text-[var(--gray-200)]">2025.07.06</p>
        </div>
      </div>
      <p className="text-sm px-1.5">이런거 좋네</p>
    </li>
  );
}
