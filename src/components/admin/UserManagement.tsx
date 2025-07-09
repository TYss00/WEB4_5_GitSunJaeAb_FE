"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, UserCog } from "lucide-react";
import Button from "@/components/ui/Button";

const DROPDOWN_ITEMS = ["전체 사용자", "관리자", "블랙 리스트"];

const dummyEmails = [
  { name: "지지", email: "jiji@naver.com" },
  { name: "은은", email: "ee@naver.com" },
  { name: "관리자1", email: "admin@admin.com" },
];

export default function UserManagement() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="w-[350px] h-[310px] bg-white rounded-lg p-4 flex flex-col justify-start border border-[#E4E4E4]">
      <div className="flex items-center gap-2 text-[#005C54] font-semibold text-[18px] mb-[16px]">
        <UserCog size={20} className="mr-1" />
        사용자 관리
      </div>

      <div className="flex flex-col text-[#333] text-[15px]">
        {DROPDOWN_ITEMS.map((item) => (
          <div
            key={item}
            className="border-t border-[#E4E4E4] first:border-t-1 last:border-b border-b-[#E4E4E4]"
          >
            <div
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggle(item)}
            >
              <span>{item}</span>
              {openItem === item ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {openItem === item && item === "블랙 리스트" && (
              <div className="bg-[#F5F5F5] px-[8px] py-[6px] text-[13px] space-y-[2px]">
                {dummyEmails.map(({ name, email }) => (
                  <div key={email}>
                    <span className="text-[15px] text-[#333] mr-1">{name}</span>
                    <span className="text-[#7F7F7F] text-[13px]">{email}</span>
                  </div>
                ))}
                <div className="flex justify-center gap-2 mt-[10px]">
                  <Button
                    buttonStyle="smGreen"
                    className="w-[100px] h-[28px] text-[15px]"
                  >
                    추가하기
                  </Button>
                  <Button
                    buttonStyle="white"
                    className="w-[100px] h-[28px] text-[15px]"
                  >
                    수정하기
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
