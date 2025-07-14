'use client'

import { useState } from 'react'
import {
  Heart,
  Siren,
  Eye,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronsRight,
} from 'lucide-react'
import Button from '../ui/Button'
import ReportModal from '../common/modal/ReportModal'
import Comment from '../comment/Comment'
import Toggle from '../ui/Toggle'
import LayerDetail from '../ui/layer/LayerDetail'
import MarkerDetail from '../ui/layer/MarkerDetail'

export default function Loadmapdetail() {
  const [isReportOpen, setIsReportOpen] = useState(false)

  return (
    <>
      <section className="flex w-full h-screen overflow-hidden">
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

        {/* 사이드바 */}
        <div className="w-2/6 h-full px-6 py-8 space-y-6 bg-white overflow-y-auto scrollbar-none">
          <div className="flex items-center mb-5 w-full gap-[10px]">
            <ChevronsRight size={25} />
            {/* 화면 위치 */}
            <h1 className="font-semibold text-xl">로드맵 상세보기</h1>
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
            <p className="text-[16px] text-black mb-2">
              나 송지은인데 디자인 그만하고 대학로 갈거니까 맛집 알아와라
            </p>
            <div className="flex gap-2 text-sm text-[#005C54]">
              <span>#태그1</span>
              <span>#태그2</span>
            </div>
          </div>
          <div className="flex gap-[5px] items-center">
            <div className="rounded-full bg-amber-950 size-[30px]"></div>
            <span className="text-sm">작성자 닉네임</span>
          </div>

          {/* 공통 컴포넌트 토글 */}
          <div className="space-y-3 border-t border-gray-300 pt-6">
            <Toggle label="경로" />
            <Toggle label="애니메이션" />
          </div>

          {/* 레이어 - 공통컴포넌트로 수정 */}
          <div className="border-t border-gray-300 space-y-[15px]">
            <div className="flex items-center justify-between mt-6 mb-3 mr-3">
              <h3 className="text-xl text-black">레이어 및 마커</h3>
              <Download size={18} className="cursor-pointer text-gray-600" />
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
            <LayerDetail title="레이어4">
              <MarkerDetail isTextArea />
              <MarkerDetail isTextArea />
              <MarkerDetail isTextArea />
              <MarkerDetail isTextArea />
              <MarkerDetail isTextArea />
            </LayerDetail>
          </div>

          {/* 공용 컴포넌트 댓글 */}
          <div className="mt-8 border-t border-gray-300 pt-4">
            <Comment postId="adslf" />
          </div>
        </div>
      </section>
      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </>
  )
}
