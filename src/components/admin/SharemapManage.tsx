'use client';

import { useEffect, useState } from 'react';
import { Map } from 'lucide-react';
import { Roadmap } from '@/types/admin';
import axiosInstance from '@/libs/axios';
import LoadingSpener from '../common/LoadingSpener';
import { toast } from 'react-toastify';

export default function SharemapManage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [totalMemberCount, setTotalMemberCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get('/members/list');
        setTotalMemberCount(res.data.members.length);
      } catch (err) {
        console.error('회원 목록 불러오기 실패:', err);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await axiosInstance.get('/roadmaps/shared');
        const roadmapList = res.data.roadmaps;

        const withEditors = await Promise.all(
          roadmapList.map(async (roadmap: Roadmap) => {
            try {
              const editorsRes = await axiosInstance.get(
                `/roadmaps/${roadmap.id}/editors`
              );
              return {
                ...roadmap,
                editorCount: editorsRes.data.count,
              };
            } catch (e) {
              console.error(`로드맵 ${roadmap.id} 참여자 수 불러오기 실패`, e);
              return { ...roadmap, editorCount: 0 };
            }
          })
        );

        setRoadmaps(withEditors);
      } catch (err) {
        console.error('공유지도 목록 불러오기 실패:', err);
        setRoadmaps([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (totalMemberCount > 0) {
      fetchRoadmaps();
    }
  }, [totalMemberCount]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await axiosInstance.get('/roadmaps/shared');
        setRoadmaps(res.data.roadmaps);
      } catch (err) {
        console.error('공유지도 목록 불러오기 실패:', err);
        setRoadmaps([]);
      }
    };
    fetchRoadmaps();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/roadmaps/${id}`);
      setRoadmaps((prev) => prev.filter((roadmap) => roadmap.id !== id));
      toast.success('삭제되었습니다.');
    } catch (err) {
      console.error('삭제 실패:', err);
      toast.error('삭제 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <LoadingSpener />
      </div>
    );
  }
  return (
    <section className="w-[1000px] bg-[var(--white)] rounded-[10px] p-4 border border-[var(--gray-50)]">
      <div className="flex items-center justify-between font-semibold text-[var(--primary-300)] mb-[24px]">
        <div className="flex items-center text-xl text-[var(--primary-300)] font-bold">
          <Map size={25} className="mr-1" />
          공유지도 관리
          <span className="ml-1 text-xl text-[var(--gray-500)]">
            ({roadmaps.length})
          </span>
        </div>
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
            {Array.isArray(roadmaps)
              ? roadmaps.map((roadmap) => (
                  <tr
                    key={roadmap.id}
                    className="border-b border-[var(--gray-50)]"
                  >
                    <td className="py-2 px-3">{roadmap.title}</td>
                    <td className="py-2 px-3">{roadmap.member.nickname}</td>
                    <td className="py-2 px-3 w-[200px]">
                      {typeof roadmap.editorCount === 'number' &&
                      totalMemberCount > 0 ? (
                        <>
                          <div className="flex justify-between text-[13px] mb-1">
                            <span>
                              {Math.round(
                                (roadmap.editorCount / totalMemberCount) * 100
                              )}
                              %
                            </span>
                          </div>
                          <div className="w-full h-2 bg-[#EFEFEF] rounded-full">
                            <div
                              className="h-full bg-[var(--primary-300)] rounded-full"
                              style={{
                                width: `${Math.round(
                                  (roadmap.editorCount / totalMemberCount) * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between text-[13px] mb-1">
                            <span>-</span>
                          </div>
                          <div className="w-full h-2 bg-[#EFEFEF] rounded-full">
                            <div className="h-full bg-[var(--gray-200)] rounded-full w-0" />
                          </div>
                        </>
                      )}
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
                ))
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
