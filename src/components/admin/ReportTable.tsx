'use client';

import { useState, useEffect } from 'react';
import { Siren, Filter, MapPin, ClipboardList, Landmark } from 'lucide-react';
import { DisplayReport, Report, ReportResponse } from '@/types/admin';
import ReportDetailModal from './ReportDetailModal';
import axiosInstance from '@/libs/axios';
import LoadingSpener from '../common/LoadingSpener';

const TABS = ['전체', '대기중', '완료'];

export default function ReportTable() {
  const [selectedTab, setSelectedTab] = useState('전체');
  const [reports, setReports] = useState<DisplayReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<{
    id: number;
    contentType: '지도' | '퀘스트' | '마커';
  } | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosInstance.get<ReportResponse>('/reports');
        const data = res.data;

        const rawReports = data.reportSimpleDTOS;

        if (!Array.isArray(rawReports)) {
          console.warn('서버에서 reports 배열이 안 옴:', data);
          setReports([]);
          return;
        }

        rawReports.sort((a, b) => {
          // 대기순
          if (a.status !== b.status) {
            return a.status === 'REPORTED' ? -1 : 1;
          }

          // 그다음 최신순
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        const getContentType = (report: Report): '지도' | '퀘스트' | '마커' => {
          if (report.quest !== null) return '퀘스트';
          if (report.marker !== null) return '마커';
          if (report.roadmap !== null) return '지도';
          return '지도';
        };

        const mapped: DisplayReport[] = rawReports.map((report: Report) => ({
          id: report.id,
          reported: report.reportedMember.nickname,
          reporter: report.reporter.nickname,
          type: report.description,
          date: new Date(report.createdAt).toLocaleDateString('ko-KR'),
          status: report.status === 'RESOLVED' ? '완료' : '대기',
          contentType: getContentType(report),
          roadmap: report.roadmap,
          marker: report.marker,
          quest: report.quest,
        }));

        setReports(mapped);
      } catch (err) {
        console.error('신고 목록 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleStatusUpdate = async (reportId: number) => {
    try {
      await axiosInstance.get(`/reports/admin/${reportId}`, {});

      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, status: '완료' } : r))
      );
      alert('상태가 완료되었습니다.');
    } catch (err) {
      console.error('상태 업데이트 실패:', err);
      alert('상태 변경에 실패했습니다.');
    }
  };

  const filteredReports = reports
    .filter((r) => {
      if (selectedTab === '전체') return true;
      if (selectedTab === '대기중') return r.status === '대기';
      return r.status === '완료';
    })
    .filter((r) => {
      // 아무것도 선택 안 했으면 전체
      if (selectedTypes.length === 0) return true;
      return selectedTypes.includes(r.contentType);
    });

  const handleDelete = async (report: DisplayReport) => {
    const { contentType, roadmap, quest } = report;
    let deleteUrl = '';

    if (contentType === '지도' && roadmap !== null) {
      deleteUrl = `/roadmaps/${roadmap}`;
    } else if (contentType === '퀘스트' && quest !== null) {
      deleteUrl = `/quests/${quest}`;
    } else {
      alert('삭제할 게시글 ID가 없습니다.');
      return;
    }

    const confirmDelete = confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const res = await axiosInstance.delete(deleteUrl);
      if (res.status !== 200) throw new Error('삭제 실패');

      alert('게시글이 삭제되었습니다.');
      setReports((prev) => prev.filter((r) => r.id !== report.id));
    } catch (err) {
      console.error(err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <LoadingSpener />
      </div>
    );
  }

  return (
    <div className="w-[1000px] bg-[var(--white)] rounded-lg p-4 flex flex-col justify-start border border-[var(--gray-50)]">
      <div className="flex items-center gap-2 text-[var(--primary-300)] font-bold text-xl mb-[16px]">
        <Siren size={25} />
        <span className="mt-1">신고 내역</span>
      </div>

      {/* 탭과 필터 전체 감싸기 */}
      <div className="flex justify-between items-center mb-4">
        {/* 왼쪽: 탭 */}
        <div className="flex gap-[26px] text-[15px] font-medium">
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

        {/* 오른쪽: 필터 버튼 */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="flex items-center gap-1 px-3 py-1 border border-[var(--gray-200)] text-sm rounded-md hover:bg-[var(--primary-50)] transition"
          >
            <Filter size={16} />
            <span>필터</span>
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-xl border border-[var(--gray-100)] rounded-xl w-[200px] z-10 px-4 py-3 transition-all duration-200">
              <div className="flex justify-center items-center gap-1 mb-3">
                <Filter size={16} className="text-[var(--primary-300)]" />
                <p className="text-sm font-semibold text-[var(--gray-400)]">
                  종류 필터
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { label: '지도', icon: <Landmark size={16} /> },
                  { label: '퀘스트', icon: <ClipboardList size={16} /> },
                  { label: '마커', icon: <MapPin size={16} /> },
                ].map(({ label, icon }) => {
                  const isSelected = selectedTypes.includes(label);
                  return (
                    <label
                      key={label}
                      className={`flex items-center justify-between text-sm px-3 py-[6px] rounded-lg cursor-pointer transition-all
              ${
                isSelected
                  ? 'bg-[var(--primary-50)] text-[var(--primary-300)] font-semibold'
                  : 'text-[var(--gray-500)] hover:bg-[var(--gray-40)]'
              }`}
                    >
                      <div className="flex items-center gap-2">
                        {icon}
                        <span>{label}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() =>
                          setSelectedTypes((prev) =>
                            isSelected
                              ? prev.filter((t) => t !== label)
                              : [...prev, label]
                          )
                        }
                        className="accent-[var(--primary-300)]"
                      />
                    </label>
                  );
                })}
              </div>

              {selectedTypes.length > 0 && (
                <button
                  onClick={() => setSelectedTypes([])}
                  className="mt-3 w-full text-sm text-[var(--gray-300)] hover:text-[var(--primary-300)] transition-colors"
                >
                  필터 초기화
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="text-[var(--black)] border-b border-[var(--gray-50)]">
              <th className="py-2">피신고자</th>
              <th className="py-2">신고자</th>
              <th className="py-2">유형</th>
              <th className="py-2">날짜</th>
              <th className="py-2 pl-2">상태</th>
              <th className="py-2 pl-3">조치</th>
              <th className="py-2">종류</th>
              <th className="text-center py-2">삭제</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
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
                  <td className="text-left align-middle pr-[15px]">
                    <span
                      className={`inline-block px-[10px] rounded-full text-[13px] cursor-pointer ${
                        report.status === '대기'
                          ? 'bg-[#FFF4F4] text-[var(--red)]'
                          : 'bg-[#F4FFF4] text-[var(--primary-200)]'
                      }`}
                      onClick={() =>
                        report.status === '대기'
                          ? handleStatusUpdate(report.id)
                          : null
                      }
                    >
                      {report.status}
                    </span>
                  </td>

                  <td className="text-[var(--blue)]">
                    <span
                      className="mr-2 cursor-pointer"
                      onClick={() =>
                        setSelectedReport({
                          id: report.id,
                          contentType: report.contentType,
                        })
                      }
                    >
                      상세 보기
                    </span>
                  </td>
                  <td className="py-2 align-top text-[13px] text-[var(--gray-700)]">
                    <div>{report.contentType}</div>
                  </td>
                  <td className="py-2 align-top text-[13px] text-center text-[var(--red)]">
                    <button
                      className="underline cursor-pointer"
                      onClick={() => handleDelete(report)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <ReportDetailModal
          isOpen={selectedReport !== null}
          onClose={() => setSelectedReport(null)}
          reportId={selectedReport?.id ?? null}
          contentType={selectedReport?.contentType ?? null}
        />
      </div>
    </div>
  );
}
