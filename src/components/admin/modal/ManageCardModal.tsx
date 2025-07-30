'use client';

import Image from 'next/image';
import { XCircle, Folder, FileText, ImagePlus } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ChangeEvent, useRef, useState } from 'react';
import { ManageCardModalProps } from '@/types/admin';

export default function ManageCardModal<T extends { id: number }>({
  name,
  image,
  description,
  item,
  onClose,
  onEditSubmit,
  onDelete,
}: ManageCardModalProps<T>) {
  const [editedName, setEditedName] = useState(name);
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [editedDescription, setEditedDescription] = useState(description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isAddMode = item.id === 0;

  const handleSubmit = async () => {
    if (!onEditSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onEditSubmit({
        id: item.id,
        name: editedName,
        image: editedImage,
        description: editedDescription,
      });
      onClose();
    } catch (err) {
      console.error('제출 실패:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex justify-center items-center px-4">
      <div className="relative w-full h-full max-w-[500px] max-h-[700px] bg-[var(--gray-40)] rounded-xl shadow-2xl overflow-y-auto animate-scale-up">
        <div className="flex justify-center">
          <p className="w-[165px] text-3xl text-[var(--primary-300)] font-bold border-b-2 border-[var(--primary-300)] mt-10">
            카테고리 설정
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black transition-transform hover:scale-110"
        >
          <XCircle size={28} />
        </button>
        <div className="w-[400px] mx-auto p-6 flex flex-col items-center justify-center text-center gap-6 bg-white mt-10">
          <div
            className="relative w-[300px] h-[300px] rounded-md overflow-hidden bg-gray-100 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src={
                editedImage
                  ? URL.createObjectURL(editedImage)
                  : image || '/assets/steak.jpg'
              }
              alt="카테고리 이미지"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition">
              <ImagePlus size={32} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.[0]) setEditedImage(e.target.files[0]);
              }}
            />
          </div>

          {/* 이름 */}
          <div className="w-full border-t pt-4">
            <div className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-2">
              <Folder size={20} /> 카테고리 이름
            </div>
            <input
              className="w-full border px-3 py-1 rounded text-sm text-gray-700
             focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>

          {/* 설명 */}
          <div className="w-full border-t pt-4 pb-2">
            <div className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-2">
              <FileText size={20} /> 카테고리 설명
            </div>
            <textarea
              className="w-full border px-3 py-1 rounded text-sm text-gray-700 resize-none h-24
             focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="설명을 입력하세요"
            />
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-center gap-3 pt-6 pb-8">
          {onEditSubmit && (
            <Button
              buttonStyle="smGreen"
              className="w-30"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isAddMode ? '추가' : '수정'}
            </Button>
          )}
          {!isAddMode && onDelete && (
            <Button
              buttonStyle="white"
              className="w-30"
              disabled={isSubmitting}
              onClick={handleDelete}
            >
              삭제
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
