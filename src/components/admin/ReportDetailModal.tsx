import { XCircle, MapPinOff } from 'lucide-react';
import axiosInstance from '@/libs/axios';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import ReportDetailSkeleton from './ReportDetailSkeleton';
import { ReportModal } from '@/types/admin';

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
    lat?: number;
    lng?: number;
    markerId?: number;
  } | null>(null);

  const mapRef = useRef<HTMLDivElement | null>(null);

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
        const res = await axiosInstance.get(`/reports/${reportId}`);
        const detail = res.data.reportDetailDTO;

        if (contentType === '퀘스트' && detail.quest) {
          setData({
            title: detail.quest.title,
            description: detail.quest.description,
            imageUrl: detail.quest.questImage,
          });
        } else if (contentType === '지도' && detail.roadmap) {
          setData({
            title: detail.roadmap.title,
            description: detail.roadmap.description,
          });
        } else if (contentType === '마커' && detail.marker) {
          setData({
            title: detail.marker.name,
            description: detail.marker.description,
            lat: detail.marker.lat,
            lng: detail.marker.lng,
            markerId: detail.marker.id,
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
  }, [isOpen, reportId, contentType]);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !window.google ||
      !mapRef.current ||
      loading ||
      !isOpen
    )
      return;

    const center = {
      lat: data?.lat ?? 37.5665,
      lng: data?.lng ?? 126.978,
    };

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 15,
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
    });

    if (data?.lat && data?.lng && window.google.maps.marker) {
      const { AdvancedMarkerElement } = window.google.maps.marker;

      new AdvancedMarkerElement({
        map,
        position: center,
      });
    }
  }, [data, loading, isOpen]);

  const handleDeleteMarker = async () => {
    if (!data?.markerId) return;

    const confirmDelete = confirm('정말로 이 마커를 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/markers/${data.markerId}`);
      alert('마커가 삭제되었습니다.');
      onClose(); // 모달 닫기
    } catch (err) {
      console.error('마커 삭제 실패:', err);
      alert('마커 삭제에 실패했습니다.');
    }
  };

  if (!isOpen || reportId === null || contentType === null) return null;

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&loading=async&libraries=marker`}
        strategy="afterInteractive"
      />

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
            <ReportDetailSkeleton contentType={contentType} />
          ) : data === null ? (
            <div className="text-center text-sm text-gray-500">정보 없음</div>
          ) : contentType === '퀘스트' ? (
            <>
              <div className="text-base font-medium mb-1">제목</div>
              <div className="bg-gray-100 h-[36px] rounded px-3 flex items-center text-sm text-gray-700">
                {data.title}
              </div>

              <div className="text-base font-medium mt-4 mb-1">내용</div>
              <div className="bg-gray-100 h-[80px] rounded px-3 py-2 text-sm text-gray-700">
                {data.description || '내용이 없습니다'}
              </div>

              <div className="text-base font-medium mt-4 mb-1">
                퀘스트 이미지
              </div>
              <div className="bg-gray-100 h-[400px] rounded flex items-center justify-center text-sm text-gray-500 overflow-hidden">
                {data.imageUrl ? (
                  <Image
                    src={data.imageUrl}
                    alt="퀘스트 이미지"
                    width={700}
                    height={100}
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src="/quest.jpg"
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
              <div className="text-base font-medium mb-1">제목</div>

              <div className="bg-gray-100 h-[36px] rounded px-3 flex items-center text-sm text-gray-700">
                {data.title}
              </div>

              <div className="text-base font-medium mt-4 mb-1">내용</div>
              <div className="bg-gray-100 h-[80px] rounded px-3 py-2 text-sm text-gray-700">
                {data.description || '내용이 없습니다'}
              </div>

              <div className="flex justify-between items-center mt-4 mb-1">
                <div className="text-base font-medium">지도</div>

                {contentType === '마커' && data?.markerId && (
                  <button
                    onClick={handleDeleteMarker}
                    title="마커 제거"
                    className="group flex items-center gap-1 text-am text-[var(--red)] hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <span className="group-hover:underline">마커제거</span>
                    <MapPinOff
                      size={18}
                      className="transition-transform group-hover:scale-110 group-hover:text-red-600"
                    />
                  </button>
                )}
              </div>

              <div className="bg-gray-100 h-[400px] rounded overflow-hidden">
                <div ref={mapRef} className="w-full h-full" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
