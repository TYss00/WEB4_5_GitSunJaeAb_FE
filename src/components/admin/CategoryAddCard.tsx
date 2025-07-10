type CategoryAddCardProps = {
  onClick?: () => void;
};

export default function CategoryAddCard({ onClick }: CategoryAddCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className="flex flex-col items-center justify-center w-[100px] h-[126px] border border-dashed border-[var(--primary-300)] bg-[#EBF2F2] rounded-[8px] cursor-pointer transition"
    >
      <p className="text-sm text-[var(--primary-300)] font-medium text-center">
        카테고리
        <br />
        추가
      </p>
    </div>
  );
}
