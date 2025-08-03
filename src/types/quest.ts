import { SubmissionInfo } from './type';

export type SubmissionRaw = {
  title: string;
  description: string;
  profileImage: string;
  imageUrl: string;
  nickname: string;
  submittedAt: string;
  isRecognized: boolean;
};

export type MemberQuest = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  member: {
    id?: number;
    nickname: string;
  };
  createdAt?: string;
  isActive?: boolean;
};

export type QuestPlayListProps = {
  submission: SubmissionInfo[];
  onSelect: (answer: SubmissionInfo) => void;
  onFormOpen: () => void;
  questIsActive: boolean;
  questAuthorId: number;
};

export type QuestPlayViewProps = {
  submission: SubmissionInfo;
  onBack: () => void;
  onJudge: (id: number, isRecognized: boolean) => void;
  questAuthorId: number;
};

export type QuestPlayFormProps = {
  onBack: () => void;
};
