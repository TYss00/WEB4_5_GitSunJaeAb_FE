'use client';

import { useEffect, useState } from 'react';
import Banner from '../dashboard/Banner';
import EventBox from '../dashboard/EventBox';
import WriteButton from '../dashboard/WriteButton';
import ShareMapCardList from './ShareMapCardList';
import { DashboardShareMapCardProps } from '@/types/share';
import axiosInstance from '@/libs/axios';
import { toast } from 'react-toastify';

export default function ShareMapDashboard() {
  const [shareMaps, setShareMaps] = useState<DashboardShareMapCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/roadmaps/shared');
        const raw = res.data.roadmaps;

        const mapped = raw.map((item: any) => ({
          id: item.id,
          title: item.title,
          thumbnail: item.thumbnail || '',
          categoryName: item.category?.name ?? '카테고리 없음',
        }));

        setShareMaps(mapped);
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
      <EventBox type="sharemap" />
      <ShareMapCardList data={shareMaps} /> {/* ✅ 새로 만든 전용 CardList */}
      <WriteButton type="sharemap" />
    </>
  );
}
