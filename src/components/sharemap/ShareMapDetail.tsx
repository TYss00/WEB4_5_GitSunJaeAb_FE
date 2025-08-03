'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  Calendar,
  ChevronLeft,
  Eye,
  Heart,
  MapPin,
  Siren,
  PencilLine,
  Trash2,
  Ellipsis,
} from 'lucide-react'
import ReportModal from '../common/modal/ReportModal'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import axiosInstance from '@/libs/axios'
import { RoadmapDetailResponse } from '@/types/share'
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import { useAuthStore } from '@/store/useAuthStore'
import ConfirmModal from '../common/modal/ConfirmModal'
import { CommentInfo } from '@/types/type'
import Comment from '../comment/Comment'
import { useBookmarkStore } from '@/store/useBookmarkStore'
import LoadingSpinner from '../common/LoadingSpener'
import { toast } from 'react-toastify'

const containerStyle = {
  width: '100%',
  height: '500px',
}

export default function ShareMapDetail() {
  const { id } = useParams()

  const currentUserId = useAuthStore((state) => state.user?.id)
  const [roadmap, setRoadmap] = useState<RoadmapDetailResponse | null>(null)
  const [editors, setEditors] = useState<
    { memberId: number; nickname: string; profileImage: string }[]
  >([])
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [commentsInfo, setCommentsInfo] = useState<CommentInfo[]>([])
  const router = useRouter()

  const mapRef = useRef<google.maps.Map | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { isBookmarked, likeCount, initBookmark, toggleBookmark } =
    useBookmarkStore()

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await axiosInstance.get(`/roadmaps/${id}`)
        setRoadmap(res.data.roadmap)
      } catch (error) {
        console.error('지도 상세 조회 실패:', error)
      }
    }

    const fetchEditors = async () => {
      try {
        const res = await axiosInstance.get(`/roadmaps/${id}/editors`)
        setEditors(res.data.editors)
      } catch (error) {
        console.error('참여자 목록 조회 실패:', error)
      }
    }

    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(
          `/comments/roadmaps?roadmapId=${id}`
        )
        setCommentsInfo(res.data.comments)
      } catch (error) {
        console.error('댓글 불러오기 실패:', error)
      }
    }

    if (id) {
      fetchRoadmap()
      fetchEditors()
      fetchComments()
    }
  }, [id])

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

  useEffect(() => {
    if (id && roadmap) {
      initBookmark(String(id), roadmap.likeCount)
    }
  }, [id, initBookmark, roadmap])

  if (!roadmap)
    return (
      <div className="text-center py-20">
        <LoadingSpinner />
      </div>
    )

  function getShortAddress(fullAddress: string): string {
    const parts = fullAddress.split(' ')
    if (parts.length >= 4) {
      return `${parts[1]} ${parts[2]} ${parts[3]}`
    }
    return fullAddress
  }

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/roadmaps/${id}`)
      toast.success('삭제가 완료되었습니다.')
      router.push('/dashbord/sharemap')
      router.refresh()
    } catch (error) {
      console.error('삭제 실패: ', error)
      toast.error('삭제 권한이 없거나 실패했습니다.')
    } finally {
      setIsDeleteOpen(false)
    }
  }

  return (
    <>
      <main className="max-w-[1100px] mx-auto mt-[24px] mb-[85px]">
        <div className="flex items-center text-[14px] text-[var(--primary-300)] cursor-pointer mb-[22px]">
          <ChevronLeft size={18} />
          <Link href="/dashbord/sharemap/">
            <span>뒤로가기</span>
          </Link>
        </div>

        <div className="flex items-center justify-between text-[13px] text-[var(--gray-200)] mb-1">
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center gap-[2px]">
              <MapPin size={16} />
              <span>{getShortAddress(roadmap.address)}</span>
            </div>
            <div className="flex items-center gap-[2px]">
              <Calendar size={16} />
              <span>
                {roadmap.participationEnd?.slice(0, 10).replace(/-/g, '.')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[15px] text-[var(--black)]">
            <div className="flex items-center gap-1">
              <Heart
                size={18}
                onClick={toggleBookmark}
                className="cursor-pointer"
                fill={isBookmarked ? 'red' : 'none'}
                color={isBookmarked ? 'red' : 'black'}
              />
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={18} />
              <span>{roadmap.viewCount}</span>
            </div>
            {currentUserId === roadmap.member.id ? (
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
                        router.push(`/dashbord/sharemap/detail/${id}/edit`)
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
          </div>
        </div>

        <div>
          <h1 className="text-[20px] font-bold text-[var(--black)] mb-[11px]">
            {roadmap.title}
          </h1>
          <p className="text-[16px] text-[#000000] mb-[11px]">
            {roadmap.description}
          </p>
        </div>

        <div className="w-full h-[500px] rounded-[10px] overflow-hidden mb-[30px] relative">
          <Link
            href={`/dashbord/sharemap/detail/${id}/preview`}
            className="absolute top-3 right-3 z-10"
          >
            <button className="bg-white text-sm text-black px-3 py-1 rounded shadow hover:bg-gray-100">
              지도 자세히 보기
            </button>
          </Link>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: Number(roadmap.regionLatitude),
              lng: Number(roadmap.regionLongitude),
            }}
            zoom={14}
            options={{
              disableDefaultUI: true,
              draggable: true,
              scrollwheel: true,
            }}
            onLoad={(map) => {
              mapRef.current = map
            }}
          >
            {roadmap.layers
              .flatMap((layer) => layer.markers)
              .map((marker) => (
                <MarkerF
                  key={marker.id}
                  position={{ lat: marker.lat, lng: marker.lng }}
                />
              ))}
          </GoogleMap>
        </div>

        <div className="flex gap-6">
          <section className="flex-1">
            <div className="w-full h-[360px] py-4 rounded-md flex items-center justify-center">
              <Comment
                variant="sharemap"
                author={roadmap.member.id}
                commentsInfo={commentsInfo}
              />
            </div>
          </section>

          <section className="w-[428px] border border-[var(--gray-50)] rounded-md p-4 flex flex-col h-[360px]">
            <h2 className="text-[15px] font-semibold mb-4">
              참여자 {editors.length}
            </h2>

            {/* 스크롤 가능한 참여자 리스트 */}
            <div className="space-y-[16px] pr-1 overflow-y-auto flex-grow">
              {editors.map((editor) => (
                <div key={editor.memberId} className="flex items-center gap-2">
                  <Image
                    src={editor.profileImage || '/assets/defaultProfile.png'}
                    alt={editor.nickname}
                    width={34}
                    height={34}
                    className="w-[34px] h-[34px] rounded-full"
                  />
                  <span className="text-[15px] text-[var(--black)]">
                    {editor.nickname}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      {isReportOpen && (
        <ReportModal
          reportType="map"
          targetId={Number(id)}
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
