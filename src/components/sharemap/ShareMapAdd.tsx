'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ImagePlus, Plus } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Link from 'next/link';
import { geocodeAddress } from '@/libs/geocode';
import { GoogleMap } from '@react-google-maps/api';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { CategoryInfo } from '@/types/type';
import axiosInstance from '@/libs/axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export interface AddressData {
  address: string;
}

export default function ShareMapAdd() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isPublic = true;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const mapRef = useRef<google.maps.Map | null>(null);

  const [endDate, setEndDate] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/categories');
        const data = res.data;
        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error('카테고리 데이터 형식이 잘못되었습니다:', data);
          toast.error('카테고리 목록을 불러오지 못했어요.');
        }
      } catch (error) {
        console.error('카테고리 요청 실패:', error);
        toast.error('카테고리 요청 중 오류가 발생했어요.');
      }
    };

    fetchCategories();
  }, []);

  const handleComplete = async (data: AddressData) => {
    const fullAddress = data.address;
    setRegion(fullAddress);
    setIsModalOpen(false);

    try {
      const coords = await geocodeAddress(fullAddress);
      if (!coords) return;
      setCenter({ lat: coords.lat, lng: coords.lng });
      mapRef.current?.panTo({ lat: coords.lat, lng: coords.lng });
    } catch (err) {
      console.error('지오코딩 실패:', err);
    }
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (!newTag || tags.includes(newTag)) return;
    setTags([...tags, newTag]);
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // 실제 전송용

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setThumbnail(result); // 미리보기용
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !categoryId) {
      console.log('필수 값을 입력해주세요.');
      return;
    }

    try {
      const { lat, lng, address } = await geocodeAddress(region);

      const payload = {
        categoryId,
        title,
        description,
        address: address,
        regionLatitude: lat,
        regionLongitude: lng,
        participationEnd: new Date(endDate).toISOString(),
        hashtags: tags.map((tag) => ({ name: tag })),
        isPublic,
      };

      const formData = new FormData();
      formData.append(
        'request',
        new Blob([JSON.stringify(payload)], { type: 'application/json' })
      );
      if (imageFile) {
        formData.append('imageFile', imageFile);
      }

      const res = await axiosInstance.post('/roadmaps/shared', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('작성 완료:', res);

      router.push('/dashbord/sharemap');
      router.refresh();

      const message = res.data?.message ?? '';
      if (message.includes('업적')) {
        toast.success(message);
      } else {
        toast.success('공유지도가 성공적으로 생성되었습니다.');
      }
    } catch (err) {
      console.error('작성 실패:', err);
      alert('작성에 실패했습니다.');
    }
  };

  return (
    <section className="flex h-screen overflow-hidden">
      {/* 지도 */}
      <div className="w-4/6 bg-gray-200 relative">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={13}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        />

        <div className="absolute top-2 left-[160px] flex items-center gap-3 px-4 py-2 z-20">
          <Link href="/dashbord/sharemap">
            <Button
              buttonStyle="white"
              icon={<ChevronLeft size={18} />}
              className="text-sm"
            >
              뒤로가기
            </Button>
          </Link>
        </div>
      </div>

      {/* 입력 폼 */}
      <div className="w-2/6 px-6 py-8 space-y-6 bg-white overflow-y-auto scrollbar-none">
        <div className="space-y-2">
          <label className="text-lg text-black">제목</label>
          <Input
            type="text"
            placeholder="제목을 입력해주세요."
            className="h-[40px]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg text-black">내용</label>
          <Input
            type="text"
            placeholder="내용을 입력해주세요."
            className="h-[40px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg text-black">지역</label>
          <Input
            type="text"
            placeholder="지역을 입력해주세요."
            className="h-[40px] cursor-pointer"
            value={region}
            readOnly
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg text-black">썸네일</label>
          <div
            className="w-full h-[300px] bg-gray-100 rounded overflow-hidden relative cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="썸네일"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <ImagePlus className="text-gray-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleThumbnailUpload}
          />
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/25 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-[450px] relative">
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <DaumPostcodeEmbed onComplete={handleComplete} />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-lg text-black">기간</label>
          <Input
            type="date"
            className="h-[40px]"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg text-black">카테고리</label>
          <div className="relative">
            <select
              className="w-full h-[40px] border border-[#E4E4E4] rounded px-3 appearance-none"
              value={categoryId ?? ''}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              <option value="" disabled hidden>
                카테고리를 선택해주세요.
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* 오른쪽 화살표 아이콘 */}
            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-lg text-black">해시태그</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="해시태그 추가"
              className="h-[40px]"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isComposing) {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button
              buttonStyle="smGreen"
              className="w-[40px] h-[40px]"
              onClick={handleAddTag}
            >
              <Plus size={20} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#E4F4F2] px-2 py-1 rounded flex items-center"
              >
                #{tag}
                <button
                  className="ml-1 text-black"
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-end gap-2">
            <Link href="/dashbord/sharemap">
              <Button buttonStyle="white" className="w-[60px] h-[35px] text-sm">
                취소
              </Button>
            </Link>
            <Button
              buttonStyle="smGreen"
              className="w-[60px] h-[35px] text-sm"
              onClick={handleSubmit}
            >
              완료
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
