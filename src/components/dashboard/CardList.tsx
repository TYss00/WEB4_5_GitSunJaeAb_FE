'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import axiosInstance from '@/libs/axios';
import RoadMapCard from '../ui/card/RoadMapCard';
import QuestCard from '../ui/card/QuestCard';
import { CardListProps } from '@/types/type';
import { RoadmapResponse, MemberQuest } from '@/types/myprofile';
import SkeletonCard from './skeleton/SkeletonCard';

export default function CardList({ type }: CardListProps) {
  const [sort, setSort] = useState<'recent' | 'popular'>('recent');
  const [roadmaps, setRoadmaps] = useState<RoadmapResponse[]>([]);
  const [quests, setQuests] = useState<MemberQuest[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (type === 'roadmap') {
          const res = await axiosInstance.get('/roadmaps/personal');
          const data: RoadmapResponse[] = res.data.roadmaps;

          const sorted =
            sort === 'popular'
              ? [...data].sort(
                  (a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0)
                )
              : [...data].sort((a, b) => {
                  return (
                    new Date(b.createdAt ?? '').getTime() -
                    new Date(a.createdAt ?? '').getTime()
                  );
                });

          setRoadmaps(sorted);
        } else if (type === 'quest') {
          const res = await axiosInstance.get('/quests');
          const rawQuests: MemberQuest[] = res.data.quests;

          if (sort === 'popular') {
            const questsWithViews = await Promise.all(
              rawQuests.map(async (quest) => {
                const detail = await axiosInstance.get(`/quests/${quest.id}`);
                return {
                  ...quest,
                  viewCount: detail.data.viewCount ?? 0,
                };
              })
            );

            const sorted = questsWithViews.sort(
              (a, b) => b.viewCount - a.viewCount
            );
            setQuests(sorted);
          } else {
            const sorted = rawQuests.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            setQuests(sorted);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, sort]);

  useEffect(() => {
    if (type === 'roadmap') {
      const uniqueCategories = Array.from(
        new Set(
          roadmaps
            .map((r) => r.category?.name)
            .filter((name): name is string => !!name)
        )
      );
      setCategories(uniqueCategories);
    }
  }, [type, roadmaps]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const filteredRoadmaps =
    selectedFilter === '전체'
      ? roadmaps
      : roadmaps.filter((roadmap) => roadmap.category?.name === selectedFilter);

  const filteredQuests =
    selectedFilter === '전체'
      ? quests
      : quests.filter((quest) => {
          const isInProgress =
            quest.isActive && new Date(quest.deadline) > new Date();
          return selectedFilter === '진행중' ? isInProgress : !isInProgress;
        });

  return (
    <section className="w-full max-w-[1100px] mx-auto mt-[146px] px-4 pb-[186px]">
      <div className="flex justify-between items-center mb-[27px]">
        <div className="relative w-[190px]">
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="w-full border border-[#E4E4E4] rounded-[5px] px-[12px] py-[10px] text-[16px] appearance-none"
          >
            {type === 'quest' ? (
              <>
                <option>전체</option>
                <option>진행중</option>
                <option>마감</option>
              </>
            ) : (
              <>
                <option>전체</option>
                {categories.map((cat, idx) => (
                  <option key={idx}>{cat}</option>
                ))}
              </>
            )}
          </select>
          <ChevronDown
            className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none text-[#000000]"
            size={24}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSort('recent')}
            className={`px-4 py-2 text-[18px] font-bold ${
              sort === 'recent' ? ' text-[#005C54]' : 'text-[#9F9F9F]'
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setSort('popular')}
            className={`px-4 py-2 text-[18px] font-bold ${
              sort === 'popular' ? 'text-[#005C54]' : 'text-[#9F9F9F]'
            }`}
          >
            인기순
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[31px]">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : type === 'roadmap'
          ? filteredRoadmaps.map((roadmap) => (
              <div key={roadmap.id} className="cursor-pointer">
                <RoadMapCard
                  id={roadmap.id}
                  category={roadmap.category?.name ?? '카테고리 없음'}
                  title={roadmap.title}
                  description={roadmap.description ?? ''}
                  hashtags={roadmap.hashtags?.map((h) => h.name).sort() ?? []}
                  mapImageUrl={roadmap.thumbnail ?? '/map.png'}
                  profileImgUrl={
                    roadmap.member?.profileImage ?? '/assets/defaultProfile.png'
                  }
                  author={roadmap.member?.nickname ?? '알 수 없음'}
                  viewCount={roadmap.viewCount ?? 0}
                  shareCount={roadmap.citationCount ?? 0}
                  isBookmarked={roadmap.isBookmarked ?? false}
                  bookmarkId={roadmap.bookmarkId ?? null}
                />
              </div>
            ))
          : filteredQuests.map((quest) => (
              <div key={quest.id} className="cursor-pointer">
                <QuestCard
                  id={quest.id}
                  isInProgress={
                    quest.isActive && new Date(quest.deadline) > new Date()
                  }
                  mapImageUrl={quest.questImage}
                  title={quest.title}
                  description={quest.description}
                  profileImgUrl={
                    quest.member.profileImage ?? '/assets/defaultProfile.png'
                  }
                  author={quest.member.nickname}
                  deadLine={quest.createdAt?.split('T')[0]}
                />
              </div>
            ))}
      </div>
    </section>
  );
}
