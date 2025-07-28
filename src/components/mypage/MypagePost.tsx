'use client';

import { useEffect, useState } from 'react';
import MypageCard from '../ui/card/MypageCard';
import MypageCardSkeleton from './skeleton/MypageCardSkeleton';
import {
  MemberQuest,
  MypagePostProps,
  ProfileMember,
  RoadmapResponse,
} from '@/types/myprofile';
import axiosInstance from '@/libs/axios';
import { useProfileStore } from '@/store/profileStore';

export default function MypagePost({
  activeTab,
  searchKeyword,
}: MypagePostProps) {
  const [cards, setCards] = useState<RoadmapResponse[]>([]);
  const [quests, setQuests] = useState<MemberQuest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const member = useProfileStore(
    (state) => state.member
  ) as ProfileMember | null;

  useEffect(() => {
    const fetchRoadmapsOrQuests = async () => {
      setIsLoading(true);
      try {
        if (activeTab === '작성글') {
          const [roadmapRes, questRes] = await Promise.all([
            axiosInstance.get('/roadmaps/member'),
            axiosInstance.get('/quests/my'),
          ]);

          const mapped = roadmapRes.data.roadmaps.map((r: RoadmapResponse) => ({
            ...r,
            isLiked: r.isBookmarked,
            likeId: r.bookmarkId,
          }));

          setCards(mapped);
          setQuests(questRes.data.quests || []);
        } else if (activeTab === '좋아요글') {
          const res = await axiosInstance.get('/bookmarks/bookmarkedRoadmaps');
          const mapped = res.data.roadmaps
            .map((r: RoadmapResponse) => ({
              ...r,
              isLiked: r.isBookmarked,
              likeId: r.bookmarkId,
            }))
            .reverse();
          setCards(mapped);
        } else if (activeTab === '참여글') {
          const res = await axiosInstance.get('/quests/memberQuest/my');
          const sorted = (res.data.memberQuests || []).sort(
            (a: MemberQuest, b: MemberQuest) =>
              new Date(b.submitAt || '').getTime() -
              new Date(a.submitAt || '').getTime()
          );
          setQuests(sorted);
        } else {
          setCards([]);
          setQuests([]);
        }
      } catch (err) {
        alert('데이터 불러오는 중 오류가 발생했습니다.');
        console.error(err);
        setCards([]);
        setQuests([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmapsOrQuests();
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
        if (activeTab === '좋아요글') {
          setCards((prev) => prev.filter((c) => c.id !== roadmapId));
        }
      } else {
        throw new Error('likeId가 없어 삭제할 수 없습니다.');
      }
    } catch (err) {
      alert('좋아요 처리 중 오류가 발생했습니다.');
      console.error(err);
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

  const filteredQuests = quests.filter((q) =>
    q.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const mergedPosts =
    activeTab === '작성글'
      ? [
          ...filteredCards.map((card) => ({
            type: '로드맵' as const,
            id: card.id,
            date: card.createdAt,
            data: card,
          })),
          ...filteredQuests.map((q) => ({
            type: '퀘스트' as const,
            id: q.id,
            date: q.createdAt,
            data: q,
          })),
        ].sort(
          (a, b) =>
            new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
        )
      : [];

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
        filteredQuests.length === 0 ? (
          <div className="text-center text-[var(--gray-300)] py-50">
            해당하는 참여한 글이 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {filteredQuests.map((q) => (
              <MypageCard
                key={q.id}
                id={q.id}
                title={q.title}
                date={q.submitAt?.split('T')[0] || ''}
                type="퀘스트"
                mapImageUrl={q.imageUrl || '/map.png'}
                isLiked={false}
                onToggleLike={() => {}}
                author={
                  q.member.id === member?.id
                    ? member?.nickname
                    : q.member.nickname
                }
                profileImgUrl={
                  q.member.id === member?.id
                    ? member?.profileImage || '/assets/defaultProfile.png'
                    : q.member.profileImage || '/assets/defaultProfile.png'
                }
              />
            ))}
          </div>
        )
      ) : filteredCards.length === 0 && filteredQuests.length === 0 ? (
        <div className="text-center text-[var(--gray-300)] py-50">
          해당하는 게시글이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {activeTab === '작성글'
            ? mergedPosts.map((item) =>
                item.type === '로드맵' ? (
                  <MypageCard
                    key={`roadmap-${item.id}`}
                    id={item.data.id}
                    title={item.data.title}
                    date={item.data.createdAt?.split('T')[0] || ''}
                    type={mapType(item.data)}
                    mapImageUrl={item.data.thumbnail || '/map.png'}
                    isLiked={item.data.isLiked}
                    onToggleLike={() => toggleLike(item.data.id)}
                  />
                ) : (
                  <MypageCard
                    key={`quest-${item.id}`}
                    id={item.data.id}
                    title={item.data.title}
                    date={item.data.createdAt?.split('T')[0] || ''}
                    type="퀘스트"
                    mapImageUrl={item.data.imageUrl || '/map.png'}
                    isLiked={false}
                  />
                )
              )
            : filteredCards.map((card) => (
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
                        author:
                          card.member.id === member?.id
                            ? member?.nickname
                            : card.member.nickname,
                        profileImgUrl:
                          card.member.id === member?.id
                            ? member?.profileImage ||
                              '/assets/defaultProfile.png'
                            : card.member.profileImage ||
                              '/assets/defaultProfile.png',
                      }
                    : {})}
                />
              ))}
        </div>
      )}
    </div>
  );
}
