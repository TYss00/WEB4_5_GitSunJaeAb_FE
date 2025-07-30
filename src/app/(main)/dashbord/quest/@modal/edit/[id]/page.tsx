'use client'

import QuestEdit from '@/components/quest/QuestEdit'

export default function page() {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="rounded-xl p-6 w-[576px] mb-10">
        <QuestEdit />
      </div>
    </div>
  )
}
