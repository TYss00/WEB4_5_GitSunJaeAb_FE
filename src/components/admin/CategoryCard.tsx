'use client';

import Image from 'next/image';
import Input from '../ui/Input';
import { ImagePlus, Pencil } from 'lucide-react';
import Button from '../ui/Button';
import { CategoryCardProps } from '@/types/admin';

export default function CategoryCard({
  category,
  isEditing,
  onEditClick,
  onComplete,
  editedCategory,
  setEditedCategory,
  handleEditImageChange,
  handleEditSubmit,
  cancelEdit,
}: CategoryCardProps) {
  return (
    <div className="w-[100px] h-[126px] rounded-md overflow-hidden border-1 border-black bg-[var(--white)] relative">
      {isEditing ? (
        <>
          <div className="w-full h-[100px] bg-gray-100 relative">
            {editedCategory.image ? (
              <Image
                src={URL.createObjectURL(editedCategory.image)}
                alt="preview"
                fill
                className="object-cover"
              />
            ) : (
              <label className="w-full h-full flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleEditImageChange}
                />
                <ImagePlus className="w-4 h-4 text-[var(--gray-200)]" />
              </label>
            )}
          </div>
          <Input
            value={editedCategory.name}
            onChange={(e) =>
              setEditedCategory({
                ...editedCategory,
                name: e.target.value,
              })
            }
            className="text-sm py-[2px] placeholder:text-xs"
          />
          <div className="flex justify-between mt-1 gap-1">
            <Button
              buttonStyle="smGreen"
              className="text-[12px] py-[2px] px-[8px] h-[24px]"
              onClick={() => handleEditSubmit(category.id)}
            >
              저장
            </Button>
            <Button
              buttonStyle="white"
              className="text-[12px] py-[2px] px-[8px] h-[24px]"
              onClick={cancelEdit}
            >
              취소
            </Button>
          </div>
        </>
      ) : (
        <>
          <Image
            src={category.categoryImage || '/assets/steak.jpg'}
            alt={category.name}
            width={100}
            height={100}
            className="w-full h-[100px] object-cover"
            priority
          />
          <p className="text-center py-[4px] text-[15px]">{category.name}</p>
          <div className="absolute top-1 right-1">
            <button
              className="bg-black rounded-full p-[4px] text-white hover:scale-110 transition cursor-pointer"
              onClick={() => onEditClick(category)}
            >
              <Pencil size={15} />
            </button>
          </div>
          <div className="flex justify-center mt-1">
            <Button
              buttonStyle="white"
              className="text-[12px] py-[2px] px-[8px] h-[24px]"
              onClick={() => onComplete(category.id)}
            >
              완료
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
