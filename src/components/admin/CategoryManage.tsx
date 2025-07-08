"use client";

import Image from "next/image";
import CategoryAddCard from "@/components/admin/CategoryAddCard";

const categories = ["음식", "등산", "레트로", "서울", "역사", "인천"];

export default function CategoryManage() {
  return (
    <div className="w-[732px] mx-auto border border-gray-200 rounded-lg px-6 py-5">
      <h2 className="text-lg font-semibold text-[#1E5F4F] mb-4 flex items-center gap-2">
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="#1E5F4F"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 4h16v4H4zM4 10h16v10H4z" />
        </svg>
        카테고리 관리
      </h2>

      <div className="flex flex-wrap gap-4">
        {categories.map((name, idx) => (
          <div
            key={idx}
            className="w-[100px] h-[126px] rounded-md overflow-hidden border border-gray-200 bg-white"
          >
            <Image
              src="/assets/steak.jpg"
              alt={name}
              width={120}
              height={120}
              className="w-full h-[100px] object-cover"
            />
            <p className="text-center mt-1 text-sm">{name}</p>
          </div>
        ))}

        <div className="basis-full h-0" />
        <CategoryAddCard
          onClick={() => {
            alert("카테고리 추가 클릭!");
          }}
        />
      </div>
    </div>
  );
}
