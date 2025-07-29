'use client';

import { useEffect, useState } from 'react';
import { Layer } from '@/types/myprofile';
import axiosInstance from '@/libs/axios';
import MypageLayerSkeleton from './skeleton/MypageLayerSkeleton';
import { toast } from 'react-toastify';

export default function MypageLayer({
  searchKeyword,
}: {
  searchKeyword: string;
}) {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLayers = async () => {
      try {
        const res = await axiosInstance.get('/layers/member');
        setLayers(res.data.layers);
      } catch (err) {
        console.error('레이어 데이터 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLayers();
  }, []);

  const handleDelete = async (layerId: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await axiosInstance.delete(`/layers/${layerId}`);
      setLayers((prev) => prev.filter((layer) => layer.id !== layerId));
      toast.success('삭제가 완료되었습니다.');
    } catch (err) {
      console.error(err);
      toast.error('레이어 삭제 중 오류가 발생했습니다.');
    }
  };

  const filteredLayers = layers.filter((layer) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      layer.member.nickname.toLowerCase().includes(keyword) ||
      layer.name.toLowerCase().includes(keyword) ||
      layer.roadmap?.title?.toLowerCase().includes(keyword)
    );
  });

  return (
    <table className="min-w-full text-sm text-left border-t border-[#606060]">
      <thead className="text-[var(--black)] text-base font-medium">
        <tr>
          <th className="py-3 px-4">작성자</th>
          <th className="py-3 px-4">레이어명</th>
          <th className="py-3 px-4">적용된 게시글</th>
          <th className="py-3 px-4">삭제</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          Array.from({ length: 1 }).map((_, i) => (
            <tr key={i} className="border-t border-b border-[var(--gray-300)]">
              <td className="py-3 px-4">
                <MypageLayerSkeleton className="h-4 w-10" />
              </td>
              <td className="py-3 px-4">
                <MypageLayerSkeleton className="h-4 w-24" />
              </td>
              <td className="py-3 px-4">
                <MypageLayerSkeleton className="h-4 w-40" />
              </td>
              <td className="py-3 px-4">
                <MypageLayerSkeleton className="h-4 w-12" />
              </td>
            </tr>
          ))
        ) : filteredLayers.length === 0 ? (
          <tr>
            <td
              colSpan={4}
              className="text-center py-10 text-[var(--gray-300)] font-medium"
            >
              찜한 레이어가 없습니다.
            </td>
          </tr>
        ) : (
          filteredLayers.map((layer) => (
            <tr
              key={layer.id}
              className="border-t border-b border-[#606060] text-sm"
            >
              <td className="py-3 px-4">{layer.member.nickname}</td>
              <td className="py-3 px-4">{layer.name}</td>
              <td className="py-3 px-4">
                {layer.roadmap?.title ?? '제목 없음'}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleDelete(layer.id)}
                  className="text-[13px] text-[var(--red)] underline cursor-pointer"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
