'use client';

export default function EventBox() {
  return (
    <section className="relative w-full flex justify-center mt-[-50px] z-10">
      <div className="bg-[#EBF2F2] rounded-[100px] shadow-lg px-10 py-8 w-[90%] max-w-[1000px]">
        <h2 className="text-[30px] text-[#005C54] font-semibold text-center">
          Event
        </h2>
        <div className="mx-auto mt-[19px] mb-[31px] w-[136px] h-[2px] bg-[#005C54] rounded-full" />
        <div className="flex gap-[18px] justify-center">
          <div className="w-[230px] h-[308px] bg-gray-100 rounded-[10px] shadow-sm"></div>
          <div className="w-[230px] h-[308px] bg-gray-100 rounded-[10px] shadow-sm"></div>
          <div className="w-[230px] h-[308px] bg-gray-100 rounded-[10px] shadow-sm"></div>
        </div>
      </div>
    </section>
  );
}
