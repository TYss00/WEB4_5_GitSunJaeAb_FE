'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Heart,
  Siren,
  Eye,
  ChevronDown,
  ChevronsRight,
  ChevronsLeft,
  MapPin,
  Calendar,
  ChevronLeft,
  Plus,
} from 'lucide-react';
import Button from '../ui/Button';
import ReportModal from '../common/modal/ReportModal';
import useSidebar from '@/utils/useSidebar';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import GoogleMapWrapper from './GoogleMapWrapper';
import ShareLayerEdit from '../ui/layer/ShareLayerEdit';
import useShareStore from '@/store/useShareStore';
import { RoadmapDetailResponse } from '@/types/share';
import axiosInstance from '@/libs/axios';
import Image from 'next/image';

export default function ShareMapJoin() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [isReportOpen, setIsReportOpen] = useState(false);
  const { isOpen, toggle, close } = useSidebar();
  const [roadmap, setRoadmap] = useState<RoadmapDetailResponse | null>(null);

  const addLayer = useShareStore((state) => state.addLayer);
  const selectedLayerId = useShareStore((state) => state.selectedLayerId);
  const setSelectedLayerId = useShareStore((state) => state.setSelectedLayerId);
  const layers = useShareStore((state) => state.layers);

  const markers = useShareStore((state) => state.markers);
  const removeMarker = useShareStore((state) => state.removeMarker);
  const handleResetMarkers = () => {
    const confirmed = confirm('모든 마커를 초기화하시겠습니까?');
    if (!confirmed) return;

    const markerIds = Object.keys(markers);
    markerIds.forEach((id) => removeMarker(Number(id)));
  };

  const enterRoom = useShareStore((state) => state.liveblocks.enterRoom);
  const leaveRoom = useShareStore((state) => state.liveblocks.leaveRoom);
  const setRoadmapId = useShareStore((state) => state.setRoadmapId);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!id) return;

    setRoadmapId(Number(id));
    enterRoom(`sharemap-room-${id}`);

    const fetchRoadmap = async () => {
      try {
        const res = await axiosInstance.get(`/roadmaps/${id}`);
        setRoadmap(res.data.roadmap);
      } catch (error) {
        console.error('공유지도 상세 조회 실패:', error);
      }
    };

    fetchRoadmap();

    return () => {
      leaveRoom();
    };
  }, [id, enterRoom, leaveRoom, setRoadmapId]);

  if (!roadmap) return <div className="text-center py-20">로딩 중...</div>;

  function getShortAddress(fullAddress: string): string {
    const parts = fullAddress.split(' ');
    if (parts.length >= 4) {
      return `${parts[1]} ${parts[2]} ${parts[3]}`; // 도 시 구
    }
    return fullAddress;
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 지도 영역 */}
      <GoogleMapWrapper />

      {/* 지도 위 UI 요소들 */}
      <div className="absolute top-2 left-[160px] flex items-center gap-3 px-4 py-2 z-20">
        <Button
          buttonStyle="white"
          onClick={() => router.back()}
          icon={<ChevronLeft size={18} />}
          className="text-sm"
        >
          뒤로가기
        </Button>

        {/* 레이어 선택 */}
        <div className="relative w-[140px]">
          <select
            className="w-full h-[34px] text-sm bg-white border-none rounded pl-3 appearance-none"
            value={selectedLayerId ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedLayerId(value === 'all' ? 'all' : Number(value));
            }}
          >
            <option value="all">전체 레이어</option>
            {layers.map((layer) => (
              <option key={layer.layerTempId} value={layer.layerTempId}>
                {layer.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black"
          />
        </div>
      </div>

      {/* 사이드바 토글 */}
      {!isOpen && (
        <button
          onClick={toggle}
          className="absolute top-7 right-12 z-20 bg-[var(--white)] rounded-[10px] p-[10px]"
        >
          <div className="flex items-center space-x-[-16px]">
            <ChevronsLeft size={35} />
          </div>
        </button>
      )}

      {/* 사이드바 */}
      <div
        className={`absolute top-0 right-0 h-full w-[590px] bg-[var(--white)] z-10 px-6 py-8 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full px-5 py-4 overflow-y-auto scrollbar-none">
          <div className="flex items-center mb-5 gap-[10px]">
            <ChevronsRight
              size={35}
              onClick={close}
              className="cursor-pointer"
            />
            <h1 className="font-semibold text-xl">공유지도 참여하기</h1>
          </div>

          {/* 위치, 날짜, 좋아요 등 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-[12px] text-[13px] text-[var(--gray-200)]">
              <div className="flex items-center gap-[4px]">
                <MapPin size={16} />
                <span>{getShortAddress(roadmap?.address)}</span>
              </div>
              <div className="flex items-center gap-[4px]">
                <Calendar size={16} />
                <span>
                  {roadmap?.participationEnd?.slice(0, 10).replace(/-/g, '.')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[15px] text-[var(--black)]">
              <div className="flex items-center gap-1">
                <Heart size={18} />
                <span>{roadmap?.likeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={18} />
                <span>{roadmap?.viewCount}</span>
              </div>
              <button onClick={() => setIsReportOpen(true)}>
                <Siren size={18} />
              </button>
            </div>
          </div>

          {/* 제목, 설명, 태그 등 */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">{roadmap?.title}</h2>
            <p className="text-[16px] text-black mb-2">
              {roadmap?.description}
            </p>
            {/* 태그 디자인 수정 */}
            <div className="flex gap-[5px] text-sm text-[#005C54] mb-2">
              {roadmap?.hashtags?.map((tag) => (
                <span key={tag.id}>#{tag.name}</span>
              ))}
            </div>
            <div className="flex gap-[5px] items-center mb-5">
              <Image
                src={roadmap?.member.profileImage || '/assets/useProfile.png'}
                alt="작성자 프로필"
                width={25}
                height={25}
                className="rounded-full object-cover size-[25px]"
              />
              <span className="text-sm">{roadmap?.member?.nickname}</span>
            </div>
          </div>

          {/* 레이어 목록 */}
          <div className="border-t border-[var(--gray-50)] pt-[20px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl text-black">레이어 및 마커 관리</h3>

              <div className="flex gap-2">
                <Button
                  buttonStyle="smGreen"
                  className="text-[14px]"
                  onClick={handleResetMarkers}
                >
                  마커 전체 삭제
                </Button>
                <Button
                  buttonStyle="smGreen"
                  className="w-[140px] h-[44px] font-medium text-[14px]"
                  onClick={addLayer}
                >
                  <Plus size={30} className="pr-2" />새 레이어 추가
                </Button>
              </div>
            </div>

            {/* 레이어 편집 컴포넌트 */}
            <div className="space-y-3">
              {layers.map((layer) => (
                <ShareLayerEdit
                  key={layer.layerTempId}
                  title={layer.name}
                  layer={layer}
                  mapRef={mapRef}
                />
              ))}
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-end mt-4 gap-5">
              <Link href={`/dashbord/sharemap/detail/${id}`}>
                <Button
                  buttonStyle="smGreen"
                  className="text-[18px] w-[80px] h-[40px]"
                >
                  나가기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 신고 모달 */}
      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </section>
  );
}
