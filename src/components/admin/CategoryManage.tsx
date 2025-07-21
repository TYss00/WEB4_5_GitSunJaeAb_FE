'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Folder, ImagePlus } from 'lucide-react';
import CategoryAddCard from '@/components/admin/CategoryAddCard';
import Button from '../ui/Button';
import { Category } from '@/types/admin';
import Input from '../ui/Input';
import CategoryCard from './CategoryCard';
import axiosInstance from '@/libs/axios';

export default function CategoryManage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState<{
    name: string;
    image: File | null;
  }>({ name: '', image: null });
  const [editedCategory, setEditedCategory] = useState<{
    name: string;
    image: File | null;
  }>({ name: '', image: null });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/categories');
        setCategories(res.data.categories);
      } catch (error) {
        console.error('카테고리 불러오기 실패:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!newCategory.name.trim()) {
      alert('카테고리 이름을 입력하세요');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newCategory.name);
      formData.append('description', '테스트용 설명');
      if (newCategory.image) {
        formData.append('image', newCategory.image);
      }

      alert('POST 요청 성공!');
    } catch (error) {
      console.error('POST 요청 실패:', error);
      alert('POST 요청 실패');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setNewCategory((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setEditedCategory((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleEditSubmit = (id: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              name: editedCategory.name,
              categoryImage: editedCategory.image
                ? URL.createObjectURL(editedCategory.image)
                : cat.categoryImage,
            }
          : cat
      )
    );
    setEditingId(null);
    setEditedCategory({ name: '', image: null });
  };

  return (
    <div className="w-[732px] mx-auto border border-[var(--gray-50)] rounded-[10px] px-[16px] py-[16px]">
      <h2 className="text-lg font-semibold text-[var(--primary-300)] mb-[16px] flex items-center gap-2">
        <Folder size={24} className="text-[var(--primary-300)]" />
        카테고리 관리
      </h2>

      <div className="flex flex-wrap gap-[16px]">
        {categories.map((category) =>
          editingId === category.id ? (
            <div
              key={category.id}
              className="w-[100px] h-[126px] p-2 rounded-md overflow-hidden border border-dashed border-[var(--gray-300)] bg-[var(--white)] flex flex-col justify-between"
            >
              <div className="w-full h-[100px] flex items-center justify-center bg-gray-100 relative">
                {editedCategory.image ? (
                  <Image
                    src={URL.createObjectURL(editedCategory.image)}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <label className="text-sm text-[var(--gray-100)] cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleEditImageChange}
                    />
                    <ImagePlus className="w-4 h-4 text-[var(--gray-200)] absolute left-1/2 top-1/2 -translate-1/2" />
                  </label>
                )}
              </div>
              <Input
                placeholder="제목"
                value={editedCategory.name}
                onChange={(e) =>
                  setEditedCategory({ ...editedCategory, name: e.target.value })
                }
                className="text-sm py-[2px] placeholder:text-xs"
              />
              <div className="flex justify-between mt-1 gap-1">
                <Button
                  buttonStyle="smGreen"
                  className="text-[12px] py-[2px] px-[8px] h-[24px] w-full"
                  onClick={() => handleEditSubmit(category.id)}
                >
                  등록
                </Button>
                <Button
                  buttonStyle="white"
                  className="text-[12px] py-[2px] px-[8px] h-[24px] w-full"
                  onClick={() => setEditingId(null)}
                >
                  취소
                </Button>
              </div>
            </div>
          ) : (
            <CategoryCard
              key={category.id}
              category={category}
              isEditing={false}
              editedCategory={editedCategory}
              setEditedCategory={setEditedCategory}
              handleEditImageChange={handleEditImageChange}
              handleEditSubmit={handleEditSubmit}
              onEditClick={(cat: Category) => {
                setEditingId(cat.id);
                setEditedCategory({ name: cat.name, image: null });
              }}
              cancelEdit={() => setEditingId(null)}
              onComplete={() => {}}
            />
          )
        )}

        {showForm ? (
          <div className="w-[100px] h-[126px] p-2 rounded-md overflow-hidden border border-dashed border-[var(--gray-300)] bg-[var(--white)] flex flex-col justify-between">
            <div className="w-full h-[100px] flex items-center justify-center bg-gray-100 relative">
              {newCategory.image ? (
                <Image
                  src={URL.createObjectURL(newCategory.image)}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <label className="text-sm text-[var(--gray-100)] cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <ImagePlus className="w-4 h-4 text-[var(--gray-200)] absolute left-1/2 top-1/2 -translate-1/2" />
                </label>
              )}
            </div>
            <Input
              placeholder="제목"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="text-sm py-[2px] placeholder:text-xs"
            />
            <div className="flex justify-between mt-1 gap-1">
              <Button
                buttonStyle="smGreen"
                className="text-[12px] py-[2px] px-[8px] h-[24px]"
                onClick={handleSubmit}
              >
                등록
              </Button>
              <Button
                buttonStyle="white"
                className="text-[12px] py-[2px] px-[8px] h-[24px]"
                onClick={() => {
                  setShowForm(false);
                  setNewCategory({ name: '', image: null });
                }}
              >
                취소
              </Button>
            </div>
          </div>
        ) : (
          <CategoryAddCard type="category" onClick={() => setShowForm(true)} />
        )}
      </div>
    </div>
  );
}
