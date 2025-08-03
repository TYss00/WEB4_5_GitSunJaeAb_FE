'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Heart,
  Siren,
  Eye,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
  Ellipsis,
  PencilLine,
  Trash2,
} from 'lucide-react'
import Button from '../ui/Button'
import ReportModal from '../common/modal/ReportModal'
import Comment from '../comment/Comment'
import LayerDetail from '../ui/layer/LayerDetail'
import MarkerDetail from '../ui/layer/MarkerDetail'
import useSidebar from '@/utils/useSidebar'
import { useParams, useRouter } from 'next/navigation'
import { HashtagProps, RoadmapDetailProps } from '@/types/type'
import RoadMapGoogleDetail from './RoadMapGoogleDetail'
import axiosInstance from '@/libs/axios'
import Image from 'next/image'
import { useAuthStore } from '@/store/useAuthStore'
import ConfirmModal from '../common/modal/ConfirmModal'
import { useBookmarkStore } from '@/store/useBookmarkStore'
import LoadingSpinner from '../common/LoadingSpener'
import { toast } from 'react-toastify'

export default function Loadmapdetail() {
  const currentUserId = useAuthStore((state) => state.user?.id)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<RoadmapDetailProps>()
  const router = useRouter()
  const [isReportOpen, setIsReportOpen] = useState(false)
  const { isOpen, toggle, close } = useSidebar()
  const params = useParams()
  const roadmapId = params?.id as string
  const [selectedLayerId, setSelectedLayerId] = useState<number | 'all'>('all')

  const { isBookmarked, likeCount, initBookmark, toggleBookmark } =
    useBookmarkStore()

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [roadmapRes, commentsRes] = await Promise.all([
          axiosInstance.get(`/roadmaps/${roadmapId}`),
          axiosInstance.get(`/comments/roadmaps?roadmapId=${roadmapId}`),
        ])

        setData({
          roadmap: roadmapRes.data.roadmap,
          comments: commentsRes.data.comments,
        })
      } catch (e) {
        console.error('데이터 요청 실패:', e)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [roadmapId])
  useEffect(() => {
    if (roadmapId && data?.roadmap) {
      initBookmark(String(roadmapId), data.roadmap.likeCount)
    }
  }, [roadmapId, initBookmark, data])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (loading) return <LoadingSpinner />
  if (!data) return <div>데이터 없음</div>

  const { roadmap: roadMapInfo, comments: commentsInfo } = data

  const defaultCenter = { lat: 37.5665, lng: 126.978 }

  const handleZzim = async () => {
    try {
      const promises = roadMapInfo.layers.map((item) =>
        axiosInstance.post(`/layers/member?layerId=${item.layer.id}`)
      )
      await Promise.all(promises)
      toast.success('레이어 일괄 찜 완료!')
    } catch {
      toast.error('레이어 일괄 찜 오류')
    }
  }

  // 선택된 레이어의 마커만 추출
  const filteredMarkers =
    selectedLayerId === 'all'
      ? roadMapInfo.layers.flatMap((item) => item.markers)
      : roadMapInfo.layers
          .filter((item) => item.layer.id === selectedLayerId)
          .flatMap((item) => item.markers)

  // 중심 좌표 계산
  const center =
    filteredMarkers.length > 0
      ? { lat: filteredMarkers[0].lat, lng: filteredMarkers[0].lng }
      : defaultCenter

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/roadmaps/${roadmapId}`)
      router.push('/dashbord/roadmap')
    } catch (error) {
      console.error('삭제 실패: ', error)
      alert('삭제 권한이 없거나 실패했습니다.')
    } finally {
      setIsDeleteOpen(false)
    }
  }

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 z-0">
          <RoadMapGoogleDetail markers={filteredMarkers} center={center} />
          <div className="absolute top-[10px] left-5 flex items-center gap-3 z-10">
            <Button
              buttonStyle="white"
              onClick={() => router.back()}
              icon={<ChevronLeft size={18} />}
              className="text-md h-[40px]"
            >
              뒤로가기
            </Button>

            {/* 레이어 선택 */}
            <div className="relative w-[180px] shadow-sm">
              <select
                className="w-full h-[40px] text-sm bg-white border-none rounded-[3px] px-3 appearance-none focus:outline-none"
                onChange={(e) => {
                  const value = e.target.value
                  setSelectedLayerId(value === 'all' ? 'all' : parseInt(value))
                }}
              >
                <option value="all">전체</option>
                {roadMapInfo.layers.map((item) => {
                  return (
                    <option key={item.layer.id} value={item.layer.id}>
                      {item.layer.name}
                    </option>
                  )
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
            className="flex justify-center items-center absolute top-[10px] right-5 z-20 bg-[var(--white)] rounded-[3px] size-[40px] shadow-sm"
          >
            <ChevronsLeft size={25} />
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
              <ChevronsRight
                size={25}
                onClick={close}
                className="cursor-pointer"
              />
              {/* 화면 위치 */}
              <h1 className="font-semibold text-xl">로드맵 상세보기</h1>
            </div>

            <div className="flex items-center justify-between mb-3">
              {/* 카테고리 */}
              <span className="bg-[#005C54] text-white text-sm px-3 py-1 rounded-2xl">
                {roadMapInfo.category.name}
              </span>

              {/* 좋아요,조회수,신고 */}
              <div className="flex gap-4 text-gray-700 text-sm items-center">
                <span className="flex items-center gap-1">
                  <Heart
                    size={18}
                    onClick={toggleBookmark}
                    className="cursor-pointer"
                    fill={isBookmarked ? 'red' : 'none'}
                    color={isBookmarked ? 'red' : 'black'}
                  />
                  {likeCount}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={16} strokeWidth={3} /> {roadMapInfo.viewCount}
                </span>
                <span className="flex items-center gap-1">
                  {currentUserId === roadMapInfo.member.id ? (
                    // 작성자일 경우: 점 3개 메뉴 (수정/삭제)
                    <div className="relative" ref={dropdownRef}>
                      <Ellipsis
                        size={20}
                        className="cursor-pointer"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                      />
                      {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow z-50">
                          <button
                            onClick={() => {
                              setIsMenuOpen(false)
                              router.push(
                                `/dashbord/roadmap/detail/${roadmapId}/edit`
                              )
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                          >
                            <PencilLine size={18} />
                            수정하기
                          </button>
                          <div className="border-t border-gray-200 mx-2" />
                          <button
                            onClick={() => {
                              setIsMenuOpen(false)
                              setIsDeleteOpen(true)
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-500"
                          >
                            <Trash2 size={18} />
                            삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Siren
                      size={18}
                      className="cursor-pointer text-red-500"
                      onClick={() => setIsReportOpen(true)}
                    />
                  )}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {roadMapInfo.title}
              </h2>
              <div className="relative  w-full h-[300px] bg-gray-100 rounded-[5px] mb-2 overflow-hidden">
                {/* 기본 썸네일 이미지 제작 시 교체 예정 */}
                <Image
                  src={roadMapInfo.thumbnail ?? '/assets/defaultProfile.png'}
                  alt="썸네일 이미지"
                  fill
                  className="object-fill"
                />
              </div>
              <p className="text-[16px] text-black mb-2">
                {roadMapInfo.description}
              </p>
              <div className="flex flex-wrap max-w-full gap-2 text-sm text-[#005C54] mb-3">
                {roadMapInfo.hashtags.map((tag: HashtagProps) => {
                  return (
                    <span
                      key={tag.id}
                      className="px-2 py-1 bg-[#e0f0ef] rounded-full flex items-center"
                    >
                      #{tag.name}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="flex gap-[10px] items-center mb-6">
              <div className="relative rounded-full size-[34px]">
                <Image
                  src={
                    roadMapInfo.member.profileImage ??
                    '/assets/defaultProfile.png'
                  }
                  alt="작성자 프로필 이미지"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <span className="text-[15px] font-medium">
                {roadMapInfo.member.nickname}
              </span>
            </div>

            {/* 레이어 */}
            <div className="border-t border-gray-300 space-y-[15px]">
              <div className="flex items-center justify-between mt-6 mb-3 mr-3">
                <h3 className="text-xl text-black">레이어 및 마커</h3>
                <Download
                  size={18}
                  className="cursor-pointer text-gray-600"
                  onClick={handleZzim}
                />
              </div>
              {roadMapInfo.layers.map((item) => {
                return (
                  <LayerDetail
                    title={item.layer?.name ?? `Layer ${item.layer.id}`}
                    id={item.layer.id}
                    key={item.layer.id}
                  >
                    {item.markers?.map((marker) => (
                      <MarkerDetail
                        key={marker.id}
                        id={marker.id}
                        title={marker.name}
                        description={marker.description}
                        location={{ lat: marker.lat, lng: marker.lng }}
                        isTextArea
                      />
                    ))}
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
      {isReportOpen && (
        <ReportModal
          reportType="map"
          targetId={Number(roadmapId)}
          onClose={() => setIsReportOpen(false)}
        />
      )}
      {isDeleteOpen && (
        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onDelete={handleDelete}
          confirmType="post"
        />
      )}
    </>
  )
}
