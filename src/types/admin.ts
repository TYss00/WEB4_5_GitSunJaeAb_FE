export type Roadmap = {
  id: number;
  title: string;
  member: {
    nickname: string;
  };
  editorCount: number; // 참여자수
};

export type CustomMarker = {
  id: number;
  name: string;
  markerImage: string;
};

export type ReportModal = {
  isOpen: boolean;
  onClose: () => void;
  reportId: number | null;
  contentType: '지도' | '퀘스트' | '마커' | null;
};

export type ReportStatus = 'REPORTED' | 'RESOLVED';

export type Member = {
  id: number;
  name: string;
  nickname: string;
  email: string;
  profileImage: string | null;
};

export type Category = {
  id: number;
  name: string;
  categoryImage: string;
  description: string;
  createdAt: string;
};

export type Report = {
  id: number;
  reporter: Member;
  reportedMember: Member;
  description: string;
  roadmap: number | null;
  marker: number | null;
  quest: number | null;
  status: ReportStatus;
  createdAt: string;
  resolvedAt: string | null;
};

export type ReportResponse = {
  code: string;
  message: string;
  timestamp: string;
  reportSimpleDTOS: Report[];
};

export type DisplayReport = {
  id: number;
  reported: string;
  reporter: string;
  type: string;
  date: string;
  status: '대기' | '완료';
  contentType: '지도' | '퀘스트' | '마커';
  roadmap: number | null;
  marker: number | null;
  quest: number | null;
};

export type User = {
  id: number;
  name: string;
  nickname: string;
  email: string;
  role: 'ROLE_ADMIN' | 'ROLE_USER';
  blacklisted: boolean;
};

export type UserResponse = {
  code: string;
  message: string;
  timestamp: string;
  members: User[];
};

export interface ManageCardProps<T extends { id: number }> {
  id?: number;
  name: string;
  image?: string | null;
  type?: 'category' | 'marker';
  item: T;
  description?: string;
  onEditClick?: (item: T) => void;
  onEditSubmit?: (updatedItem: {
    id: number;
    name: string;
    image: File | null;
    description: string;
  }) => void;
  onDelete?: (item: T) => void;
}

export type ManageCardFormProps = {
  name: string;
  image: File | null;
  onNameChange: (name: string) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export type UserActionButton = {
  user: User;
  selectedTab: string;
  loadingUserId: number | null;
  onToggleBlacklist: (id: number) => void;
  onToggleAdminRole: (id: number, role: string) => void;
  onDeleteMember: (id: number) => void;
};

export type ManageAddCardProps = {
  type?: 'category' | 'marker';
  onClick?: () => void;
};

export type Notice = {
  announcementType: string;
  id: number;
  title: string;
  content: string;
  createdAt: string;
  member: {
    id: number;
    name: string;
    nickname: string;
    email: string;
    profileImage: string;
  };
};

export type AdminNoticePayload = {
  title: string;
  content: string;
  announcementType: 'SYSTEM' | 'EVENT' | 'UPDATE' | 'ETC';
};

export type AdminNoticeProps = {
  onClose: () => void;
  initialData?: {
    id: number;
    type?: '시스템' | '이벤트' | '업데이트' | '안내사항';
    title: string;
    content: string;
  };
  onSubmit: (payload: AdminNoticePayload, id?: number) => Promise<void>;
};

export type ManageCardModalProps<T> = {
  name: string;
  image?: string | null;
  description?: string;
  item: T;
  onClose: () => void;
  onEditSubmit?: (updatedItem: {
    id: number;
    name: string;
    image: File | null;
    description: string;
  }) => Promise<void>;
  onDelete?: (item: T) => void;
};
