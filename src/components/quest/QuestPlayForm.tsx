'use client';
import { ChevronLeft, ImagePlus } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import axiosInstance from '@/libs/axios';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

type Props = {
  onBack: () => void;
};

export default function QuestPlayForm({ onBack }: Props) {
  const params = useParams();
  const questId = params?.id as string;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert('이미지를 업로드해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('imageFile', imageFile);

    const requestPayload = {

      questId: Number(questId),
      title,
      description,
      answer: '',
    };


    formData.append(
      'request',
      new Blob([JSON.stringify(requestPayload)], {
        type: 'application/json',
      })
    );

    try {

      await axiosInstance.post(`/quests/${questId}/memberQuest`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('퀘스트 참여가 완료되었습니다.');
      onBack();
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  return (
    <div className="w-full border border-[var(--gray-200)] rounded-[10px] p-4">
      {/* 뒤로가기 */}
      <button
        onClick={onBack}
        className="flex items-center text-[var(--primary-300)] cursor-pointer"
      >
        <ChevronLeft size={18} />
        뒤로가기
      </button>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* 이미지 등록 */}
        <div
          onClick={handleImageClick}
          className="w-full aspect-[16/9] bg-[var(--gray-50)] relative cursor-pointer
                rounded-[10px] border-2 border-dotted border-[var(--gray-200)]"
        >
          {previewImage ? (
            <Image
              src={previewImage}
              alt="미리보기"
              fill
              className="object-cover"
            />
          ) : (
            <ImagePlus className="text-[var(--gray-200)] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="mt-4">
          {/* 제목 입력 */}
          <h4>제목</h4>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          {/* 내용 입력 */}
          <h4 className="mt-4">내용</h4>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mt-4 flex gap-4 justify-center">
          <Button
            buttonStyle="white"
            className="px-10 h-[42px] rounded-[8px] cursor-pointer"
            onClick={onBack}
          >
            취소
          </Button>
          <Button className="px-10 cursor-pointer" type="submit">
            등록
          </Button>
        </div>
      </form>
    </div>
  );
}
