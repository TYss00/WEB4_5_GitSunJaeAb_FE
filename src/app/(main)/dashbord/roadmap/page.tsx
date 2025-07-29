import Banner from '@/components/dashboard/Banner';
import CardList from '@/components/dashboard/CardList';
import WriteButton from '@/components/dashboard/WriteButton';
import PopularLoadmap from '@/components/loadmapdashbord/PopularLoadmap';

export const metadata = {
  title: '로드맵',
};

export default async function page() {
  return (
    <>
      <Banner title="로드맵" subtitle="로드맵 설명글" />
      <PopularLoadmap />
      <CardList type="roadmap" />
      <WriteButton type="roadmap" />
    </>
  );
}
