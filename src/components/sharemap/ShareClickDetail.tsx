'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Heart,
  Siren,
  Eye,
  Download,
  ChevronDown,
  ChevronsRight,
  ChevronsLeft,
  MapPin,
  Calendar,
  ChevronLeft,
} from 'lucide-react';
import Button from '../ui/Button';
import ReportModal from '../common/modal/ReportModal';
import useSidebar from '@/utils/useSidebar';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import ShareLayerDetail from '../ui/layer/ShareLayerDetail';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import axiosInstance from '@/libs/axios';
import { RoadmapDetailResponse } from '@/types/share';
import Image from 'next/image';

export default function ShareClickDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState<RoadmapDetailResponse | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const { isOpen, toggle, close } = useSidebar();

  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedLayerId, setSelectedLayerId] = useState<'all' | number>('all');
  const isParticipationClosed =
    roadmap && new Date(roadmap.participationEnd) < new Date();

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await axiosInstance.get(`/roadmaps/${id}`);
        setRoadmap(res.data.roadmap);
      } catch (error) {
        console.error('지도 상세 조회 실패:', error);
      }
    };

    if (id) fetchRoadmap();
  }, [id]);

  if (!roadmap) return <div className="text-center py-20">로딩 중...</div>;

  function getShortAddress(fullAddress: string): string {
    const parts = fullAddress.split(' ');
    if (parts.length >= 4) {
      return `${parts[1]} ${parts[2]} ${parts[3]}`; // 도 시 구
    }
    return fullAddress;
  }

  const filteredMarkers =
    selectedLayerId === 'all'
      ? roadmap.layers.flatMap((layer) => layer.markers)
      : roadmap.layers.find((l) => l.layer.id === selectedLayerId)?.markers ??
        [];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 지도 영역 */}
      <div className="absolute inset-0 bg-gray-200 z-0">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{
            lat: Number(roadmap.regionLatitude),
            lng: Number(roadmap.regionLongitude),
          }}
          zoom={14}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {filteredMarkers.map((marker) => (
            <MarkerF
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}
        </GoogleMap>

        {/* 왼쪽 상단 버튼 */}
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
              {roadmap?.layers?.map((l) => (
                <option key={l.layer.id} value={l.layer.id}>
                  {l.layer.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black"
            />
          </div>
        </div>
      </div>

      {/* 닫힌 상태에서 보이는 열기 버튼 */}
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
          {/* 닫기 버튼 */}
          <div className="flex items-center mb-5 gap-[10px]">
            <ChevronsRight
              size={35}
              onClick={close}
              className="cursor-pointer"
            />
            <h1 className="font-semibold text-xl">공유지도 게시글 상세보기</h1>
          </div>

          {/* 위치/날짜/좋아요/조회수/신고 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-[12px] text-[13px] text-[var(--gray-200)]">
              <div className="flex items-center gap-[4px]">
                <MapPin size={16} />
                <span>{getShortAddress(roadmap.address)}</span>
              </div>
              <div className="flex items-center gap-[4px]">
                <Calendar size={16} />
                <span>
                  {roadmap.participationEnd?.slice(0, 10).replace(/-/g, '.')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[15px] text-[var(--black)]">
              <div className="flex items-center gap-1">
                <Heart size={18} />
                <span>{roadmap.likeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={18} />
                <span>{roadmap.viewCount}</span>
              </div>
              <button>
                <Siren
                  size={18}
                  className="cursor-pointer"
                  onClick={() => setIsReportOpen(true)}
                />
              </button>
            </div>
          </div>

          {/* 제목, 설명, 태그 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">{roadmap.title}</h2>
            <p className="text-[16px] text-black mb-2">{roadmap.description}</p>
            <div className="flex gap-2 text-sm text-[#005C54] mb-2">
              {roadmap.hashtags.map((tag) => (
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
          <div className="border-t border-[var(--gray-50)] space-y-[15px] mt-4">
            <div className="flex items-center justify-between mt-4 mb-4 mr-3">
              <h3 className="text-xl text-black">레이어 및 마커</h3>
              <Download size={20} className="cursor-pointer text-[#000]" />
            </div>

            {/* 여기서 layers 배열을 기반으로 동적 렌더링 */}
            {roadmap.layers.map((layer) => (
              <ShareLayerDetail
                key={layer.layer.id}
                name={layer.layer.name}
                markers={layer.markers.map((m) => ({
                  markerTempId: m.id,
                  name: m.name,
                  description: m.description,
                  address: m.address,
                  lat: m.lat,
                  lng: m.lng,
                  color: m.color,
                  customImageId: m.customImage?.id.toString() ?? '',
                  markerSeq: m.markerSeq,
                  layerTempId: m.layerId,
                }))}
              />
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-5">
            {/* 나가기 버튼 */}
            <Button
              buttonStyle="white"
              className="w-[114px] h-[40px] text-[18px] font-semibold cursor-pointer"
            >
              나가기
            </Button>

            {/* 참여하기 버튼 or 참여 마감 */}
            {isParticipationClosed ? (
              <Button
                buttonStyle="smGreen"
                className="w-[114px] h-[40px] text-[18px] font-semibold bg-gray-300 cursor-not-allowed"
                disabled
              >
                참여 마감
              </Button>
            ) : (
              <Link href={`/dashbord/sharemap/detail/${id}/preview/mapjoin`}>
                <Button
                  buttonStyle="smGreen"
                  className="w-[114px] h-[40px] text-[18px] font-semibold"
                >
                  참여하기
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 신고 모달 */}
      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </section>
  );
}
