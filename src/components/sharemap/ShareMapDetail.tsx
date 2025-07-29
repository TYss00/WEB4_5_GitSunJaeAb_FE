'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { Calendar, ChevronLeft, Eye, Heart, MapPin, Siren } from 'lucide-react';
import ReportModal from '../common/modal/ReportModal';
// import Comment from '../comment/Comment';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '@/libs/axios';
import { RoadmapDetailResponse } from '@/types/share';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

export default function ShareMapDetail() {
  const router = useRouter();
  const { id } = useParams();

  const [roadmap, setRoadmap] = useState<RoadmapDetailResponse | null>(null);
  const [editors, setEditors] = useState<
    { memberId: number; name: string; profileImage: string }[]
  >([]);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const mapRef = useRef<google.maps.Map | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await axiosInstance.get(`/roadmaps/${id}`);
        setRoadmap(res.data.roadmap);
      } catch (error) {
        console.error('지도 상세 조회 실패:', error);
      }
    };

    const fetchEditors = async () => {
      try {
        const res = await axiosInstance.get(`/roadmaps/${id}/editors`);
        setEditors(res.data.editors); // ← 상태에 맞게 수정
      } catch (error) {
        console.error('참여자 목록 조회 실패:', error);
      }
    };

    if (id) {
      fetchRoadmap();
      fetchEditors();
    }
  }, [id]);

  if (!roadmap) return <div className="text-center py-20">로딩 중...</div>;

  return (
    <>
      <main className="max-w-[1100px] mx-auto mt-[24px] mb-[85px]">
        <div className="flex items-center text-[14px] text-[var(--primary-300)] cursor-pointer mb-[22px]">
          <ChevronLeft size={18} />
          <span onClick={() => router.back()}>뒤로가기</span>
        </div>

        <div className="flex items-center justify-between text-[13px] text-[var(--gray-200)] mb-1">
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center gap-[2px]">
              <MapPin size={16} />
              <span>{roadmap.address}</span>
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
              <Heart size={18} />
              <span>{roadmap.likeCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={18} />
              <span>{roadmap.viewCount}</span>
            </div>
            <Siren
              size={18}
              className="cursor-pointer"
              onClick={() => setIsReportOpen(true)}
            />
          </div>
        </div>

        <div>
          <h1 className="text-[20px] font-bold text-[var(--black)] mb-[11px]">
            {roadmap.title}
          </h1>
          <p className="text-[16px] text-[#000000]">{roadmap.description}</p>
        </div>

        {isLoaded && (
          <div className="w-full h-[500px] rounded-[10px] overflow-hidden mb-[30px] relative">
            <Link
              href={`/dashbord/sharemap/detail/${id}/preview`}
              className="absolute top-3 right-3 z-10"
            >
              <button className="bg-white text-sm text-black px-3 py-1 rounded shadow hover:bg-gray-100">
                자세히 보기
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
                mapRef.current = map;
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
        )}

        <div className="flex gap-6">
          <section className="flex-1">
            <div className="w-full h-[360px] py-4 rounded-md flex items-center justify-center">
              {/* <Comment postId="adf" /> */}
            </div>
          </section>

          <section className="w-[428px] border border-[var(--gray-50)] rounded-md p-4">
            <h2 className="text-[15px] font-semibold mb-4">
              참여자 {editors.length}
            </h2>

            {/* 스크롤 가능한 참여자 리스트 */}
            <div className="space-y-[16px] max-h-[240px] overflow-y-auto pr-1">
              {editors.map((editor) => (
                <div key={editor.memberId} className="flex items-center gap-2">
                  <Image
                    src={editor.profileImage || '/assets/userProfile.png'}
                    alt={editor.name}
                    width={34}
                    height={34}
                    className="w-[34px] h-[34px] rounded-full"
                  />
                  <span className="text-[15px] text-[var(--black)]">
                    {editor.name}
                  </span>
                </div>
              ))}
            </div>
            <Link href={`/dashbord/sharemap/detail/${id}/preview/mapjoin`}>
              <Button className="w-full h-[38px] mt-4">참여하기</Button>
            </Link>
          </section>
        </div>
      </main>
      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </>
  );
}
