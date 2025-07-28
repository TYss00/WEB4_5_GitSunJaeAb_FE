import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

export const metadata = {
  title: '관리자',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header isAdmin />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
