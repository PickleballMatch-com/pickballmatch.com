'use client';

import dynamic from 'next/dynamic';
import { SignedIn, SignedOut } from '@clerk/nextjs';

// Dynamically import the AuthModal component to avoid server/client mismatch
const AuthModal = dynamic(() => import('./AuthModal'), {
  ssr: false,
  loading: () => <div className="h-9 w-20 bg-gray-200 animate-pulse rounded" />
});

// Dynamically import the UserDropdown component
const UserDropdown = dynamic(() => import('./UserDropdown'), {
  ssr: false,
  loading: () => <div className="h-9 w-9 bg-gray-200 animate-pulse rounded-full" />
});

export default function AuthNav() {
  return (
    <div className="flex items-center gap-4">
      <SignedOut>
        <div className="flex gap-2">
          <AuthModal initialView="sign-in" triggerLabel="Sign In" />
          <AuthModal initialView="sign-up" triggerLabel="Sign Up" />
        </div>
      </SignedOut>
      <SignedIn>
        <UserDropdown />
      </SignedIn>
    </div>
  );
}