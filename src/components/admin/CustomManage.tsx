'use client';

import { useState } from 'react';
import CategoryManage from './CategoryManage';
import MarkerManage from './MarkerManage';
import { Folder, MapPin } from 'lucide-react';

export default function CustomManage() {
  const [activeTab, setActiveTab] = useState<'category' | 'marker'>('category');

  return (
    <div className="w-[732px] mx-auto">
      {/* 탭 메뉴 */}
      <div className="flex gap-4 mb-4 pb-2">
        <button onClick={() => setActiveTab('category')}>
          <h2
            className={`text-xl font-bold flex items-center gap-1.5 
              ${
                activeTab === 'category'
                  ? 'text-[var(--primary-300)] border-b-2 border-[var(--primary-300)]'
                  : 'text-gray-400'
              }`}
          >
            <Folder size={24} />
            카테고리 관리
          </h2>
        </button>
        <button onClick={() => setActiveTab('marker')}>
          <h2
            className={`text-xl font-bold flex items-center gap-1.5 
              ${
                activeTab === 'marker'
                  ? 'text-[var(--primary-300)] border-b-2 border-[var(--primary-300)]'
                  : 'text-gray-400'
              }`}
          >
            <MapPin size={24} />
            커스텀 마커 관리
          </h2>
        </button>
      </div>

      {/* 탭 내용 */}
      <div>
        {activeTab === 'category' ? <CategoryManage /> : <MarkerManage />}
      </div>
    </div>
  );
}
