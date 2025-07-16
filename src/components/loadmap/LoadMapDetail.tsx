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
  ChevronsLeft,
} from 'lucide-react'
import Button from '../ui/Button'
import ReportModal from '../common/modal/ReportModal'
import Comment from '../comment/Comment'
import Toggle from '../ui/Toggle'
import LayerDetail from '../ui/layer/LayerDetail'
import MarkerDetail from '../ui/layer/MarkerDetail'
import useSidebar from '@/utils/useSidebar'
import { useRouter } from 'next/navigation'
import { HashtagProps, RoadmapProps } from '@/types/type'

export default function Loadmapdetail({
  roadMapInfo,
  layerInfo,
  commentsInfo,
}: RoadmapProps) {
  const router = useRouter()
  const [isReportOpen, setIsReportOpen] = useState(false)
  const { isOpen, toggle, close } = useSidebar()

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden">
        {/* 왼쪽 지도 */}
        <div className="absolute inset-0 bg-gray-200 z-0">
          <div className="absolute top-4 left-8 flex items-center gap-3 px-4 py-2 z-10">
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
                defaultValue=""
              >
                <option>전체</option>
                {layerInfo.map((layer) => {
                  return <option key={layer.id}>{layer.name}</option>
                })}
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
            <div className="flex items-center mb-5 w-full gap-[10px]">
              <ChevronsRight size={25} onClick={close} />
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
                  <Heart size={16} strokeWidth={3} /> {roadMapInfo.likeCount}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={16} strokeWidth={3} /> {roadMapInfo.viewCount}
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
                {roadMapInfo.title}
              </h2>
              <p className="text-[16px] text-black mb-2">
                {roadMapInfo.description}
              </p>
              <div className="flex gap-2 text-sm text-[#005C54] mb-2">
                {roadMapInfo.hashtags.map((tag: HashtagProps) => {
                  return <span key={tag.id}>#{tag.name}</span>
                })}
              </div>
            </div>
            <div className="flex gap-[5px] items-center mb-6">
              <div className="rounded-full bg-amber-950 size-[25px]"></div>
              <span className="text-sm">{roadMapInfo.member.nickname}</span>
            </div>

            {/* 토글 */}
            <div className="space-y-3 border-t border-gray-300 pt-6 mb-6">
              <Toggle label="경로" />
              <Toggle label="애니메이션" />
            </div>

            {/* 레이어 */}
            <div className="border-t border-gray-300 space-y-[15px]">
              <div className="flex items-center justify-between mt-6 mb-3 mr-3">
                <h3 className="text-xl text-black">레이어 및 마커</h3>
                <Download size={18} className="cursor-pointer text-gray-600" />
              </div>
              {layerInfo.map((layer) => {
                return (
                  <LayerDetail title={layer.name} key={layer.id}>
                    <MarkerDetail isTextArea></MarkerDetail>
                  </LayerDetail>
                )
              })}
            </div>

            {/* 공용 컴포넌트 댓글 */}
            <div className="mt-8 border-t border-gray-300 pt-4">
              <Comment variant="roadmap" commentsInfo={commentsInfo} />
            </div>
          </div>
        </div>
      </section>
      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </>
  )
}
