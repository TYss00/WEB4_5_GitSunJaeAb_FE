import RequireLogin from '@/components/auth/RequireLogin';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RequireLogin>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </RequireLogin>
  );
}
