import ShareMapDashboard from '@/components/sharemap/ShareMapDashboard';

export const metadata = {
  title: '공유지도',
};

export default async function page() {
  return (
    <>
      <ShareMapDashboard />
    </>
  );
}
