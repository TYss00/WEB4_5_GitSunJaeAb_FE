'use client';

import { useEffect, useState } from 'react';
import AdminNoticeModal from './AdminNoticeModal';
import Button from '@/components/ui/Button';
import { AdminNoticePayload, Notice } from '@/types/admin';
import axiosInstance from '@/libs/axios';
import { Megaphone } from 'lucide-react';
import LoadingSpener from '../common/LoadingSpener';

export default function AdminNoticeManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<null | {
    id: number;
    title: string;
    content: string;
  }>(null);

  const TYPE_LABELS: Record<string, string> = {
    SYSTEM: '시스템',
    EVENT: '이벤트',
    UPDATE: '업데이트',
    ETC: '안내사항',
  };

  const TYPE_TABS = ['전체', 'SYSTEM', 'EVENT', 'UPDATE', 'ETC'];

  const [selectedTypeTab, setSelectedTypeTab] = useState('전체');

  const [notices, setNotices] = useState<Notice[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const filteredNotices =
    selectedTypeTab === '전체'
      ? notices
      : notices.filter((n) => n.announcementType === selectedTypeTab);

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
      setIsLoading(true);
      const res = await axiosInstance.get('/admin/announcements');
      setNotices(res.data.announcements);
    } catch (err) {
      console.error('공지사항 불러오기 실패:', err);
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <LoadingSpener />
      </div>
    );
  }
  return (
    <section className="w-[900px] h-[420px] space-y-6">
      <div className="border border-[var(--gray-100)] rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between mb-[20px]">
          <div className="flex items-center gap-2 text-[var(--primary-300)] font-bold text-xl">
            <Megaphone size={20} className="mr-1" />
            관리자공지 관리
          </div>
          <Button buttonStyle="green" onClick={handleOpenModal}>
            공지 작성
          </Button>
        </div>

        <div className="flex gap-4 mb-4 text-sm font-semibold text-[var(--gray-300)]">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTypeTab(tab)}
              className={`px-3 py-1 rounded-full border transition-all
        ${
          selectedTypeTab === tab
            ? 'bg-[var(--primary-300)] text-white border-[var(--primary-300)]'
            : 'bg-white text-[var(--gray-400)] border-[var(--gray-100)] hover:bg-[var(--gray-50)]'
        }`}
            >
              {tab === '전체' ? '전체' : TYPE_LABELS[tab]}
            </button>
          ))}
        </div>

        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {filteredNotices.map((n) => (
            <div
              key={n.id}
              className="py-3 px-4 border rounded bg-[var(--gray-40)] flex justify-between items-start"
            >
              <div className="flex gap-4 items-center">
                <span className="text-base font-bold text-[var(--gray-400)] w-10 flex justify-center">
                  {n.id}
                </span>

                <div>
                  <p className="text-base text-[var(--gray-500)] font-bold flex items-center gap-2">
                    {n.title}
                    <span className="text-[12px] px-2 py-[2px] rounded-full bg-[var(--primary-50)] text-[var(--primary-300)] font-semibold">
                      {TYPE_LABELS[n.announcementType]}
                    </span>
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
