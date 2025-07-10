import CommentCount from './CommentCount';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

type Props = {
  postId: string;
  variant?: 'roadmap' | 'sharemap' | 'quest';
};

const paddingMap = {
  roadmap: 'px-0',
  sharemap: 'px-4',
  quest: 'px-4',
};

export default function Comment({ postId, variant = 'sharemap' }: Props) {
  const paddingClass = paddingMap[variant];
  return (
    <div className={`${paddingClass} w-full`}>
      <CommentCount postId={postId} />
      <CommentList postId={postId} />
      <CommentForm />
    </div>
  );
}
