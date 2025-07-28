import RequireAdmin from '@/components/auth/RequireAdmin';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

export const metadata = {
  title: '관리자',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RequireAdmin>
        {' '}
        <div className="min-h-screen flex flex-col">
          <Header isAdmin />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </RequireAdmin>
    </>
  );
}
