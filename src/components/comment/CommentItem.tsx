'use client';

import axiosInstance from '@/libs/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { CommentInfo } from '@/types/type';
import { EllipsisVertical, PencilLine, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import ConfirmModal from '../common/modal/ConfirmModal';

export default function CommentItem({
  commentInfo,
}: {
  commentInfo: CommentInfo;
}) {
  const currentUserId = useAuthStore((state) => state.user?.id);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // ✅ 수정 UI 관련
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(commentInfo.content);

  // ✅ 댓글 수정 API
  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/comments/${commentInfo.id}`, {
        content: editContent,
      });
      setIsEditing(false);
      // TODO: 필요시 목록 갱신 or 로컬 상태 업데이트
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  // ✅ 댓글 삭제 API
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/comments/${commentInfo.id}`);
      // TODO: 필요시 목록 갱신 or 로컬 상태 업데이트
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('삭제 권한이 없거나 실패했습니다.');
    } finally {
      setIsDeleteOpen(false);
    }
  };

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
              {currentUserId === commentInfo.member.id && (
                <div className="relative" ref={dropdownRef}>
                  <EllipsisVertical
                    size={16}
                    className="cursor-pointer"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                  />
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow z-50">
                      <div
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsEditing(true); // ✅ 수정모드 진입
                          setEditContent(commentInfo.content); // ✅ 기존 댓글 내용 세팅
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                      >
                        <PencilLine size={18} />
                        수정하기
                      </div>
                      <div className="border-t border-gray-200 mx-2" />
                      <div
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsDeleteOpen(true); // ✅ 삭제 모달 열기
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-500 cursor-pointer"
                      >
                        <Trash2 size={18} />
                        삭제하기
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-[var(--gray-200)]">
              {commentInfo.createdAt.slice(0, 10)}
            </p>
          </div>
        </div>

        {/* ✅ 댓글 내용 or 수정 UI */}
        {isEditing ? (
          <div className="mt-1 px-1.5">
            <textarea
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm resize-none"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="mt-1 flex gap-2 text-sm">
              <button
                onClick={handleUpdate}
                className="text-blue-600 font-semibold"
              >
                저장
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm px-1.5">{commentInfo.content}</p>
        )}
      </li>

      {/* ✅ 삭제 확인 모달 */}
      {isDeleteOpen && (
        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onDelete={handleDelete}
          confirmType="comment"
        />
      )}
    </>
  );
}
