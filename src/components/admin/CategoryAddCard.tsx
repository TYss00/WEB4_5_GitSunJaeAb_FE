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
      className="flex flex-col items-center justify-center w-[100px] h-[126px] border border-dashed border-[#005C54] bg-[#EBF2F2] rounded-[8px] cursor-pointer hover:border-[#1E5F4F] transition"
    >
      <p className="text-sm text-[#005C54] font-medium text-center">
        카테고리
        <br />
        추가
      </p>
    </div>
  );
}
