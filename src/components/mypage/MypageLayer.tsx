'use client';

import { useEffect, useState } from 'react';
import { Layer } from '@/types/myprofile';
import axiosInstance from '@/libs/axios';

export default function MypageLayer({
  searchKeyword,
}: {
  searchKeyword: string;
}) {
  const [layers, setLayers] = useState<Layer[]>([]);

  useEffect(() => {
    const fetchLayers = async () => {
      try {
        const res = await axiosInstance.get('/layers/member');
        const fetchedLayers: Layer[] = res.data.layers;
        setLayers(fetchedLayers);
      } catch (err) {
        console.error('레이어 데이터 불러오기 실패:', err);
      }
    };

    fetchLayers();
  }, []);

  const handleDelete = async (layerId: number) => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/layers/${layerId}`);
      setLayers((prev) => prev.filter((layer) => layer.id !== layerId));
      alert('삭제가 완료되었습니다.');
    } catch (err) {
      console.error(err);
      alert('레이어 삭제 중 오류가 발생했습니다.');
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

  return filteredLayers.length === 0 ? (
    <div className="text-center py-50 text-[var(--gray-300)]">
      찜한 레이어가 없습니다.
    </div>
  ) : (
    <table className="min-w-full text-sm text-left border-t border-[#606060]">
      <thead className="text-[#222222] text-base font-medium">
        <tr>
          <th className="py-3 px-4">작성자</th>
          <th className="py-3 px-4">레이어명</th>
          <th className="py-3 px-4">적용된 게시글</th>
          <th className="py-3 px-4">삭제</th>
        </tr>
      </thead>
      <tbody>
        {filteredLayers.map((layer) => (
          <tr
            key={layer.id}
            className="border-t border-b border-[#606060] text-sm"
          >
            <td className="py-3 px-4">{layer.member.nickname}</td>
            <td className="py-3 px-4">{layer.name}</td>
            <td className="py-3 px-4">{layer.roadmap?.title ?? '제목 없음'}</td>
            <td className="py-3 px-4">
              <button
                onClick={() => handleDelete(layer.id)}
                className="text-[13px] text-[var(--red)] underline cursor-pointer"
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
