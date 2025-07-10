export default function MypagePost() {
  return (
    // 공용컴포넌트 만들어지면 채워야할곳
    <div className="grid grid-cols-4 gap-6">
      {Array(8)
        .fill(null)
        .map((_, idx) => (
          <div
            key={idx}
            className="rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <div className="relative w-full h-[150px] bg-gray-200">
              <span className="absolute top-2 right-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                공개
              </span>
            </div>
            <div className="p-4">
              <p className="text-base font-semibold text-[#222222] mb-1">
                서울 야경 따라
              </p>
              <p className="text-sm text-[#9F9F9F]">2025.07.07</p>
            </div>
          </div>
        ))}
    </div>
  );
}
