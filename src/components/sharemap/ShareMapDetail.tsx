'use client';

import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Calendar, ChevronLeft, Eye, Heart, MapPin, Siren } from 'lucide-react';
import HistoryModal from './HistoryModal';
import ReportModal from '../common/modal/ReportModal';
import Comment from '../comment/Comment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ShareMapDetail() {
  const router = useRouter();
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

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
              <span>Seoul</span>
            </div>
            <div className="flex items-center gap-[2px]">
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
            <Siren
              size={18}
              className="cursor-pointer"
              onClick={() => setIsReportOpen(true)}
            />
          </div>
        </div>

        <div>
          <h1 className="text-[20px] font-bold text-[var(--black)] mb-[11px]">
            서울 대학로 맛집 추천좀
          </h1>
          <p className="text-[16px] text-[#000000]">
            서울 대학로마다 맛집 ㅋㅋㅋ
            <br />
            군침이 싹도노
          </p>
        </div>

        <div
          className="flex justify-end text-[15px] text-[#066E65] font-medium mb-[6px] cursor-pointer"
          onClick={() => setShowHistoryModal(true)}
        >
          최근 변경 내역
        </div>

        {showHistoryModal && (
          <HistoryModal onClose={() => setShowHistoryModal(false)} />
        )}

        <Link href="/sharemap/shareclickdetail">
          <div className="w-full h-[500px] bg-[var(--gray-200)] rounded-[10px] overflow-hidden mb-[30px] relative transition duration-300 hover:brightness-90">
            <Image
              src="/assets/sampleMap.png"
              alt="지도 이미지"
              fill
              priority
              className="object-cover"
            />
          </div>
        </Link>

        <div className="flex gap-6">
          <section className="flex-1">
            <div className="w-full h-[360px] py-4 rounded-md flex items-center justify-center">
              <Comment postId="adf" />
            </div>
          </section>

          <section className="w-[428px] border border-[var(--gray-50)] rounded-md p-4">
            <h2 className="text-[15px] font-semibold mb-4">참여자 10</h2>

            {/* 스크롤 가능한 참여자 리스트 */}
            <div className="space-y-[16px] max-h-[240px] overflow-y-auto pr-1">
              {Array.from({ length: 10 }, (_, i) => `짱아${i + 1}`).map(
                (name, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Image
                      src="/assets/userProfile.png"
                      alt={name}
                      width={34}
                      height={34}
                      className="w-[34px] h-[34px] rounded-full"
                    />
                    <span className="text-[15px] text-[var(--black)]">
                      {name}
                    </span>
                  </div>
                )
              )}
            </div>

            <Link href="/sharemap/sharemapjoin">
              <Button className="w-full h-[38px] mt-4">참여하기</Button>
            </Link>
          </section>
        </div>
      </main>
      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </>
  );
}
