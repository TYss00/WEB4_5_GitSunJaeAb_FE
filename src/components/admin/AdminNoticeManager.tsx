'use client';

import { useEffect, useState } from 'react';
import AdminNoticeModal from './AdminNoticeModal';
import Button from '@/components/ui/Button';
import { AdminNoticePayload, Notice } from '@/types/admin';
import axiosInstance from '@/libs/axios';

export default function AdminNoticeManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<null | {
    id: number;
    title: string;
    content: string;
  }>(null);

  const [notices, setNotices] = useState<Notice[]>([]);

  const handleOpenModal = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditModal = (notice: {
    id: number;
    title: string;
    content: string;
  }) => {
    setEditData(notice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditData(null);
    setIsModalOpen(false);
  };

  const fetchNotices = async () => {
    try {
      const res = await axiosInstance.get('/admin/announcements');
      setNotices(res.data.announcements);
    } catch (err) {
      console.error('공지사항 불러오기 실패:', err);
    }
  };

  const handleCreateNotice = async (payload: {
    title: string;
    content: string;
    announcementType: string;
  }) => {
    try {
      await axiosInstance.post('/admin/announcements', payload);
      alert('공지 등록 완료');
      fetchNotices();
    } catch (err) {
      console.error('공지 등록 실패:', err);
      alert('공지 등록 중 오류 발생');
    }
  };

  const handleUpdateNotice = async (
    payload: AdminNoticePayload,
    id?: number
  ) => {
    try {
      await axiosInstance.put(`/admin/announcements/${id}`, payload);
      alert('공지 수정 완료');
      fetchNotices();
    } catch (err) {
      console.error('공지 수정 실패:', err);
      alert('공지 수정 중 오류 발생');
    }
  };

  const handleDeleteNotice = async (id: number, title: string) => {
    if (confirm(`공지 "${title}"를 삭제하시겠습니까?`)) {
      try {
        await axiosInstance.delete(`/admin/announcements/${id}`);
        alert('공지 삭제 완료');
        fetchNotices();
      } catch (err) {
        console.error('공지 삭제 실패:', err);
        alert('공지 삭제 중 오류 발생');
      }
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

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

        {notices.map((n) => (
          <div
            key={n.id}
            className="py-3 px-4 border rounded bg-[var(--gray-40)] flex justify-between items-start"
          >
            <div className="flex gap-4 items-center">
              <span className="text-base font-bold text-[var(--gray-400)] w-10 flex justify-center">
                {n.id}
              </span>
              <div>
                <p className="text-base text-[var(--gray-500)] font-bold">
                  {n.title}
                </p>
                <p className="text-base text-[var(--gray-400)] mt-1">
                  {n.content}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-1">
              <span className="text-sm text-[var(--gray-300)] whitespace-nowrap">
                등록일 : {new Date(n.createdAt).toLocaleDateString('ko-KR')}
              </span>
              <div className="flex gap-2">
                <Button
                  buttonStyle="green"
                  className="text-sm"
                  onClick={() =>
                    handleEditModal({
                      id: n.id,
                      title: n.title,
                      content: n.content,
                    })
                  }
                >
                  수정
                </Button>
                <Button
                  buttonStyle="withIcon"
                  className="text-[var(--red)] text-sm"
                  onClick={() => handleDeleteNotice(n.id, n.title)}
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
          onSubmit={editData ? handleUpdateNotice : handleCreateNotice}
        />
      )}
    </section>
  );
}
