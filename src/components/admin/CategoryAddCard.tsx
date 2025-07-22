import { CategoryAddCardProps } from '@/types/type';

export default function CategoryAddCard({
  type = 'category',
  onClick,
}: CategoryAddCardProps) {
  const label = type === 'marker' ? '마커' : '카테고리';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className="flex flex-col items-center justify-center w-[100px] h-[126px] border border-dashed border-[var(--primary-300)] bg-[#EBF2F2] hover:bg-[#d3e2e2] rounded-[8px] cursor-pointer transition-all duration-200"
    >
      <p className="text-sm text-[var(--primary-300)] font-medium text-center">
        {label}
        <br />
        추가
      </p>
    </div>
  );
}
