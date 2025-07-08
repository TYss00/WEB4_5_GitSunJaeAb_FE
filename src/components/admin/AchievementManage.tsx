"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import {
  Trophy,
  Medal,
  Telescope,
  BookDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const ACHIEVEMENTS = [
  { name: "개척자", icon: <Medal size={16} className="mr-2" /> },
  { name: "탐험가", icon: <Telescope size={16} className="mr-2" /> },
  { name: "복제왕", icon: <BookDown size={16} className="mr-2" /> },
];

export default function AchievementManage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (name: string) => {
    setOpenItem(openItem === name ? null : name);
  };

  return (
    <div className="w-[350px] h-[220px] bg-white rounded-[10px] p-4 border border-[#E4E4E4] space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-[18px] text-[#00664F] font-semibold">
          <Trophy size={18} className="mr-1" />
          업적 관리
        </div>
        <Button
          buttonStyle="smGreen"
          className="w-[100px] h-[28px] text-[14px]"
        >
          업적 추가
        </Button>
      </div>

      <div className="flex flex-col text-[#333] text-[15px]">
        {ACHIEVEMENTS.map(({ name, icon }) => (
          <div
            key={name}
            className="border-t border-[#E4E4E4] first:border-t-1 last:border-b border-b-[#E4E4E4]"
          >
            <div
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggle(name)}
            >
              <div className="flex items-center font-medium">
                {icon}
                {name}
              </div>
              {openItem === name ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {openItem === name && name === "탐험가" && (
              <div className="bg-[#F5F5F5] text-[13px] text-[#000000] px-2 py-2">
                로드맵 1회 이상 작성 시 달성
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
