import Banner from '@/components/dashboard/Banner';
import CardList from '@/components/dashboard/CardList';
import EventBox from '@/components/dashboard/EventBox';
import WriteButton from '@/components/dashboard/WriteButton';

export const metadata = {
  title: '로드맵',
};

export default async function page() {
  return (
    <>
      <Banner title="로드맵" subtitle="당신만의 로드맵을 만들어보세요" />
      {/* <PopularLoadmap /> */}
      <EventBox type="roadmap" />
      <CardList type="roadmap" />
      <WriteButton type="roadmap" />
    </>
  );
}
