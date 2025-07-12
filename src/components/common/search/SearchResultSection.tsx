'use client';

import {
  QuestCardProps,
  RoadMapCardProps,
  ShareMapCardProps,
} from '@/types/type';
import SearchCategoryGroup from './SearchCategoryGroup';
import { useSearchParams } from 'next/navigation';

// 더미 데이터
const dummyRoadmaps: RoadMapCardProps[] = [
  {
    category: '여행',
    mapImageUrl: '/maps/jeju-travel.png',
    title: '제주도 3박 4일 여행 로드맵',
    description: '제주의 자연과 맛집을 중심으로 한 여행 코스',
    hashtags: ['#제주도', '#맛집투어', '#자연힐링'],
    profileImgUrl: '/profiles/user1.jpg',
    author: '여행자몽',
    viewCount: 1240,
    shareCount: 320,
  },
  {
    category: '역사',
    mapImageUrl: '/maps/seoul-history.png',
    title: '서울 근현대사 역사 로드맵',
    description: '경복궁부터 서대문형무소까지 서울 역사 명소 탐방',
    hashtags: ['#서울역사', '#근현대사', '#역사여행'],
    profileImgUrl: '/profiles/user2.jpg',
    author: '역사박사',
    viewCount: 890,
    shareCount: 210,
  },
  {
    category: '러닝',
    mapImageUrl: '/maps/frontend-roadmap.png',
    title: '프론트엔드 개발자 로드맵',
    description: 'HTML부터 React까지 단계별 학습 로드맵',
    hashtags: ['#프론트엔드', '#React', '#개발자로드맵'],
    profileImgUrl: '/profiles/user3.jpg',
    author: '개발하는정우',
    viewCount: 2300,
    shareCount: 540,
  },
];

// 데이터 없을 경우 테스트
const dummySharemaps: ShareMapCardProps[] = [];
const dummyQuests: QuestCardProps[] = [
  {
    isInProgress: true,
    mapImageUrl: '/maps/museum-quest.png',
    title: '서울 박물관 챌린지',
    description: '서울에 위치한 주요 박물관 5곳을 모두 방문해보세요!',
    hashtags: ['#박물관투어', '#서울', '#문화탐방'],
    profileImgUrl: '/profiles/user4.jpg',
    author: '문화탐험가',
    deadLine: '2025.08.15',
  },
  {
    isInProgress: false,
    mapImageUrl: '/maps/mountain-hiking.png',
    title: '도봉산 등산 미션',
    description: '정상까지 오르며 경치와 인증샷을 남겨보세요.',
    hashtags: ['#등산', '#도봉산', '#트레킹'],
    profileImgUrl: '/profiles/user5.jpg',
    author: '산악인한결',
    deadLine: '2025.07.30',
  },
  {
    isInProgress: true,
    mapImageUrl: '/maps/cafe-hopping.png',
    title: '부산 카페 투어 챌린지',
    description: '부산 해운대 인근 감성 카페 6곳을 탐방하는 미션!',
    hashtags: ['#부산카페', '#카페투어', '#감성여행'],
    profileImgUrl: '/profiles/user6.jpg',
    author: '카페in부산',
    deadLine: '2025.08.05',
  },
];

export default function SearchResultSection() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const hasResults =
    dummyQuests.length > 0 ||
    dummyRoadmaps.length > 0 ||
    dummySharemaps.length > 0;

  return (
    <div className="w-[1100px] m-auto pt-10">
      {hasResults ? (
        <>
          {dummyRoadmaps.length > 0 && (
            <SearchCategoryGroup
              title="로드맵"
              cardType="roadmap"
              items={dummyRoadmaps}
            />
          )}
          {dummySharemaps.length > 0 && (
            <SearchCategoryGroup
              title="공유지도"
              cardType="sharemap"
              items={dummySharemaps}
            />
          )}
          {dummyQuests.length > 0 && (
            <SearchCategoryGroup
              title="퀘스트"
              cardType="quest"
              items={dummyQuests}
            />
          )}
        </>
      ) : (
        <p className="text-[var(--gray-200)] text-lg text-center">
          &lsquo;{query}&rsquo; 검색 결과가 없습니다
        </p>
      )}
    </div>
  );
}
