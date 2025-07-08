"use client";

import { Siren } from "lucide-react";

export default function ReportTable() {
  return (
    <section className="w-[732px] h-[542px] bg-white rounded-lg p-6 shadow-sm flex-1">
      <div className="flex items-center gap-[16px] font-semibold text-[#005C54] mb-[24px]">
        <Siren className="w-[20px] h-[20px]" />
        <span className="text-[18px]">신고 내역</span>
      </div>

      <div className="flex gap-[26px] mb-4 text-[15px] font-medium">
        <span className="text-[#005C54] border-b-2 border-[#005C54] pb-1">
          전체
        </span>
        <span className="text-[#606060]">대기중</span>
        <span className="text-[#606060]">완료</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="text-[#222222] border-b border-[#E4E4E4]">
              <th className="text-left py-2">신고자</th>
              <th className="text-left py-2">피신고자</th>
              <th className="text-left py-2">유형</th>
              <th className="text-left py-2">날짜</th>
              <th className="text-left py-2">상태</th>
              <th className="text-left py-2">조치</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((_, i) => (
              <tr key={i} className="border-b border-[#F0F0F0]">
                <td className="py-2">홍길동</td>
                <td>지지</td>
                <td>허위 게시글</td>
                <td>2025.07.07</td>
                <td className="text-left align-middle pr-[12px]">
                  <span className="inline-block bg-[#FFEFEF] text-[#F44336] px-[10px] py-[2px] rounded-full text-[13px] font-semibold">
                    대기
                  </span>
                </td>

                <td className="text-blue-500">
                  <span className="underline mr-2 cursor-pointer">
                    상세 보기
                  </span>
                  <button className="text-green-500 mr-1">✔</button>
                  <button className="text-red-500">✖</button>
                </td>
              </tr>
            ))}
            <tr className="border-b border-[#F0F0F0]">
              <td className="py-2">홍길동</td>
              <td>지지</td>
              <td>허위 게시글</td>
              <td>2025.07.07</td>
              <td className="text-left align-middle pr-[12px]">
                <span className="inline-block bg-[#F4FFF4] text-[#1ABC9C] px-[10px] py-[2px] rounded-full text-[13px] font-semibold">
                  완료
                </span>
              </td>

              <td className="text-blue-500">
                <span className="underline mr-2 cursor-pointer">상세 보기</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-right mt-4 text-[14px] text-[#7F7F7F] cursor-pointer">
        더보기
      </div>
    </section>
  );
}
