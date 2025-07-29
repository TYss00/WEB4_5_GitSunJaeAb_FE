import TanstackProvider from '@/providers/TanstackProvider';
import '../styles/index.css';
import InitAuthProvider from '@/providers/InitAuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: {
    default: 'MAPICK',
    template: 'MAPICK | %s',
  },
  description: 'MAPICK',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <TanstackProvider>
            <InitAuthProvider>
              {children}
              <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
              />
            </InitAuthProvider>
          </TanstackProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
