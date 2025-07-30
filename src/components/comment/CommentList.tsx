import { CommentInfo } from '@/types/type';
import CommentItem from './CommentItem';

type Props = {
  comments: CommentInfo[];
  onDelete?: (id: number) => void;
  onUpdate?: (updated: CommentInfo) => void;
};

export default function CommentList({ comments, onDelete, onUpdate }: Props) {
  return (
    <ul className="divide-y divide-[var(--gray-100)] max-h-[240px] overflow-y-auto">
      {comments.map((comment: CommentInfo) => {
        return (
          <CommentItem
            key={comment.id}
            commentInfo={comment}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
    </ul>
  );
}
