export type ProfileMember = {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  loginType?: string;
  provider?: string;
  role?: string;
  status?: string;
  nickname: string;
  profileImage: string | null;
  blacklisted?: boolean;
  memberInterests?: MemberInterest[];
};

export type Category = {
  id: number;
  name: string;
};

export type MemberInterest = {
  id: number;
  createdAt: string;
  categories: Category[];
};

export type useProfileStores = {
  member: ProfileMember | null;
  fetchMember: () => Promise<void>;
  reset: () => void;
};

export type RoadmapResponse = {
  id: number;
  title: string;
  description?: string;
  bookmarkId?: number | null;
  isBookmarked?: boolean;
  thumbnail: string | null;
  roadmapType: 'SHARED' | 'PERSONAL';
  isPublic?: boolean;
  member?: ProfileMember;
  isLiked?: boolean;
  createdAt?: string;
  likeId?: number | null;
  category?: {
    name: string;
  };
  hashtags?: { name: string }[];
  viewCount?: number;
  citationCount?: number;
};

export type Layer = {
  id: number;
  name: string;
  member: {
    id: number;
    nickname: string;
  };
  roadmap: {
    id: number;
    title: string;
  } | null;
  forkHistories: {
    forkedRoadmap: {
      title: string;
    };
  }[];
};

export type LayerWithTitle = Layer & {
  roadmapTitle?: string;
};

export type MypageCardProps = {
  id: number;
  title: string;
  date: string;
  author?: string;
  profileImgUrl?: string;
  type: '공개' | '비공개' | '퀘스트' | '공유';
  mapImageUrl: string;
  isLiked?: boolean;
};

export type MypagePostProps = {
  activeTab: '작성글' | '참여글' | '좋아요글';
  searchKeyword: string;
};

export type ProfileEditState = {
  nickname: string;
  profileImage: string | File | null;

  password: string;
  newPassword: string;
  confirmPassword: string;

  selectedCategoryIds: number[];
  setSelectedCategoryIds: (ids: number[]) => void;

  setNickname: (nickname: string) => void;
  setProfileImage: (image: string | File | null) => void;

  setPassword: (v: string) => void;
  setNewPassword: (v: string) => void;
  setConfirmPassword: (v: string) => void;

  reset: () => void;
};

export type Achievement = {
  id: number;
  name: string;
  image: string | null;
  description?: string;
  achievedAt?: string;
};

export type CommentItem = {
  id: number;
  content: string;
  roadmap: number | null;
  quest: number | null;
  postTitle: string;
  createdAt: string;
};

export type MemberQuest = {
  id: number;
  quest: number;
  title: string;
  questImage: string;
  description: string;
  deadline: string;
  isActive: boolean;
  createdAt: string;
  completedAt?: string | null;
  submitAt?: string | null;
  imageUrl?: string | null;
  member: {
    id: number;
    nickname: string;
    profileImage: string | null;
  };
  deletedAt: string | null;
};

export type ParticipatedItem = {
  type: '퀘스트' | '공유로드맵';
  id: number;
  date: string;
  data: MemberQuest | RoadmapResponse;
};

export type AchievementState = {
  allAchievements: Achievement[];
  achievedIds: number[];
  setAchievements: (achievements: Achievement[]) => void;
  setAchievedIds: (ids: number[]) => void;
};
