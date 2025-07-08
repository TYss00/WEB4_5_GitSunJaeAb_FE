type CategoryAddCardProps = {
  onClick?: () => void;
};

export default function CategoryAddCard({ onClick }: CategoryAddCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className="flex flex-col items-center justify-center w-[100px] h-[126px] border border-dashed border-gray-300 bg-[#F5F8F6] rounded-md cursor-pointer hover:border-[#1E5F4F] transition"
    >
      <p className="text-sm text-[#1E5F4F] font-medium text-center">
        카테고리
        <br />
        추가
      </p>
    </div>
  );
}
