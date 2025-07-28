'use client';

import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { ManageCardFormProps } from '@/types/admin';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ManageCardFormCard({
  name,
  image,
  onNameChange,
  onImageChange,
  onSubmit,
  onCancel,
}: ManageCardFormProps) {
  return (
    <div className="w-[100px] h-[126px] p-2 rounded-md overflow-hidden border border-dashed border-[var(--gray-300)] bg-[var(--white)] flex flex-col justify-between">
      <div className="w-full h-[100px] flex items-center justify-center bg-gray-100 relative">
        {image ? (
          <Image
            src={URL.createObjectURL(image)}
            alt="preview"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <label className="text-sm text-[var(--gray-100)] cursor-pointer">
            <input type="file" className="hidden" onChange={onImageChange} />
            <ImagePlus className="w-4 h-4 text-[var(--gray-200)] absolute left-1/2 top-1/2 -translate-1/2" />
          </label>
        )}
      </div>
      <Input
        placeholder="제목"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="text-sm py-[2px] placeholder:text-xs"
      />
      <div className="flex justify-between mt-1 gap-1">
        <Button
          buttonStyle="smGreen"
          className="text-[12px] py-[2px] px-[8px] h-[24px] w-full"
          onClick={onSubmit}
        >
          등록
        </Button>
        <Button
          buttonStyle="white"
          className="text-[12px] py-[2px] px-[8px] h-[24px] w-full"
          onClick={onCancel}
        >
          취소
        </Button>
      </div>
    </div>
  );
}
