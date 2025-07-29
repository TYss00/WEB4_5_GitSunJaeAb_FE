'use client';

import Image from 'next/image';
import { Lock } from 'lucide-react';
import AchievementSkeleton from '../skeleton/AchievementSkeleton';
import { useAchievementStore } from '@/store/useAchievementStore';
import {
  useAchievements,
  useMemberAchievements,
} from '@/hooks/useAchievements';

export default function AchievementTab() {
  const { allAchievements, achievedIds } = useAchievementStore();

  const { isLoading: isLoadingAchievements } = useAchievements();
  const { isLoading: isLoadingMember } = useMemberAchievements();

  const isLoading = isLoadingAchievements || isLoadingMember;

  const achievedCount = allAchievements.filter((a) =>
    achievedIds.includes(a.id)
  ).length;

  const progress = allAchievements.length
    ? Math.round((achievedCount / allAchievements.length) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-6 mt-4 h-[520px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-[var(--gray-800)]">업적</h2>
        <div className="w-full bg-[var(--gray-100)] h-3 rounded-full overflow-hidden">
          <div
            className="bg-[var(--primary-300)] h-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-[var(--gray-400)]">
          전체 업적 {allAchievements.length}개 중 {achievedCount}개 달성 (
          {progress}%)
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 overflow-y-auto pr-1">
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <AchievementSkeleton key={idx} />
            ))
          : allAchievements
              .sort((a, b) => {
                const aAch = achievedIds.includes(a.id);
                const bAch = achievedIds.includes(b.id);
                return aAch === bAch ? 0 : aAch ? -1 : 1;
              })
              .map((achieve) => {
                const achieved = achievedIds.includes(achieve.id);

                return (
                  <div
                    key={achieve.id}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl border text-center transition-all duration-200 bg-white border-[var(--gray-100)] ${
                      !achieved ? 'opacity-40' : ''
                    }`}
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden relative mb-3 flex items-center justify-center bg-[var(--gray-100)]">
                      {achieved ? (
                        <Image
                          src={
                            achieve.image?.trim()
                              ? achieve.image
                              : '/이미지없다.jpg'
                          }
                          alt={achieve.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <Lock className="w-8 h-8 text-[var(--gray-400)]" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-[var(--black)]">
                      {achieve.name}
                    </span>
                  </div>
                );
              })}
      </div>
    </div>
  );
}
