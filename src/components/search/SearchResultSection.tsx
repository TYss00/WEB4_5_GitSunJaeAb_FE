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
        const [roadmapRes, questRes] = await Promise.all([
          axiosInstance.get<{ roadmaps: RoadmapItem[] }>('/roadmaps'),
          axiosInstance.get<{ quests: QuestItem[] }>('/quests'),
        ]);

        const allRoadmaps = roadmapRes.data.roadmaps;

        const matchedRoadmaps = allRoadmaps.filter((r) => {
          return (
            r.title.includes(query) ||
            r.hashtags?.some((h) => h.name.includes(query))
          );
        });

        const personal: RoadMapCardProps[] = [];
        const shared: ShareMapCardProps[] = [];

        matchedRoadmaps.forEach((r) => {
          const common = {
            title: r.title,
            mapImageUrl: r.thumbnail ?? '/default-thumbnail.jpg',
          };

          if (r.roadmapType === 'PERSONAL') {
            personal.push({
              id: r.id,
              ...common,
              category: r.category.name,
              description: r.description,
              hashtags: r.hashtags.map((h) => `#${h.name}`),
              profileImgUrl: r.member.profileImage ?? '/default-profile.jpg',
              author: r.member.nickname,
              viewCount: r.viewCount,
              shareCount: r.citationCount,
            });
          } else if (r.roadmapType === 'SHARED') {
            shared.push({
              id: r.id,
              ...common,
              isEvent: false,
              participants: r.likeCount,
            });
          }
        });

        setRoadmaps(personal);
        setSharemaps(shared);

        const matchedQuests = questRes.data.quests
          .filter((q) => q.title.includes(query))
          .map((q) => ({
            id: q.id,
            isInProgress: q.isActive,
            mapImageUrl: q.questImage ?? '/default-thumbnail.jpg',
            title: q.title,
            description: q.description,
            hashtags: [],
            profileImgUrl: q.member.profileImage ?? '/default-profile.jpg',
            author: q.member.nickname,
            deadLine: q.createdAt.slice(0, 10).replace(/-/g, '.'),
          }));

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
      <p className="text-center text-lg text-[var(--gray-300)]">
        검색 중입니다...
      </p>
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
        />
      )}
      {(category === null || category === 'sharemap') && (
        <SearchCategoryGroup
          title="공유지도"
          cardType="sharemap"
          items={sharemaps}
          query={query}
        />
      )}
      {(category === null || category === 'quest') && (
        <SearchCategoryGroup
          title="퀘스트"
          cardType="quest"
          items={quests}
          query={query}
        />
      )}
    </div>
  );
}
