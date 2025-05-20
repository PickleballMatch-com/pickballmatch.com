'use client';

import dynamic from 'next/dynamic';

// Dynamically import the AuthNav component
const AuthNav = dynamic(() => import('@/components/auth/AuthNav'), {
  ssr: false,
  loading: () => <div className="h-9 w-40 bg-gray-200 animate-pulse rounded" />
});

export default function Header() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <AuthNav />
    </header>
  );
}