'use client';

import { useEffect, useState } from 'react';
import { ChartBar } from 'lucide-react';
import Button from '../ui/Button';
import { Roadmap } from '@/types/admin';

export default function SharemapManage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}roadmaps/shared`);
        const data = await res.json();
        setRoadmaps(data.roadmaps);
      } catch (err) {
        console.error('공유지도 목록 불러오기 실패:', err);
      }
    };
    fetchRoadmaps();
  }, [API_BASE_URL]);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE_URL}roadmaps/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('삭제 실패');

      // 성공 시 리스트에서 제거
      setRoadmaps((prev) => prev.filter((roadmap) => roadmap.id !== id));
      alert('삭제되었습니다.');
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <section className="w-[1000px] bg-[var(--white)] rounded-[10px] p-6 border border-[var(--gray-50)]">
      <div className="flex items-center justify-between font-semibold text-[var(--primary-300)] mb-[24px]">
        <div className="flex items-center text-lg text-[var(--primary-300)] font-semibold">
          <ChartBar size={20} className="mr-1" />
          공유지도 관리
        </div>
        <Button
          buttonStyle="smGreen"
          className="w-[100px] h-[28px] text-[14px]"
        >
          공유지도 생성
        </Button>
      </div>

      <div className="overflow-auto h-[600px] max-h-[455px]">
        <table className="w-full text-[14px] border-t border-[var(--gray-100)]">
          <thead>
            <tr className="text-left border-b border-[var(--gray-100)]">
              <th className="py-2 px-3">제목</th>
              <th className="py-2 px-3">작성자</th>
              <th className="py-2 px-3">참여율</th>
              <th className="py-2 px-3 text-center">게시물</th>
            </tr>
          </thead>
          <tbody>
            {roadmaps.map((roadmap) => (
              <tr key={roadmap.id} className="border-b border-[var(--gray-50)]">
                <td className="py-2 px-3">{roadmap.title}</td>
                <td className="py-2 px-3">{roadmap.member.nickname}</td>
                <td className="py-2 px-3 w-[200px]">
                  <div className="flex justify-between text-[13px] mb-1">
                    <span>62%</span>
                  </div>
                  <div className="w-full h-2 bg-[#EFEFEF] rounded-full">
                    <div
                      className="h-full bg-[var(--primary-300)] rounded-full"
                      style={{ width: '62%' }}
                    />
                  </div>
                </td>
                <td className="py-2 text-[13px] text-center text-[var(--red)]">
                  <button
                    className="underline cursor-pointer"
                    onClick={() => handleDelete(roadmap.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
