'use client';

import { CommentInfo } from '@/types/type';
import Image from 'next/image';

export default function CommentItem({
  commentInfo,
}: {
  commentInfo: CommentInfo;
}) {
  return (
    <>
      <li className="flex flex-col gap-2 py-2">
        <div className="flex items-center gap-2">
          {/* 프로필이미지 */}
          <div className="relative size-[34px] bg-gray-500 rounded-full">
            <Image
              src={
                commentInfo.member.profileImage ?? '/assets/defaultProfile.png'
              }
              alt="댓글 작성자 프로필 이미지"
              fill
              className="object-cover rounded-full"
            />
          </div>
          {/* 작성자 + 작성일 */}
          <div className="w-full">
            <div className="flex w-full justify-between">
              <h4 className="text-[15px] font-medium">
                {commentInfo.member.nickname}
              </h4>
            </div>
            <p className="text-xs text-[var(--gray-200)]">
              {commentInfo.createdAt.slice(0, 10)}
            </p>
          </div>
        </div>
        <p className="text-sm px-1.5">{commentInfo.content}</p>
      </li>
    </>
  );
}
