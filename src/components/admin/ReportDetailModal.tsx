'use client';

// 로딩만들어지면 로딩 바꿔서 수정할곳

import { useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import { ReportModal } from '@/types/admin';
import Image from 'next/image';

export default function ReportDetailModal({
  isOpen,
  onClose,
  reportId,
  contentType,
}: ReportModal) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    title: string;
    description?: string;
    imageUrl?: string;
  } | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || reportId === null || contentType === null) return;

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}reports/${reportId}`, {
          credentials: 'include',
        });
        const detail = await res.json();

        if (contentType === '퀘스트' && detail.report.quest) {
          setData({
            title: detail.report.quest.title,
            imageUrl: detail.report.quest.questImage,
          });
        } else if (contentType === '지도' && detail.report.roadmap) {
          setData({
            title: detail.report.roadmap.title,
            description: detail.report.roadmap.description,
          });
        } else {
          setData(null);
        }
      } catch (err) {
        console.error('신고 상세 정보 불러오기 실패:', err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [isOpen, reportId, contentType, API_BASE_URL]);

  if (!isOpen || reportId === null || contentType === null) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-[600px] rounded-[10px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XCircle size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">신고 상세 정보</h2>

        {loading ? (
          <div className="text-center text-sm text-gray-500">
            불러오는 중...
          </div>
        ) : data === null ? (
          <div className="text-center text-sm text-gray-500">정보 없음</div>
        ) : contentType === '퀘스트' ? (
          <>
            <div className="text-[15px] font-medium mb-1">제목</div>
            <div className="bg-gray-100 h-[36px] rounded px-3 flex items-center text-sm text-gray-700">
              {data.title}
            </div>

            <div className="text-[15px] font-medium mt-4 mb-1">
              퀘스트 이미지
            </div>
            <div className="bg-gray-200 h-[400px] rounded flex items-center justify-center text-sm text-gray-500 overflow-hidden">
              {data.imageUrl ? (
                <Image
                  // src에 원래는 data.imageUrl 이거들어가야됨 - 이미지가 예제라 안나와서 이걸로 대체
                  src={'/quest.jpg'}
                  alt="퀘스트 이미지"
                  width={700}
                  height={100}
                  className="object-contain"
                />
              ) : (
                <Image
                  src={'/quest.jpg'}
                  alt="퀘스트 이미지"
                  width={10}
                  height={10}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-[15px] font-medium mb-1">제목</div>
            <div className="bg-gray-100 h-[36px] rounded px-3 flex items-center text-sm text-gray-700">
              {data.title}
            </div>

            <div className="text-[15px] font-medium mt-4 mb-1">내용</div>
            <div className="bg-gray-100 h-[80px] rounded px-3 py-2 text-sm text-gray-700">
              {data.description || '내용이 없습니다'}
            </div>

            <div className="text-[15px] font-medium mt-4 mb-1">지도</div>
            <div className="bg-gray-200 h-[400px] rounded flex items-center justify-center text-sm text-gray-500">
              지도 미리보기 예정
            </div>
          </>
        )}
      </div>
    </div>
  );
}
