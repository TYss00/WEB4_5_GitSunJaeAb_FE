import Banner from '@/components/dashboard/Banner';
import CardList from '@/components/dashboard/CardList';
import EventBox from '@/components/dashboard/EventBox';
import WriteButton from '@/components/dashboard/WriteButton';

export default async function page() {
  return (
    <>
      <Banner title="퀘스트" subtitle="당신만의 퀘스트를 만들어보세요" />
      <EventBox type="quest" />
      <CardList type="quest" />
      <WriteButton type="quest" />
    </>
  );
}
