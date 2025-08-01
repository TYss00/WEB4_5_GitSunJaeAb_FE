import { CommentInfo } from './type';

export type CommentProps = {
  commentsInfo: CommentInfo[];
  variant?: 'roadmap' | 'sharemap' | 'quest';
};

export type CommentListProps = {
  comments: CommentInfo[];
  onDelete?: (id: number) => void;
  onUpdate?: (updated: CommentInfo) => void;
};
