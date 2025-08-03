'use client';

import { Crown } from 'lucide-react';
import Button from '../ui/Button';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/libs/axios';
import { RankingInfo } from '@/types/type';
import Image from 'next/image';
import QuestDetailRankingSkeleton from './skeleton/QuestDetailRankingSkeleton';

export default function QuestDeatilRanking() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const questId = typeof params?.id === 'string' ? params.id : null;

  const [ranking, setRanking] = useState<RankingInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!questId) return;

    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(
          `/quests/${questId}/correctRanking`
        );
        setRanking(res.data);
      } catch (err) {
        console.error('랭킹 데이터 불러오기 실패', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [questId]);

  if (isLoading) {
    return <QuestDetailRankingSkeleton />;
  }

  if (ranking.length === 0) {
    return <p className="text-center py-4 text-gray-500">랭킹이 없습니다.</p>;
  }

  const top3 = ranking.slice(0, 3);
  const rest = ranking.slice(3);

  return (
    <>
      {/* 1~3등 영역 */}
      <div className="py-4 flex justify-around">
        {/* 2등 */}
        {top3[1] && (
          <div className="text-center">
            <p className="pt-4.5 font-medium">2</p>
            <div className="bg-gray-400 rounded-full size-20 overflow-hidden">
              <Image
                src={
                  top3[1].memberProfileImageUrl ?? '/assets/defaultProfile.png'
                }
                alt="프로필 이미지"
                width={80}
                height={80}
              />
            </div>
            <h4 className="pt-1">{top3[1].memberName}</h4>
          </div>
        )}

        {/* 1등 */}
        {top3[0] && (
          <div className="text-center">
            <div className="relative inline-block">
              <div className="bg-gray-400 rounded-full size-25">
                <Image
                  src={
                    top3[0].memberProfileImageUrl ??
                    '/assets/defaultProfile.png'
                  }
                  alt="프로필 이미지"
                  width={100}
                  height={100}
                />
              </div>
              <Crown
                size={24}
                className="text-[#FFC107] absolute -top-4.5 left-1/2 -translate-x-1/2"
                fill="#FFC107"
              />
            </div>
            <h4>{top3[0].memberName}</h4>
          </div>
        )}

        {/* 3등 */}
        {top3[2] && (
          <div className="text-center">
            <p className="pt-4.5 font-medium">3</p>
            <div className="bg-gray-400 rounded-full size-20 overflow-hidden">
              <Image
                src={
                  top3[2].memberProfileImageUrl ?? '/assets/defaultProfile.png'
                }
                alt="프로필 이미지"
                width={80}
                height={80}
              />
            </div>
            <h4 className="pt-1">{top3[2].memberName}</h4>
          </div>
        )}
      </div>

      {/* 4등 이하 영역 */}
      {isOpen && (
        <div className="mt-4.5 transition-all duration-300 ease-in-out">
          {rest.map((ranker) => (
            <div
              key={ranker.rank}
              className="flex gap-4 items-center border border-[var(--gray-50)] px-4 py-2 bg-[var(--gray-40)] rounded-[8px] mb-4"
            >
              <p className="font-medium text-[15px]">{ranker.rank}</p>
              <div className="bg-gray-800 rounded-full size-10 overflow-hidden">
                <Image
                  src={
                    ranker.memberProfileImageUrl ?? '/assets/defaultProfile.png'
                  }
                  alt="프로필 이미지"
                  width={40}
                  height={40}
                />
              </div>
              <h4 className="text-[15px]">{ranker.memberName}</h4>
            </div>
          ))}
        </div>
      )}

      {/* 전체보기 버튼 (랭킹이 3명 이상일 때만) */}
      {ranking.length >= 3 && (
        <Button
          buttonStyle="green"
          className="w-full text-[15px] h-[38px] cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? '닫기' : '전체 랭킹 보기'}
        </Button>
      )}
    </>
  );
}
