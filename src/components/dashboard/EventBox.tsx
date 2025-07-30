'use client';

import { useEffect, useState } from 'react';
import { CardListProps, QuestSummary } from '@/types/type';
import ShareMapCard from '../ui/card/ShareMapCard';
import QuestCard from '../ui/card/QuestCard';
import RoadMapCard from '../ui/card/RoadMapCard';
import axiosInstance from '@/libs/axios';
import { DashboardShareMapCardProps } from '@/types/share';
import { RoadmapResponse } from '@/types/myprofile';
import SkeletonCard from './skeleton/SkeletonCard';
import ShareMapSkeletonCard from './skeleton/ShareMapSkeletonCard';

interface EventBoxProps extends CardListProps {
  data?: DashboardShareMapCardProps[];
  isLoading?: boolean;
}

export default function EventBox({
  type,
  data,
  isLoading: isLoadingProp,
}: EventBoxProps) {
  const [topQuests, setTopQuests] = useState<QuestSummary[]>([]);
  const [topRoadmaps, setTopRoadmaps] = useState<RoadmapResponse[]>([]);
  const [isLoadingInternal, setIsLoadingInternal] = useState(false);

  const finalIsLoading =
    type === 'sharemap' ? isLoadingProp : isLoadingInternal;

  useEffect(() => {
    const fetchTopQuests = async () => {
      setIsLoadingInternal(true);
      try {
        const res = await axiosInstance.get('/quests');
        const allQuests: QuestSummary[] = res.data.quests;

        const filtered = allQuests.filter(
          (q) => q.isActive && new Date(q.deadline) > new Date()
        );

        const questsWithViews = await Promise.all(
          filtered.map(async (quest) => {
            const detail = await axiosInstance.get(`/quests/${quest.id}`);
            return {
              ...quest,
              viewCount: detail.data.viewCount ?? 0,
            };
          })
        );

        const sorted = questsWithViews
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, 3);

        setTopQuests(sorted);
      } catch (err) {
        console.error('퀘스트 조회 실패:', err);
      } finally {
        setIsLoadingInternal(false);
      }
    };

    const fetchTopRoadmaps = async () => {
      setIsLoadingInternal(true);
      try {
        const res = await axiosInstance.get('/roadmaps/personal');
        const allRoadmaps: RoadmapResponse[] = res.data.roadmaps;

        const sorted = allRoadmaps
          .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
          .slice(0, 3);

        setTopRoadmaps(sorted);
      } catch (err) {
        console.error('로드맵 조회 실패:', err);
      } finally {
        setIsLoadingInternal(false);
      }
    };

    if (type === 'quest') {
      fetchTopQuests();
    } else if (type === 'roadmap') {
      fetchTopRoadmaps();
    }
  }, [type]);

  return (
    <section className="relative w-full flex justify-center mt-[-50px] z-10">
      <div className="bg-[#EBF2F2] rounded-[100px] shadow-lg px-10 py-8 w-[90%] max-w-[1000px]">
        <h2 className="text-[30px] text-[#005C54] font-semibold text-center">
          Hot
        </h2>
        <div className="mx-auto mt-[19px] mb-[31px] w-[136px] h-[2px] bg-[#005C54] rounded-full" />
        <div className="flex gap-[18px] justify-center">
          {finalIsLoading
            ? Array.from({ length: 3 }).map((_, idx) =>
                type === 'sharemap' ? (
                  <ShareMapSkeletonCard key={idx} />
                ) : (
                  <SkeletonCard key={idx} />
                )
              )
            : type === 'sharemap' && data
            ? data.map((item) => (
                <ShareMapCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  mapImageUrl={item.thumbnail}
                  participants={item.participants}
                  category={item.categoryName}
                  isEvent={true}
                />
              ))
            : type === 'quest'
            ? topQuests.map((q) => (
                <QuestCard
                  id={q.id}
                  key={q.id}
                  isInProgress={true}
                  mapImageUrl={q.questImage}
                  title={q.title}
                  description={q.description}
                  profileImgUrl={
                    q.member.profileImage ?? '/assets/defaultProfile.png'
                  }
                  author={q.member.nickname}
                  deadLine={q.createdAt?.split('T')[0]}
                />
              ))
            : type === 'roadmap'
            ? topRoadmaps.map((roadmap) => (
                <RoadMapCard
                  key={roadmap.id}
                  id={roadmap.id}
                  category={roadmap.category?.name ?? '카테고리 없음'}
                  title={roadmap.title}
                  description={roadmap.description ?? ''}
                  hashtags={roadmap.hashtags?.map((h) => h.name) ?? []}
                  mapImageUrl={roadmap.thumbnail ?? '/default-thumbnail.png'}
                  profileImgUrl={
                    roadmap.member?.profileImage ?? '/assets/defaultProfile.png'
                  }
                  author={roadmap.member?.nickname ?? '알 수 없음'}
                  viewCount={roadmap.viewCount ?? 0}
                  shareCount={roadmap.citationCount ?? 0}
                  isBookmarked={roadmap.isBookmarked ?? false}
                  bookmarkId={roadmap.bookmarkId ?? null}
                />
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
