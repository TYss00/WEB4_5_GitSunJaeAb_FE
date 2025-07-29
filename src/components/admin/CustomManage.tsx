'use client';
import { useState } from 'react';
import CategoryManage from './CategoryManage';
import MarkerManage from './MarkerManage';
import { Folder, MapPin } from 'lucide-react';

export default function CustomManage() {
  const [activeTab, setActiveTab] = useState<'category' | 'marker'>('category');
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [markerCount, setMarkerCount] = useState<number>(0);

  return (
    <div className="w-[732px] mx-auto">
      <div className="flex gap-4 mb-4 pb-2">
        <button onClick={() => setActiveTab('category')}>
          <h2
            className={`text-xl font-bold flex items-center gap-1.5 ${
              activeTab === 'category'
                ? 'text-[var(--primary-300)] border-b-2 border-[var(--primary-300)]'
                : 'text-gray-400'
            }`}
          >
            <Folder size={24} />
            카테고리 관리{' '}
            {activeTab === 'category' && categoryCount
              ? ` (${categoryCount})`
              : ''}
          </h2>
        </button>
        <button onClick={() => setActiveTab('marker')}>
          <h2
            className={`text-xl font-bold flex items-center gap-1.5 ${
              activeTab === 'marker'
                ? 'text-[var(--primary-300)] border-b-2 border-[var(--primary-300)]'
                : 'text-gray-400'
            }`}
          >
            <MapPin size={24} />
            커스텀 마커 관리
            {activeTab === 'marker' && markerCount ? ` (${markerCount})` : ''}
          </h2>
        </button>
      </div>

      <div>
        {activeTab === 'category' ? (
          <CategoryManage setCount={setCategoryCount} />
        ) : (
          <MarkerManage setCount={setMarkerCount} />
        )}
      </div>
    </div>
  );
}
