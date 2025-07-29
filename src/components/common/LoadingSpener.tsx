'use client';

export default function LoadingSpener() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-5xl font-[vitro-core] text-[var(--primary-300)] mb-6">
        MAPICK
      </h1>

      <div className="w-10 h-10 border-4 border-[var(--primary-300)] border-t-transparent rounded-full animate-spin" />

      <p className="mt-4 text-sm text-gray-500">잠시만 기다려 주세요...</p>
    </div>
  );
}
