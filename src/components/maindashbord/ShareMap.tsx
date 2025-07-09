'use client';

export default function ShareMap() {
  return (
    <section className="h-[610px] bg-[#F6F6F6] px-43 py-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#005C54]">
          서울시와 함께 하는 야경지도
        </h3>
        <span className="text-sm text-blue-500">24명 참여중</span>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 h-[200px] w-full md:w-1/3 p-4 rounded-md shadow-sm"
            >
              <p className="text-sm font-medium text-[#005C54] mb-2">User</p>
              <div className="bg-gray-300 h-[130px] mb-2 rounded"></div>
              <span className="text-xs text-green-600">5명 참여중</span>
            </div>
          ))}
      </div>
    </section>
  );
}
