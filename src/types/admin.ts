export type ReportModal = {
  isOpen: boolean;
  onClose: () => void;
  reportId: number | null;
  contentType: '지도' | '퀘스트' | null;
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
  reports: Report[];
};

export type DisplayReport = {
  id: number;
  reported: string;
  reporter: string;
  type: string;
  date: string;
  status: '대기' | '완료';
  contentType: '지도' | '퀘스트';
  roadmap: number | null;
  marker: number | null;
  quest: number | null;
};

export type User = {
  id: number;
  name: string;
  nickname: string;
  email: string;
  role: string;
  blacklisted: boolean;
};

export type UserResponse = {
  code: string;
  message: string;
  timestamp: string;
  members: User[];
};

export type CategoryCardProps = {
  category: Category;
  isEditing: boolean;
  onEditClick: (category: Category) => void;
  onComplete: (id: number) => void;
  editedCategory: {
    name: string;
    image: File | null;
  };
  setEditedCategory: (category: { name: string; image: File | null }) => void;
  handleEditImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditSubmit: (id: number) => void;
  cancelEdit: () => void;
};
