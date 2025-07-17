'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, PencilLine } from 'lucide-react';
import PasswordInput from '@/components/ui/PasswrodInput';

export default function ProfileTab() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [username, setUsername] = useState('사용자 이름');
  const [isEditingName, setIsEditingName] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingName(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full px-2 pb-6">
      <div className="flex flex-col items-center gap-6">
        {/* 프로필 이미지 */}
        <div className="flex flex-col gap-[10px] items-center">
          <div
            className="rounded-full size-[140px] bg-[var(--gray-200)] overflow-hidden relative cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="profile"
                fill
                className="object-cover rounded-full"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <ImagePlus className="text-[var(--gray-300)] absolute left-1/2 top-1/2 -translate-1/2" />
            )}
          </div>
          <span
            className="text-[13px] text-[var(--primary-300)] cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            사진 변경
          </span>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* 이름 */}
        <div className="flex gap-[5px] items-center">
          {isEditingName ? (
            <input
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleNameKeyDown}
              onBlur={() => setIsEditingName(false)}
              className="text-[20px] font-semibold border-b border-[var(--gray-100)] outline-none"
            />
          ) : (
            <>
              <span className="text-[20px] font-semibold">{username}</span>
              <PencilLine
                size={18}
                color="var(--gray-100)"
                className="cursor-pointer"
                onClick={() => setIsEditingName(true)}
              />
            </>
          )}
        </div>

        {/* 비밀번호 변경 */}
        <div className="w-full flex flex-col gap-4 mt-2">
          <PasswordInput
            label="현재 비밀번호"
            placeholder="비밀번호를 입력하세요"
          />
          <PasswordInput
            label="새 비밀번호"
            placeholder="새 비밀번호를 입력하세요"
          />
          <PasswordInput
            label="새 비밀번호 확인"
            placeholder="새 비밀번호를 다시 입력하세요"
          />
        </div>
      </div>

      {/* 회원탈퇴 */}
      <div className="w-full text-center mt-10">
        <button
          className="text-sm text-[var(--red)] underline underline-offset-2 cursor-pointer"
          onClick={() => alert('회원탈퇴 기능은 아직 구현되지 않았습니다.')}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}
