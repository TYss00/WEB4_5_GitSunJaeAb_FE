'use client';

import { useEffect, useState } from 'react';
import Banner from '../dashboard/Banner';
import EventBox from '../dashboard/EventBox';
import WriteButton from '../dashboard/WriteButton';
import ShareMapCardList from './ShareMapCardList';
import { DashboardShareMapCardProps, RawRoadmap } from '@/types/share';
import axiosInstance from '@/libs/axios';
import { toast } from 'react-toastify';

export default function ShareMapDashboard() {
  const [shareMaps, setShareMaps] = useState<DashboardShareMapCardProps[]>([]);
  const [hotMaps, setHotMaps] = useState<DashboardShareMapCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/roadmaps/shared');
        const raw: RawRoadmap[] = res.data.roadmaps;

        const mapped: DashboardShareMapCardProps[] = await Promise.all(
          raw.map(async (item) => {
            // 참여자 수 조회
            try {
              const editorsRes = await axiosInstance.get(
                `/roadmaps/${item.id}/editors`
              );
              const participants = editorsRes.data.count ?? 0;

              return {
                id: item.id,
                title: item.title,
                thumbnail: item.thumbnail || '',
                categoryName: item.category?.name ?? '카테고리 없음',
                viewCount: item.viewCount,
                participants,
                likeCount: item.likeCount,
                createdAt: item.createdAt,
              };
            } catch (error) {
              console.error('참여자 수 조회 실패:', error);
              return {
                id: item.id,
                title: item.title,
                thumbnail: item.thumbnail || '',
                categoryName: item.category?.name ?? '카테고리 없음',
                viewCount: item.viewCount,
                participants: 0,
                likeCount: 0,
                createdAt: item.createdAt || '',
              };
            }
          })
        );

        const hot = [...mapped]
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, 3);

        setShareMaps(mapped);
        setHotMaps(hot);
      } catch (error) {
        console.error(error);
        toast.error('공유지도 데이터를 불러오는데 실패했습니다.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Banner
        title="공유지도"
        subtitle="여러 유저들과 협업하여 지도를 만들어요"
      />
      <EventBox type="sharemap" data={hotMaps} />
      <ShareMapCardList data={shareMaps} />
      <WriteButton type="sharemap" />
    </>
  );
}
