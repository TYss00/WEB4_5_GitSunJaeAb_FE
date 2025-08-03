export default function QuestDetailRankingSkeleton() {
  return (
    <div className="relative w-full h-[180px]">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
        <div className="mx-auto w-24 h-24 bg-gray-300 rounded-full animate-pulse" />
        <div className="w-20 h-5 bg-gray-300 rounded mt-2 animate-pulse mx-auto" />
      </div>

      <div className="absolute bottom-0 left-[10%] text-center">
        <div className="mx-auto w-20 h-20 bg-gray-300 rounded-full animate-pulse" />
        <div className="w-16 h-5 bg-gray-300 rounded mt-2 animate-pulse mx-auto" />
      </div>

      <div className="absolute bottom-0 right-[10%] text-center">
        <div className="mx-auto w-20 h-20 bg-gray-300 rounded-full animate-pulse" />
        <div className="w-16 h-5 bg-gray-300 rounded mt-2 animate-pulse mx-auto" />
      </div>
    </div>
  );
}
