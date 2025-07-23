'use client';

import { useEffect, useState } from 'react';
import MypageCard from '../ui/card/MypageCard';
import { MypagePostProps, RoadmapResponse } from '@/types/myprofile';
import axiosInstance from '@/libs/axios';
import MypageCardSkeleton from './skeleton/MypageCardSkeleton';

export default function MypagePost({
  activeTab,
  searchKeyword,
}: MypagePostProps) {
  const [cards, setCards] = useState<RoadmapResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      setIsLoading(true);
      try {
        let url = '';
        if (activeTab === '작성글') {
          url = `/roadmaps/member`;
        } else if (activeTab === '좋아요글') {
          url = `/bookmarks/bookmarkedRoadmaps`;
        } else {
          setCards([]);
          setIsLoading(false);
          return;
        }

        const res = await axiosInstance.get(url);

        const mapped = res.data.roadmaps.map((r: RoadmapResponse) => ({
          ...r,
          isLiked: r.isBookmarked,
        }));

        setCards(mapped);
      } catch (err) {
        console.error('로드맵 불러오기 실패:', err);
        setCards([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmaps();
  }, [activeTab]);

  const mapType = (roadmap: RoadmapResponse): '공개' | '비공개' | '공유' => {
    if (roadmap.roadmapType === 'SHARED') return '공유';
    if (roadmap.roadmapType === 'PERSONAL') {
      return roadmap.isPublic ? '공개' : '비공개';
    }
    return '공개';
  };

  const toggleLike = async (roadmapId: number) => {
    const card = cards.find((c) => c.id === roadmapId);
    const wasLiked = card?.isLiked;
    const likeId = card?.likeId;

    setCards((prev) =>
      prev.map((card) =>
        card.id === roadmapId ? { ...card, isLiked: !card.isLiked } : card
      )
    );

    try {
      if (!wasLiked) {
        await axiosInstance.post(`/bookmarks/${roadmapId}`);
      } else if (likeId) {
        await axiosInstance.delete(`/bookmarks/${likeId}`);
      } else {
        throw new Error('likeId가 없어 삭제할 수 없습니다.');
      }
    } catch (err) {
      console.error('좋아요 토글 실패:', err);
      alert('좋아요 처리 중 오류가 발생했습니다.');
      setCards((prev) =>
        prev.map((card) =>
          card.id === roadmapId ? { ...card, isLiked: wasLiked } : card
        )
      );
    }
  };

  const filteredCards = cards.filter((card) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      card.title.toLowerCase().includes(keyword) ||
      card.member?.nickname?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-4 gap-6">
          {Array(1)
            .fill(null)
            .map((_, i) => (
              <MypageCardSkeleton key={i} />
            ))}
        </div>
      ) : activeTab === '참여글' ? (
        <div className="text-center text-[var(--gray-300)] py-50">
          해당하는 참여한 글이 없습니다.
        </div>
      ) : filteredCards.length === 0 ? (
        <div className="text-center text-[var(--gray-300)] py-50">
          해당하는 게시글이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <MypageCard
              key={card.id}
              id={card.id}
              title={card.title}
              date={card.createdAt?.split('T')[0] || ''}
              type={mapType(card)}
              mapImageUrl={card.thumbnail || '/map.png'}
              isLiked={card.isLiked}
              onToggleLike={() => toggleLike(card.id)}
              {...(activeTab === '좋아요글' && card.member
                ? {
                    author: card.member.nickname,
                    profileImgUrl:
                      card.member.profileImage || '/assets/userProfile.png',
                  }
                : {})}
            />
          ))}
        </div>
      )}
    </div>
  );
}
