import { CommentInfo } from '@/types/type';
import CommentItem from './CommentItem';
import { CommentListProps } from '@/types/comment';

export default function CommentList({
  comments,
  onDelete,
  onUpdate,
}: CommentListProps) {
  return (
    <ul className="divide-y divide-[var(--gray-100)] max-h-[480px] overflow-y-auto">
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
