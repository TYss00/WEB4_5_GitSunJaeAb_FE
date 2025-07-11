'use client';

import { useState } from 'react';
import {
  Heart,
  Siren,
  Eye,
  Layers,
  Download,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  Navigation,
} from 'lucide-react';
import Button from '../ui/Button';

export default function ShareClickDetail() {
  const [routeEnabled, setRouteEnabled] = useState(true);
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 right-4 z-20 bg-[var(--white)] rounded-[10px] p-[10px]"
        >
          <div className="flex items-center space-x-[-16px]">
            <ChevronLeft size={25} />
            <ChevronLeft size={25} />
          </div>
        </button>
      )}

      {/* 사이드바 */}
      <div
        className={`absolute top-0 right-0 h-full w-[590px] bg-[var(--white)] z-10 px-6 py-8 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          className="flex items-center mb-5 space-x-[-16px] cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        >
          <ChevronRight size={25} />
          <ChevronRight size={25} />
        </div>

        <div className="flex items-center justify-between mb-3">
          {/* 카테고리 */}
          <span className="bg-[#005C54] text-white text-sm px-3 py-1 rounded-2xl">
            게임
          </span>

          {/* 좋아요/조회수/신고 */}
          <div className="flex gap-4 text-gray-700 text-sm items-center">
            <span className="flex items-center gap-1">
              <Heart size={16} strokeWidth={3} /> 4
            </span>
            <span className="flex items-center gap-1">
              <Eye size={16} strokeWidth={3} /> 22
            </span>
            <span className="flex items-center gap-1">
              <Siren size={16} strokeWidth={3} />
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            서울 대학로 맛집 추천좀
          </h2>
          <p className="text-sm text-black mb-2">
            나 송지은인데 디자인 그만하고 대학로 갈거니까 맛집 알아와라
          </p>
          <div className="flex gap-2 text-sm text-[#005C54]">
            <span>#태그1</span>
            <span>#태그2</span>
          </div>
        </div>

        {/* 공통 컴포넌트 토글 */}
        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Navigation size={18} />
              경로 (컴포넌트 삽입 예정)
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
              애니메이션 (컴포넌트 삽입 예정)
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

        {/* 레이어 - 공통컴포넌트로 수정 */}
        <div className="border-t border-gray-300 mt-6 pt-4">
          <div className="flex items-center justify-between mb-3 mr-3">
            <h3 className="text-xl text-black">레이어 및 마커 관리</h3>
            <Download size={18} className="cursor-pointer text-gray-600" />
          </div>

          <div className="space-y-3">
            {[1, 1, 3].map((num, idx) => (
              <div
                key={idx}
                className={`border rounded-lg p-3 ${
                  num === 3 ? 'bg-[#E7F0EF] border-[#CCE6E2]' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-sm">
                    <Layers size={16} />
                    레이어{num}
                  </span>
                  <div className="flex items-center gap-2">
                    <Download size={16} className="cursor-pointer" />
                    <ChevronUp size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 참여하기 버튼 */}
        <div className="flex justify-end pt-6">
          <Button
            buttonStyle="smGreen"
            className="w-[114px] h-[40px] text-[18px] font-semibold"
          >
            참여하기
          </Button>
        </div>
      </div>
    </section>
  );
}
