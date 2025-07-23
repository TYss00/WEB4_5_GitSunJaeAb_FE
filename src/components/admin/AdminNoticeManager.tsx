'use client';

import { useState } from 'react';
import AdminNoticeModal from './AdminNoticeModal';
import Button from '@/components/ui/Button';

export default function AdminNoticeManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<null | {
    id: number;
    type: '시스템' | '이벤트';
    title: string;
    content: string;
  }>(null);

  const [selectedTab, setSelectedTab] = useState<'전체' | '시스템' | '이벤트'>(
    '전체'
  );

  const handleOpenModal = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditModal = (notice: typeof editData) => {
    setEditData(notice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditData(null);
    setIsModalOpen(false);
  };

  const dummyNotices = [
    {
      id: 1,
      type: '시스템',
      title: '점검 안내',
      description: '2025년 7월 30일 00시 ~ 06시까지 점검 예정',
      date: '2025.07.23',
    },
    {
      id: 2,
      type: '이벤트',
      title: '여름 이벤트 안내',
      description: '8월 1일부터 시작됩니다.',
      date: '2025.07.15',
    },
  ];

  const filteredNotices =
    selectedTab === '전체'
      ? dummyNotices
      : dummyNotices.filter((n) => n.type === selectedTab);

  return (
    <section className="w-[900px] space-y-6">
      <div className="border border-[var(--gray-100)] rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-[var(--primary-300)]">
            관리자 공지 목록
          </h2>
          <Button buttonStyle="green" onClick={handleOpenModal}>
            공지 작성
          </Button>
        </div>

        <div className="flex gap-4 pb-2 mb-2">
          {['전체', '시스템', '이벤트'].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setSelectedTab(tab as '전체' | '시스템' | '이벤트')
              }
              className={`text-sm font-medium pb-1 ${
                selectedTab === tab
                  ? 'text-[var(--primary-300)] border-b-2 border-[var(--primary-300)]'
                  : 'text-[var(--gray-300)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredNotices.map((n, index) => (
          <div
            key={n.id}
            className="py-3 px-4 border rounded bg-[var(--gray-40)] flex justify-between items-start"
          >
            <div className="flex gap-4 items-center">
              <span className="text-base font-bold text-[var(--gray-400)] w-5 flex justify-center">
                {index + 1}
              </span>
              <div>
                <p className="text-sm text-[var(--gray-500)] font-semibold">
                  [{n.type}] {n.title}
                </p>
                <p className="text-base text-[var(--gray-400)] mt-1">
                  {n.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-1">
              <span className="text-sm text-[var(--gray-300)] whitespace-nowrap">
                등록일 : {n.date}
              </span>
              <div className="flex gap-2">
                <Button
                  buttonStyle="green"
                  className="text-sm"
                  onClick={() =>
                    handleEditModal({
                      id: n.id,
                      type: n.type as '시스템' | '이벤트',
                      title: n.title,
                      content: n.description,
                    })
                  }
                >
                  수정
                </Button>
                <Button
                  buttonStyle="withIcon"
                  className="text-[var(--red)] text-sm"
                >
                  삭제
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <AdminNoticeModal
          initialData={editData ?? undefined}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
