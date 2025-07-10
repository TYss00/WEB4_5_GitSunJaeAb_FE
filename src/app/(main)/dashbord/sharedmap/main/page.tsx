import Banner from '@/components/dashboard/Banner';
import CardList from '@/components/dashboard/CardList';
import EventBox from '@/components/dashboard/EventBox';
import WriteButton from '@/components/dashboard/WriteButton';

export default async function page() {
  return (
    <>
      <Banner
        title="공유지도"
        subtitle="여러 유저들과 협업하여 지도를 만들어요"
      />
      <EventBox />
      <CardList />
      <WriteButton />
    </>
  );
}
