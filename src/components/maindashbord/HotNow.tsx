'use client';

export default function HotNow() {
  return (
    <section className="bg-[#EBF2F2] h-[406px] flex items-center justify-center px-4">
      <div className="text-center">
        <h3 className="text-3xl font-semibold text-[#005C54] mb-8">
          What’s Hot Now
        </h3>

        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-7">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-300 w-[200px] h-[200px] rounded-xl flex items-center justify-center p-2"
                >
                  <p className="text-white text-sm text-center">
                    바다
                    <br />
                    22개
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
