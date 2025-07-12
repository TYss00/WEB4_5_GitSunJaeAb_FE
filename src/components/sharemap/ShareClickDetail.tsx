'use client';

import { useState } from 'react';
import {
  Heart,
  Siren,
  Eye,
  Download,
  ChevronDown,
  PlayCircle,
  ChevronsRight,
  ChevronsLeft,
  Navigation,
  MapPin,
  Calendar,
  ChevronLeft,
} from 'lucide-react';
import Button from '../ui/Button';
import ReportModal from '../common/modal/ReportModal';
import useSidebar from '@/utils/useSidebar';
import Link from 'next/link';
import LayerDetail from '../ui/layer/LayerDetail';
import MarkerDetail from '../ui/layer/MarkerDetail';

export default function ShareClickDetail() {
  const [routeEnabled, setRouteEnabled] = useState(true);
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const { isOpen, toggle, close } = useSidebar();

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 지도 영역 */}
      <div className="absolute inset-0 bg-gray-200 z-0">
        {/* 왼쪽 상단 버튼 */}
        <div className="absolute top-4 left-8 flex items-center gap-3 px-4 py-2 z-10">
          <Button
            buttonStyle="white"
            icon={<ChevronLeft size={18} />}
            className="text-sm"
          >
            뒤로가기
          </Button>

          {/* 레이어 선택 */}
          <div className="relative w-[140px]">
            <select
              className="w-full h-[34px] text-sm bg-white border-none rounded pl-3 appearance-none"
              defaultValue=""
            >
              <option value="" disabled hidden>
                레이어 이름
              </option>
              <option>레이어 1</option>
              <option>레이어 2</option>
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
        {/* 닫기 버튼 */}
        <div
          className="flex items-center mb-5 space-x-[-16px] cursor-pointer"
          onClick={close}
        >
          <ChevronsRight size={35} />
        </div>

        {/* 위치/날짜/좋아요/조회수/신고 */}
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
          <h2 className="text-2xl font-semibold mb-2">
            서울 대학로 맛집 추천좀
          </h2>
          <p className="text-sm text-black mb-2">
            나 송지은인데 디자인 그만하고 대학로 갈거니까 맛집 알아와라
          </p>
        </div>

        {/* 토글 스위치 */}
        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Navigation size={18} />
              경로
            </div>
            <button
              onClick={() => setRouteEnabled(!routeEnabled)}
              className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${
                routeEnabled ? 'bg-[#005C54]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  routeEnabled ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <PlayCircle size={18} />
              애니메이션
            </div>
            <button
              onClick={() => setAnimationEnabled(!animationEnabled)}
              className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${
                animationEnabled ? 'bg-[#005C54]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  animationEnabled ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* 레이어 목록 */}
        <div className="border-t border-[var(--gray-50)] space-y-[15px] mt-4">
          <div className="flex items-center justify-between mt-4 mb-4 mr-3">
            <h3 className="text-xl text-black">레이어 및 마커</h3>
            <Download size={20} className="cursor-pointer text-[#000]" />
          </div>
          <LayerDetail title="레이어1">
            <MarkerDetail isTextArea />
          </LayerDetail>
          <LayerDetail title="레이어2">
            <MarkerDetail isTextArea />
            <MarkerDetail isTextArea />
            <MarkerDetail isTextArea />
          </LayerDetail>
          <LayerDetail title="레이어3">
            <MarkerDetail isTextArea />
            <MarkerDetail isTextArea />
          </LayerDetail>
        </div>

        {/* 참여하기 버튼 */}
        <Link href="/sharemap/sharemapjoin">
          <div className="flex justify-end pt-6">
            <Button
              buttonStyle="smGreen"
              className="w-[114px] h-[40px] text-[18px] font-semibold"
            >
              참여하기
            </Button>
          </div>
        </Link>
      </div>

      {/* 신고 모달 */}
      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </section>
  );
}
