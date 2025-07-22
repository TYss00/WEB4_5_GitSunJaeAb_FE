'use client';

import { useEffect, useState } from 'react';
import { Folder } from 'lucide-react';
import CategoryAddCard from '@/components/admin/CategoryAddCard';
import { Category } from '@/types/admin';
import CategoryCard from './CategoryCard';
import axiosInstance from '@/libs/axios';
import CategoryFormCard from './CategoryFormCard';

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
      formData.append('description', '설명 미구현');
      if (newCategory.image) {
        formData.append('image', newCategory.image);
      }

      const res = await axiosInstance.post('/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const addedCategory = {
        ...res.data,
        name: res.data.name || newCategory.name,
      };

      setCategories((prev) => [...prev, addedCategory]);
      setNewCategory({ name: '', image: null });
      setShowForm(false);
      alert('카테고리가 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error('POST 요청 실패:', error);
      alert('카테고리 추가 중 오류가 발생했습니다.');
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

  const handleEditSubmit = async (id: number) => {
    try {
      const formData = new FormData();
      if (editedCategory.image) {
        formData.append('imageFile', editedCategory.image);
      }

      const params = new URLSearchParams();
      params.append('name', editedCategory.name);
      params.append('description', '설명 미구현');

      const res = await axiosInstance.put(
        `/categories/${id}?${params.toString()}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updatedCategory = res.data;

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id
            ? {
                ...cat,
                ...updatedCategory,
                name: updatedCategory.name || editedCategory.name,
              }
            : cat
        )
      );

      setEditingId(null);
      setEditedCategory({ name: '', image: null });
      alert('카테고리 수정이 완료되었습니다.');
    } catch (err) {
      console.error('카테고리 수정 실패:', err);
      alert('카테고리 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const confirmDelete = confirm('정말로 이 카테고리를 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/categories/${id}`);

      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      alert('카테고리가 삭제되었습니다.');
    } catch (error) {
      console.error('카테고리 삭제 실패:', error);
      alert('카테고리 삭제 중 오류가 발생했습니다.');
    }
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
            <CategoryFormCard
              key={`edit-${category.id}`}
              name={editedCategory.name}
              image={editedCategory.image}
              onNameChange={(name) =>
                setEditedCategory((prev) => ({ ...prev, name }))
              }
              onImageChange={handleEditImageChange}
              onSubmit={() => handleEditSubmit(category.id)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <CategoryCard
              key={`view-${category.id}`}
              category={category}
              onEditClick={(cat) => {
                setEditingId(cat.id);
                setEditedCategory({ name: cat.name, image: null });
              }}
              onDelete={() => handleDeleteCategory(category.id)}
            />
          )
        )}

        {showForm ? (
          <CategoryFormCard
            key="new-category-form"
            name={newCategory.name}
            image={newCategory.image}
            onNameChange={(name) =>
              setNewCategory((prev) => ({ ...prev, name }))
            }
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setNewCategory({ name: '', image: null });
            }}
          />
        ) : (
          <CategoryAddCard
            key="category-add-button"
            type="category"
            onClick={() => setShowForm(true)}
          />
        )}
      </div>
    </div>
  );
}
