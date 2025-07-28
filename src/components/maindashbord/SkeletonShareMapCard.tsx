export default function SkeletonShareMapCard() {
  return (
    <div className="w-[252px] h-[300px] bg-white rounded-xl shadow-md p-4 animate-pulse flex flex-col justify-between">
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-[160px] bg-gray-200 rounded-md" />
    </div>
  );
}
