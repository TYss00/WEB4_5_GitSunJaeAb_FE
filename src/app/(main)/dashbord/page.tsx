import ExplorebyTheme from '@/components/maindashbord/ExplorebyTheme';
import HotNow from '@/components/maindashbord/HotNow';
import ShareMap from '@/components/maindashbord/ShareMap';
import TrendingQuests from '@/components/maindashbord/TrendingQuests';

export default async function page() {
  return (
    <>
      <ExplorebyTheme />
      <HotNow />
      <ShareMap />
      <TrendingQuests />
    </>
  );
}
