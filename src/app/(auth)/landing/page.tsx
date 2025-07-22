import Footer from '@/components/common/Footer';
import LandingHeader from '@/components/landingpage/LandingHeader';
import LandingPage from '@/components/landingpage/LandingPage';

export default async function page() {
  return (
    <>
      <LandingHeader />
      <LandingPage />
      <Footer />
    </>
  );
}
