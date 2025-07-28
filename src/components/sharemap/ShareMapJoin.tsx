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
import Input from '../ui/Input';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import GoogleMapWrapper from './GoogleMapWrapper';
import ShareLayerEdit from '../ui/layer/ShareLayerEdit';
import useShareStore from '@/store/useShareStore';
import useHashStore from '@/store/useHashStore';

export default function ShareMapJoin() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [isReportOpen, setIsReportOpen] = useState(false);
  const { isOpen, toggle, close } = useSidebar();
  const [input, setInput] = useState('');

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

  const hashtags = useHashStore((state) => state.hashtags);
  const addHashtag = useHashStore((state) => state.addHashtag);
  const removeHashtag = useHashStore((state) => state.removeHashtag);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!input.trim()) return;
      if (hashtags.includes(input)) return; // 중복 방지
      addHashtag(input.trim());
      setInput('');
    }
  };

  const enterRoom = useShareStore((state) => state.liveblocks.enterRoom);
  const leaveRoom = useShareStore((state) => state.liveblocks.leaveRoom);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!id) return;

    const roomId = `sharemap-room-${id}`;
    enterRoom(roomId);

    return () => {
      leaveRoom();
    };
  }, [id, enterRoom, leaveRoom]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 지도 영역 */}
      <GoogleMapWrapper />

      {/* 지도 위 UI 요소들 */}
      <div className="absolute top-2 left-[140px] flex items-center gap-3 px-4 py-2 z-20">
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
              <option key={layer.id} value={layer.id}>
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
            <h1 className="font-semibold text-xl">공유지도 수정하기</h1>
          </div>

          {/* 위치, 날짜, 좋아요 등 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-[12px] text-[13px] text-[var(--gray-200)]">
              <div className="flex items-center gap-[4px]">
                <MapPin size={16} />
                <span>Seoul</span>
              </div>
              <div className="flex items-center gap-[4px]">
                <Calendar size={16} />
                <span>2025.07.14</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[15px] text-[var(--black)]">
              <div className="flex items-center gap-1">
                <Heart size={18} />
                <span>4</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={18} />
                <span>22</span>
              </div>
              <button onClick={() => setIsReportOpen(true)}>
                <Siren size={18} />
              </button>
            </div>
          </div>

          {/* 제목, 설명, 태그 등 */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              서울 대학로 맛집 추천좀
            </h2>
            <p className="text-[16px] text-black mb-2">
              나 송지은인데 디자인 그만하고 대학로 갈거니까 맛집 알아와라
            </p>
            {/* 태그 디자인 수정 */}
            <div className="flex gap-[5px] text-sm text-[#005C54] mb-2">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="relative pr-3 after:content-['×'] after:absolute after:right-0 after:top-0 after:cursor-pointer after:text-[12px] after:text-[#888] hover:after:text-red-500"
                  onClick={() => removeHashtag(tag)}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex gap-[5px] items-center mb-5">
              <div className="rounded-full bg-amber-950 size-[25px]"></div>
              <span className="text-sm">작성자 닉네임</span>
            </div>
          </div>

          {/* 레이어 목록 */}
          <div className="border-t border-[var(--gray-50)] pt-[20px]">
            <h3 className="text-xl text-black mb-[15px]">
              레이어 및 마커 관리
            </h3>

            <div className="flex gap-2 mb-3">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="해시태그 추가"
                className="h-[44px] border-[#E4E4E4] rounded-md"
              />
              <Button
                buttonStyle="smGreen"
                className="text-[10px]"
                onClick={handleResetMarkers}
              >
                마커 전체 삭제
              </Button>
              <Button
                buttonStyle="smGreen"
                className="w-[76px] h-[44px] text-3xl font-medium"
                onClick={addLayer}
              >
                <Plus size={30} />
              </Button>
            </div>

            {/* 레이어 드롭다운 */}
            <div className="relative mb-3">
              <select
                className="w-full h-[44px] text-sm border border-[#E4E4E4] rounded px-3 appearance-none"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  레이어 선택
                </option>
                <option>게임</option>
                <option>여행</option>
                <option>맛집</option>
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
              />
            </div>

            {/* 레이어 편집 컴포넌트 */}
            <div className="space-y-3">
              {layers.map((layer) => (
                <ShareLayerEdit
                  key={layer.id}
                  title={layer.name}
                  layer={layer}
                  mapRef={mapRef}
                />
              ))}
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-end mt-4 gap-5">
              <Link href="/dashbord/sharemap/detail/1/preview">
                <Button
                  buttonStyle="white"
                  className="text-[18px] w-[80px] h-[40px] text-[var(--black)] font-semibold"
                >
                  취소
                </Button>
              </Link>
              <Link href="/dashbord/sharemap/detail/1">
                <Button
                  buttonStyle="smGreen"
                  className="text-[18px] w-[80px] h-[40px]"
                >
                  완료
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
