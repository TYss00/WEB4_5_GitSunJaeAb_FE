import { CommentInfo } from '@/types/type';
import CommentItem from './CommentItem';

type Props = {
  author?:number
  comments: CommentInfo[];
  onDelete?: (id: number) => void;
  onUpdate?: (updated: CommentInfo) => void;
};

export default function CommentList({ author, comments, onDelete, onUpdate }: Props) {
  return (
    <ul className="divide-y divide-[var(--gray-100)] max-h-[240px] overflow-y-auto">
      {comments.map((comment: CommentInfo) => {
        return (
          <CommentItem
            key={comment.id}
            author={author}
            commentInfo={comment}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
    </ul>
  );
}
