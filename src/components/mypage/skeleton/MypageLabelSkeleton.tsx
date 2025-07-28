export default function MypageLabelSkeleton() {
  return (
    <div className="flex items-center gap-6 h-[150px] px-48 mb-5">
      <div className="relative -top-13 w-[140px] h-[140px] rounded-full overflow-hidden bg-gray-200 animate-pulse flex-shrink-0" />

      <div className="flex justify-between items-start flex-1 mt-[-40px]">
        <div className="flex flex-col gap-3 w-full">
          <div className="w-[100px] h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-[100px] h-6 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="w-[200px] h-[38px] bg-gray-200 rounded animate-pulse mt-1" />
      </div>
    </div>
  );
}
