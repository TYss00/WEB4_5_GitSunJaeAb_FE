'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/libs/axios';
import SearchCategoryGroup from './SearchCategoryGroup';
import {
  RoadMapCardProps,
  ShareMapCardProps,
  QuestCardProps,
} from '@/types/type';
import { RoadmapItem, QuestItem } from '@/types/search';
import LoadingSpinner from '../common/LoadingSpener';

export default function SearchResultSection() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category');
  const [roadmaps, setRoadmaps] = useState<RoadMapCardProps[]>([]);
  const [sharemaps, setSharemaps] = useState<ShareMapCardProps[]>([]);
  const [quests, setQuests] = useState<QuestCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [personalRes, sharedRes, questRes] = await Promise.all([
          axiosInstance.get<{ roadmaps: RoadmapItem[] }>('/roadmaps/personal'),
          axiosInstance.get<{ roadmaps: RoadmapItem[] }>('/roadmaps/shared'),
          axiosInstance.get<{ quests: QuestItem[] }>('/quests'),
        ]);

        const matchedPersonal = personalRes.data.roadmaps
          .filter((r) => {
            return (
              r.title.includes(query) ||
              r.hashtags?.some((h) => h.name.includes(query))
            );
          })
          .map(
            (r): RoadMapCardProps => ({
              id: r.id,
              title: r.title,
              mapImageUrl: r.thumbnail ?? '/map.png',
              category: r.category.name,
              description: r.description,
              hashtags: r.hashtags.map((h) => `#${h.name}`),
              profileImgUrl:
                r.member.profileImage ?? '/assets/defaultProfile.png',
              author: r.member.nickname,
              viewCount: r.viewCount,
              shareCount: r.citationCount,
            })
          );

        const matchedShared: ShareMapCardProps[] = await Promise.all(
          sharedRes.data.roadmaps
            .filter((r) => {
              return (
                r.title.includes(query) ||
                r.hashtags?.some((h) => h.name.includes(query))
              );
            })
            .map(async (r) => {
              const common = {
                id: r.id,
                title: r.title,
                mapImageUrl: r.thumbnail ?? '/map.png',
              };

              try {
                const editorsRes = await axiosInstance.get(
                  `/roadmaps/${r.id}/editors`
                );
                const participants =
                  typeof editorsRes.data?.count === 'number'
                    ? editorsRes.data.count
                    : 0;

                return {
                  ...common,
                  isEvent: false,
                  participants,
                  category: r.category?.name ?? '',
                };
              } catch (error) {
                console.error(
                  `Failed to fetch editors for roadmap ${r.id}`,
                  error
                );
                return {
                  ...common,
                  isEvent: false,
                  participants: 0,
                  category: r.category?.name ?? '',
                };
              }
            })
        );
        const matchedQuests = questRes.data.quests
          .filter((q) => q.title.includes(query))
          .map(
            (q): QuestCardProps => ({
              id: q.id,
              isInProgress: q.isActive,
              mapImageUrl: q.questImage ?? '/map.png',
              title: q.title,
              description: q.description,
              profileImgUrl:
                q.member.profileImage ?? '/assets/defaultProfile.png',
              author: q.member.nickname,
              deadLine: q.createdAt.slice(0, 10).replace(/-/g, '.'),
            })
          );

        setRoadmaps(matchedPersonal);
        setSharemaps(matchedShared);
        setQuests(matchedQuests);
      } catch (err) {
        console.error('검색 결과 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-[1100px] m-auto pt-13">
      {(category === null || category === 'roadmap') && (
        <SearchCategoryGroup
          title="로드맵"
          cardType="roadmap"
          items={roadmaps}
          query={query}
          category={''}
        />
      )}
      {(category === null || category === 'sharemap') && (
        <SearchCategoryGroup
          title="공유지도"
          cardType="sharemap"
          items={sharemaps}
          query={query}
          category={''}
        />
      )}
      {(category === null || category === 'quest') && (
        <SearchCategoryGroup
          title="퀘스트"
          cardType="quest"
          items={quests}
          query={query}
          category={''}
        />
      )}
    </div>
  );
}
