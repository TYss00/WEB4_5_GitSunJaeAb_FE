import { CommentInfo } from '@/types/type';
import CommentCount from './CommentCount';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

type Props = {
  commentsInfo: CommentInfo[];
  variant?: 'roadmap' | 'sharemap' | 'quest';
};

const paddingMap = {
  roadmap: 'px-0',
  sharemap: 'px-4',
  quest: 'px-4',
};

export default function Comment({ commentsInfo, variant = 'sharemap' }: Props) {
  const paddingClass = paddingMap[variant];
  return (
    <div
      className={`${paddingClass} w-full h-full flex flex-col justify-between`}
    >
      <div>
        <CommentCount count={commentsInfo?.length ?? 0} />
        <CommentList commentsInfo={commentsInfo ?? []} />
      </div>
      <CommentForm />
    </div>
  );
}
