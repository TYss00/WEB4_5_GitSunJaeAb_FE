'use client';

import { useRouter } from 'next/navigation';
import { PencilLine } from 'lucide-react';

export default function WriteButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/sharedmap/write')}
      className="fixed bottom-[48px] right-[48px] w-[56px] h-[56px] rounded-full border-[1px] border-[#005C54] bg-[#FFFFFF] text-[#005C54] shadow-lg flex items-center justify-center hover:bg-[#005C54] hover:text-[#FFFFFF] transition-colors z-50"
      aria-label="공유지도 작성"
    >
      <PencilLine size={30} />
    </button>
  );
}
