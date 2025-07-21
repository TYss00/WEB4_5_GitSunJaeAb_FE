'use client';

import { useEffect, useState } from 'react';
import MypageCard from '../ui/card/MypageCard';
import { MypagePostProps, RoadmapResponse } from '@/types/myprofile';
import { useProfileStore } from '@/store/profileStore';
import axiosInstance from '@/libs/axios';

export default function MypagePost({
  activeTab,
  searchKeyword,
}: MypagePostProps) {
  const [cards, setCards] = useState<RoadmapResponse[]>([]);
  const { member } = useProfileStore();

  useEffect(() => {
    const fetchRoadmaps = async () => {
      if (!member) return;

      try {
        let url = '';
        if (activeTab === '작성글') {
          url = `/roadmaps/member?memberId=${member.id}`;
        } else if (activeTab === '좋아요글') {
          url = `/bookmarks/bookmarkedRoadmaps`;
        } else {
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
      }
    };

    fetchRoadmaps();
  }, [activeTab, member]);

  const mapType = (roadmap: RoadmapResponse): '공개' | '비공개' | '공유' => {
    if (roadmap.roadmapType === 'SHARED') return '공유';
    if (roadmap.roadmapType === 'PERSONAL') {
      return roadmap.isPublic ? '공개' : '비공개';
    }
    return '공개';
  };

  const toggleLike = (id: number) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isLiked: !card.isLiked } : card
      )
    );
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
      {activeTab === '참여글' ? (
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
              title={card.title}
              date={card.createdAt?.split('T')[0]}
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
