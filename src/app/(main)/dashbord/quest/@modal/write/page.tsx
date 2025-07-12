'use client';
import QuestWrite from '@/components/common/modal/QuestWrite';

export default function page() {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="rounded-xl p-6 w-[576px] mb-10">
        <QuestWrite />
      </div>
    </div>
  );
}
