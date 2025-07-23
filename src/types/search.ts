import { QuestCardProps, RoadMapCardProps, ShareMapCardProps } from './type';

export type QuestResponse = {
  code: string;
  message: string;
  timestamp: string;
  quests: QuestItem[];
};

export type RoadmapResponse = {
  code: string;
  message: string;
  timestamp: string;
  roadmaps: RoadmapItem[];
};

export type RoadmapItem = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  isPublic: boolean;
  roadmapType: 'PERSONAL' | 'SHARED';
  likeCount: number;
  viewCount: number;
  citationCount: number;
  createdAt: string;
  member: {
    id: number;
    nickname: string;
    profileImage: string | null;
  };
  category: {
    id: number;
    name: string;
  };
  hashtags: {
    id: number;
    name: string;
  }[];
};

export type QuestItem = {
  id: number;
  title: string;
  description: string;
  questImage: string;
  isActive: boolean;
  createdAt: string;
  member: {
    id: number;
    nickname: string;
    profileImage: string | null;
  };
};

export type Member = {
  id: number;
  name: string;
  nickname: string;
  email: string;
  profileImage: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Hashtag = {
  id: number;
  name: string;
};

export type SearchCategoryGroupProps = {
  title: string;
  cardType: 'sharemap' | 'roadmap' | 'quest';
  items: ShareMapCardProps[] | RoadMapCardProps[] | QuestCardProps[];
  query: string;
};
