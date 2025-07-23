'use client';

import { useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, Plus } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { api } from '@/libs/api';
import Link from 'next/link';
import { geocodeAddress } from '@/libs/geocode';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { CategoryInfo } from '@/types/type';

interface ShareMapAddProps {
  categories: CategoryInfo[];
}

export interface AddressData {
  address: string;
}

export default function ShareMapAdd({ categories }: ShareMapAddProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const thumbnail =
    'https://cdn.pixabay.com/photo/2023/06/04/20/21/cat-8040862_1280.jpg';
  const isPublic = true;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const mapRef = useRef<google.maps.Map | null>(null);

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

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

  const handleSubmit = async () => {
    if (!title || !description || !categoryId) {
      console.log('필수 값을 입력해주세요.');
      return;
    }

    try {
      const res = await api('/roadmaps/shared', {
        method: 'POST',
        body: {
          categoryId,
          title,
          description,
          thumbnail,
          isPublic,
          region,
          lat: center.lat,
          lng: center.lng,
          hashtags: tags.map((tag) => ({ name: tag })),
        },
      });

      console.log('작성 완료:', res);
    } catch (err) {
      console.error('작성 실패:', err);
    }
  };

  return (
    <section className="flex h-screen overflow-hidden">
      <div className="w-4/6 bg-gray-200 relative">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={13}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          />
        )}
        <div className="absolute top-2 left-[140px] flex items-center gap-3 px-4 py-2 z-20">
          <Button
            buttonStyle="white"
            icon={<ChevronLeft size={18} />}
            className="text-sm"
          >
            뒤로가기
          </Button>

          <div className="relative w-[140px]">
            <select
              className="w-full h-[34px] text-sm bg-white border-none rounded pl-3 appearance-none"
              defaultValue=""
            >
              <option value="" disabled hidden>
                레이어 이름
              </option>
              <option>레이어 1</option>
              <option>레이어 2</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black"
            />
          </div>
        </div>
      </div>

      <div className="w-2/6 px-6 py-8 space-y-6 bg-white overflow-y-auto scrollbar-none">
        {/* 제목 title */}
        <div className="space-y-2">
          <label className="text-lg text-black">제목</label>
          <Input
            type="text"
            placeholder="제목을 입력해주세요."
            className="h-[40px] border-[#E4E4E4] rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 내용 description */}
        <div className="space-y-2">
          <label className="text-lg text-black">내용</label>
          <Input
            type="text"
            placeholder="내용을 입력해주세요."
            className="h-[40px] border-[#E4E4E4] rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* 지역 지오코딩으로 입력받기 */}
        <div className="space-y-2">
          <label className="text-lg text-black">지역</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="지역을 입력해주세요."
              className="h-[40px] border-[#E4E4E4] rounded-md cursor-pointer"
              value={region}
              readOnly
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        {/* 주소찾기 모달 */}
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

        {/* 기간 */}
        <div className="space-y-2">
          <label className="text-lg text-black">기간</label>
          <Input
            type="date"
            placeholder="기간을 입력해주세요."
            className="h-[40px] border-[#E4E4E4] rounded-md"
          />
        </div>

        {/* 카테고리(로드맵꺼 복사) */}
        <div className="space-y-2">
          <label className="text-lg text-black">카테고리</label>
          <div className="relative">
            <select
              className="w-full h-[40px] text-sm border border-[#E4E4E4] rounded px-3 appearance-none"
              value={categoryId ?? ''}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              <option value="" disabled hidden>
                카테고리를 선택해주세요.
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
            />
          </div>
        </div>

        {/* 해시태그 */}
        <div className="space-y-2">
          <label className="text-lg text-black">해시태그</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="해시태그 추가"
              className="h-[40px] border-[#E4E4E4] rounded-md"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button
              buttonStyle="smGreen"
              className="w-[80px] h-[40px] text-3xl font-medium"
              onClick={handleAddTag}
            >
              <Plus size={25} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-[#005C54] mt-1">
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

        {/* 취소, 완료 버튼 */}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex justify-end mt-4 gap-2">
            <Button buttonStyle="white" className="text-sm w-[60px] h-[35px]">
              취소
            </Button>
            <Link href="/dashbord/sharemap">
              <Button
                buttonStyle="smGreen"
                className="text-sm w-[60px] h-[35px]"
                onClick={handleSubmit}
              >
                완료
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
