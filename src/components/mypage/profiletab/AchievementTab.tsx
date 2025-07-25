'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axiosInstance from '@/libs/axios';

type Achievement = {
  id: number;
  name: string;
  image: string;
};

export default function AchievementTab() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [achievedIds, setAchievedIds] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const [allRes, memberRes] = await Promise.all([
          axiosInstance.get('/achievements'),
          axiosInstance.get('/achievements/member'),
        ]);

        setAchievements(allRes.data.achievements || []);
        setAchievedIds(
          memberRes.data.achievements?.map((a: { id: number }) => a.id) || []
        );
      } catch (err) {
        console.error('업적 불러오기 실패:', err);
      }
    };

    fetchAchievements();
  }, []);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 2
        ? [...prev, id]
        : prev
    );
  };

  const achievedCount = achievements.filter((a) =>
    achievedIds.includes(a.id)
  ).length;
  const progress = achievements.length
    ? Math.round((achievedCount / achievements.length) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-6 mt-4 h-[440px]">
      {/* 제목, 진행률 */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-[var(--gray-800)]">업적</h2>
        <div className="w-full bg-[var(--gray-100)] h-3 rounded-full overflow-hidden">
          <div
            className="bg-[var(--primary-300)] h-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-[var(--gray-400)]">
          전체 업적 {achievements.length}개 중 {achievedCount}개 달성 (
          {progress}%)
        </p>
      </div>

      {/* 업적 리스트 */}
      <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-2">
        {[...achievements]
          .sort((a, b) => {
            const aAch = achievedIds.includes(a.id);
            const bAch = achievedIds.includes(b.id);
            return aAch === bAch ? 0 : aAch ? -1 : 1;
          })
          .map((achieve) => {
            const achieved = achievedIds.includes(achieve.id);
            const isSelected = selected.includes(achieve.id);
            return (
              <div
                key={achieve.id}
                className={`flex items-center gap-4 px-4 py-3 border rounded-md cursor-pointer transition ${
                  achieved
                    ? isSelected
                      ? 'bg-[var(--primary-50)] border-[var(--primary-300)]'
                      : 'bg-white border-[var(--gray-100)]'
                    : 'bg-[var(--gray-50)] border-[var(--gray-100)] opacity-50'
                }`}
                onClick={() => achieved && toggleSelect(achieve.id)}
              >
                <div className="w-12 h-12 relative">
                  <Image
                    src={
                      achieve.image?.trim() ? achieve.image : '/이미지없다.jpg'
                    }
                    alt={achieve.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[var(--black)]">
                    {achieve.name}
                  </span>
                </div>
                {isSelected && (
                  <span className="ml-auto text-xs text-[var(--primary-300)] font-medium">
                    프로필 표시 중
                  </span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
