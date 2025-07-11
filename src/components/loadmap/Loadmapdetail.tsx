'use client'

import { useState } from 'react'
import {
  Heart,
  Siren,
  Eye,
  Layers,
  Download,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Route,
  ChevronLeft,
  ChevronsRight,
} from 'lucide-react'
import Button from '../ui/Button'
import ReportModal from '../common/modal/ReportModal'

export default function Loadmapdetail() {
  const [routeEnabled, setRouteEnabled] = useState(true)
  const [animationEnabled, setAnimationEnabled] = useState(true)
  const [isReportOpen, setIsReportOpen] = useState(false)

  return (
    <>
      <section className="flex min-h-screen">
        {/* 왼쪽 지도 */}
        <div className="w-4/6 bg-gray-200 relative">
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

        {/* 오른쪽 */}
        <div className="w-2/6 px-6 py-8 space-y-6 bg-white">
          <div className="flex items-center mb-5 space-x-[-16px]">
            <ChevronsRight size={25} />
          </div>

          <div className="flex items-center justify-between mb-3">
            {/* 카테고리 */}
            <span className="bg-[#005C54] text-white text-sm px-3 py-1 rounded-2xl">
              게임
            </span>

            {/* 좋아요,조회수,신고 */}
            <div className="flex gap-4 text-gray-700 text-sm items-center">
              <span className="flex items-center gap-1">
                <Heart size={16} strokeWidth={3} /> 4
              </span>
              <span className="flex items-center gap-1">
                <Eye size={16} strokeWidth={3} /> 22
              </span>
              <span className="flex items-center gap-1">
                <Siren
                  size={16}
                  strokeWidth={3}
                  className="cursor-pointer"
                  onClick={() => setIsReportOpen(true)}
                />
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Route size={18} />
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
          <div className="border-t border-gray-300">
            <div className="flex items-center justify-between mt-6 mb-3 mr-3">
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

          {/* 공용 컴포넌트 댓글 */}
          <div className="mt-8">
            <div className="h-[200px] border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
              레이어 상세 영역 (컴포넌트 삽입 예정)
            </div>

            <div className="mt-8 border-t pt-4">
              <h4 className="font-semibold text-sm mb-2">댓글</h4>
              <div className="h-[150px] border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
                댓글 목록 영역 (컴포넌트 삽입 예정)
              </div>
              <div className="flex mt-4 gap-2">
                <input
                  type="text"
                  placeholder="댓글을 입력해주세요."
                  className="flex-1 border rounded px-3 py-2 text-sm"
                />
                <Button
                  buttonStyle="smGreen"
                  className="text-sm px-4 py-2 w-[60px] h-[35px]"
                >
                  등록
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </>
  )
}
