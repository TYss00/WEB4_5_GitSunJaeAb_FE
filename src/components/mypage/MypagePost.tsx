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
import { toast } from 'react-toastify';

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
          setQuests(
            (questRes.data.quests || []).filter(
              (q: MemberQuest) => q.deletedAt === null
            )
          );
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
          const [questRes, sharedMapRes] = await Promise.all([
            axiosInstance.get('/quests/memberQuest/my'),
            axiosInstance.get('/roadmaps/shared/participated'),
          ]);

          const quests = (questRes.data.memberQuests || [])
            .filter((q: MemberQuest) => q.deletedAt === null) // 삭제되지 않은 항목만 필터링
            .map((q: MemberQuest) => ({
              type: '퀘스트' as const,
              id: q.id,
              date: q.submitAt,
              data: q,
            }));

          const sharedRoadmaps = (sharedMapRes.data.roadmaps || []).map(
            (r: RoadmapResponse) => ({
              type: '공유' as const,
              id: r.id,
              date: r.createdAt,
              data: {
                ...r,
                isLiked: r.isBookmarked,
                likeId: r.bookmarkId,
              },
            })
          );

          const merged = [...quests, ...sharedRoadmaps].sort(
            (a, b) =>
              new Date(b.date || '').getTime() -
              new Date(a.date || '').getTime()
          );

          setCards(
            merged.filter((item) => item.type === '공유').map((i) => i.data)
          );
          setQuests(
            merged.filter((item) => item.type === '퀘스트').map((i) => i.data)
          );
        } else {
          setCards([]);
          setQuests([]);
        }
      } catch (err) {
        toast.error('데이터 불러오는 중 오류가 발생했습니다.');
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
        const res = await axiosInstance.post(`/bookmarks/${roadmapId}`);
        const newBookmarkId = res.data.bookmarkId;

        setCards((prev) =>
          prev.map((card) =>
            card.id === roadmapId ? { ...card, likeId: newBookmarkId } : card
          )
        );

        toast.success('좋아요를 하였습니다.');
      } else if (likeId) {
        await axiosInstance.delete(`/bookmarks/${likeId}`);
        toast.success('좋아요취소를 하였습니다.');
        if (activeTab === '좋아요글') {
          setCards((prev) => prev.filter((c) => c.id !== roadmapId));
        } else {
          setCards((prev) =>
            prev.map((card) =>
              card.id === roadmapId ? { ...card, likeId: null } : card
            )
          );
        }
      } else {
        throw new Error('likeId가 없어 삭제할 수 없습니다.');
      }
    } catch (err) {
      toast.error('좋아요 처리 중 오류가 발생했습니다.');
      console.error(err);
      // 롤백
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
        filteredCards.length === 0 && filteredQuests.length === 0 ? (
          <div className="text-center text-[var(--gray-300)] py-50">
            해당하는 참여한 글이 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {[
              ...filteredCards.map((c) => ({
                type: '공유' as const,
                id: c.id,
                date: c.createdAt,
                data: c,
              })),
              ...filteredQuests.map((q) => ({
                type: '퀘스트' as const,
                id: q.id,
                date: q.submitAt,
                data: q,
              })),
            ]
              .sort(
                (a, b) =>
                  new Date(b.date || '').getTime() -
                  new Date(a.date || '').getTime()
              )
              .map((item) =>
                item.type === '공유' ? (
                  <MypageCard
                    key={`shared-${item.id}`}
                    id={item.data.id}
                    title={item.data.title}
                    date={item.data.createdAt?.split('T')[0] || ''}
                    type="공유"
                    mapImageUrl={item.data.thumbnail || '/map.png'}
                    isLiked={item.data.isLiked}
                    onToggleLike={() => toggleLike(item.data.id)}
                    author={
                      item.data.member?.id === member?.id
                        ? member?.nickname
                        : item.data.member?.nickname
                    }
                    profileImgUrl={
                      item.data.member?.id === member?.id
                        ? member?.profileImage || '/assets/defaultProfile.png'
                        : item.data.member?.profileImage ||
                          '/assets/defaultProfile.png'
                    }
                  />
                ) : (
                  <MypageCard
                    key={`quest-${item.id}`}
                    id={item.data.id}
                    title={item.data.title}
                    date={item.data.submitAt?.split('T')[0] || ''}
                    type="퀘스트"
                    mapImageUrl={item.data.imageUrl || '/map.png'}
                    isLiked={false}
                    onToggleLike={() => {}}
                    author={
                      item.data.member?.id === member?.id
                        ? member?.nickname
                        : item.data.member?.nickname
                    }
                    profileImgUrl={
                      item.data.member?.id === member?.id
                        ? member?.profileImage || '/assets/defaultProfile.png'
                        : item.data.member?.profileImage ||
                          '/assets/defaultProfile.png'
                    }
                  />
                )
              )}
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
