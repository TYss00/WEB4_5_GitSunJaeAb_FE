import Banner from '@/components/dashboard/Banner';
import CardList from '@/components/dashboard/CardList';
import EventBox from '@/components/dashboard/EventBox';
import WriteButton from '@/components/dashboard/WriteButton';

export default async function page() {
  return (
    <>
      <Banner />
      <EventBox />
      <CardList />
      <WriteButton />
    </>
  );
}
