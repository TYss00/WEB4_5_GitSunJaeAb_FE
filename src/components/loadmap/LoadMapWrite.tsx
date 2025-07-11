'use client';

import { ChevronDown, Plus } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Toggle from '../ui/Toggle';
import LayerEdit from '../ui/layer/LayerEdit';

export default function LoadMapWrite() {
  return (
    <section className="flex min-h-screen">
      {/* 왼쪽 지도 */}
      <div className="w-4/6 bg-gray-200 relative">
        <div className="absolute top-4 left-8 flex items-center gap-3 px-4 py-2 z-10">
          {/* 레이어 선택 */}
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

      <div className="w-2/6 px-6 py-8 space-y-6 bg-white">
        {/* 카테고리 */}
        <div className="space-y-2">
          <label className="text-lg text-black">카테고리</label>
          <div className="relative">
            <select
              className="w-full h-[40px] text-sm border border-[#E4E4E4] rounded px-3 appearance-none"
              defaultValue=""
            >
              <option value="" disabled hidden>
                카테고리를 선택해주세요.
              </option>
              <option>게임</option>
              <option>여행</option>
              <option>맛집</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
            />
          </div>
        </div>

        {/* 제목 */}
        <div className="space-y-2">
          <label className="text-lg text-black">제목</label>
          <Input
            type="text"
            placeholder="제목을 입력해주세요."
            className="h-[40px] border-[#E4E4E4] rounded-md"
          />
        </div>

        {/* 해시태그 */}
        <div className="space-y-2">
          <label className="text-lg text-black">해시태그</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="해시태그 추가"
              className="h-[40px] border-[#E4E4E4] rounded-md"
            />
            <Button
              buttonStyle="smGreen"
              className="w-[80px] h-[40px] text-3xl font-medium"
            >
              <Plus size={25} />
            </Button>
          </div>
          <div className="flex gap-2 text-sm text-[#005C54] mt-1">
            <span>
              #태그1 <button className="ml-1 text-black">×</button>
            </span>
            <span>
              #태그2 <button className="ml-1 text-black">×</button>
            </span>
          </div>
        </div>

        <Toggle label="공개" />

        {/* 레이어 (공용 컴포넌트로 교체예정) */}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl text-black">레이어 및 마커 관리</h3>
          </div>

          <div className="flex gap-2 mb-3">
            <Input
              type="text"
              placeholder="새 레이어 추가"
              className="h-[40px] border-[#E4E4E4] rounded-md"
            />
            <Button
              buttonStyle="smGreen"
              className="w-[80px] h-[40px] text-3xl font-medium"
            >
              <Plus size={25} />
            </Button>
          </div>

          <div className="relative mb-3">
            <select
              className="w-full h-[40px] text-sm border border-[#E4E4E4] rounded px-3 appearance-none"
              defaultValue=""
            >
              <option value="" disabled hidden>
                레이어 선택
              </option>
              <option>게임</option>
              <option>여행</option>
              <option>맛집</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
            />
          </div>

          <div className="space-y-3">
            <LayerEdit title="레이어1" isTextArea />
            <LayerEdit title="레이어1" isTextArea />
            <LayerEdit title="레이어1" isTextArea />
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <Button buttonStyle="white" className="text-sm w-[60px] h-[35px]">
              취소
            </Button>
            <Button buttonStyle="smGreen" className="text-sm w-[60px] h-[35px]">
              완료
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
