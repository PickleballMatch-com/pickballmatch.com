import ProfileCompletionGuard from '@/components/profile/ProfileCompletionGuard';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileCompletionGuard>
      {children}
    </ProfileCompletionGuard>
  );
}