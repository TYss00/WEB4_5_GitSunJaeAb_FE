export default function SkeletonQuestCard() {
  return (
    <div className="bg-[var(--primary-50)] rounded-lg p-5 w-full h-full flex items-center gap-6 animate-pulse">
      <div className="flex-1 ml-3 space-y-2">
        <div className="h-4 w-1/3 bg-[var(--gray-100)] rounded" />
        <div className="h-6 w-2/3 bg-[var(--gray-100)] rounded" />
        <div className="h-7 w-[82px] bg-[var(--gray-100)] rounded" />
      </div>
      <div className="w-[260px] h-[120px] bg-[var(--gray-100)] rounded-lg" />
    </div>
  );
}
