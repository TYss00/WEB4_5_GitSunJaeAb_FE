'use client';

import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { useState } from 'react';

export default function Test() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    // 실제 삭제 로직
    alert('삭제 완료!');
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-screen mx-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        삭제
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
        confirmType="post" // 'comment' | 'account' 등 가능
      />
    </>
  );
}
