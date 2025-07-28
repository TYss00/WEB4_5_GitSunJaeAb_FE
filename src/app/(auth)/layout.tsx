import RequireGuest from '@/components/auth/RequireGuest';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RequireGuest>{children}</RequireGuest>;
}
