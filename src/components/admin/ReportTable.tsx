'use client';

import { useState } from 'react';
import { Siren } from 'lucide-react';

const TABS = ['전체', '대기중', '완료'];

const dummyReports = [
  {
    id: 1,
    reported: '홍길동',
    reporter: '지지',
    type: '허위 게시글',
    date: '2025.07.07',
    status: '대기',
  },
  {
    id: 2,
    reported: '홍길동',
    reporter: '지지',
    type: '허위 게시글',
    date: '2025.07.07',
    status: '완료',
  },
  {
    id: 3,
    reported: '홍길동',
    reporter: '지지',
    type: '욕설',
    date: '2025.07.07',
    status: '대기',
  },
  {
    id: 4,
    reported: '홍길동',
    reporter: '지지',
    type: '음란물',
    date: '2025.07.07',
    status: '대기',
  },
];

export default function ReportTable() {
  const [selectedTab, setSelectedTab] = useState('전체');

  const filteredReports =
    selectedTab === '전체'
      ? dummyReports
      : dummyReports.filter((report) => report.status === selectedTab);

  return (
    <section className="w-[1000px] bg-[var(--white)] rounded-[10px] p-6 border border-[var(--gray-50)]">
      {/* 헤더 */}
      <div className="flex items-center gap-[16px] font-semibold text-[var(--primary-300)] mb-[24px]">
        <Siren className="w-[20px] h-[20px]" />
        <span className="text-[18px]">신고 내역</span>
      </div>

      {/* 탭 */}
      <div className="flex gap-[26px] mb-4 text-[15px] font-medium">
        {TABS.map((tab) => (
          <span
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`cursor-pointer pb-1 ${
              selectedTab === tab
                ? 'text-[var(--primary-300)] border-b-2 border-[var(--primary-300)]'
                : 'text-[var(--gray-300)]'
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* 테이블 */}
      <div>
        <table className="w-full text-[14px]">
          <thead>
            <tr className="text-[var(--black)] border-b border-[var(--gray-50)]">
              <th className="text-left py-2">피신고자</th>
              <th className="text-left py-2">신고자</th>
              <th className="text-left py-2">유형</th>
              <th className="text-left py-2">날짜</th>
              <th className="text-left py-2">상태</th>
              <th className="text-left py-2">조치</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-[var(--gray-300)]"
                >
                  해당하는 신고 내역이 없습니다.
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-[var(--gray-50)]"
                >
                  <td className="py-2">{report.reported}</td>
                  <td>{report.reporter}</td>
                  <td>{report.type}</td>
                  <td>{report.date}</td>
                  <td className="text-left align-middle pr-[12px]">
                    <span
                      className={`inline-block px-[10px] py-[2px] rounded-full text-[13px] ${
                        report.status === '대기'
                          ? 'bg-[#FFF4F4] text-[var(--red)]'
                          : 'bg-[#F4FFF4] text-[var(--primary-200)]'
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="text-[var(--blue)]">
                    <span className="mr-2 cursor-pointer">상세 보기</span>
                    {report.status === '대기' && (
                      <>
                        <button className="text-[var(--primary-200)] mr-1">
                          ✔
                        </button>
                        <button className="text-[var(--red)]">✖</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
