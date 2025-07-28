export type TrendingQuest = {
  id: number;
  title: string;
  questImage: string;
  createdAt: string;
  member: {
    nickname: string;
  };
};

export type RoadmapCategory = {
  id: number;
  name: string;
};

export type RoadmapMember = {
  id: number;
  name: string;
  nickname: string;
  email: string;
  profileImage: string | null;
};

export type RoadmapHashtag = {
  id: number;
  name: string;
};

export type RoadmapType = 'PERSONAL' | 'SHARED';

export type Roadmap = {
  id: number;
  category: RoadmapCategory;
  member: RoadmapMember;
  title: string;
  description: string;
  thumbnail: string | null;
  hashtags: RoadmapHashtag[];
  isPublic: boolean;
  roadmapType: RoadmapType;
  likeCount: number;
  viewCount: number;
  citationCount: number;
  createdAt: string;
  isBookmarked: boolean;
};

export type RoadmapResponse = {
  code: string;
  message: string;
  timestamp: string;
  roadmaps: Roadmap[];
};
