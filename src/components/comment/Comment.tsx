'use client';

import { CommentInfo } from '@/types/type';
import CommentCount from './CommentCount';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useState } from 'react';

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
  const [comments, setComments] = useState<CommentInfo[]>(commentsInfo);

  //새 댓글 추가 핸들러
  const handleAddComment = (newComment: CommentInfo) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div
      className={`${paddingClass} w-full h-full flex flex-col justify-between`}
    >
      <div>
        <CommentCount count={comments?.length ?? 0} />
        <CommentList comments={comments ?? []} />
      </div>
      <CommentForm variant={variant} onAddComment={handleAddComment} />
    </div>
  );
}
