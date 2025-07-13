import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import LandingPage from '@/components/landingpage/LandingPage';

export default async function page() {
  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
}
