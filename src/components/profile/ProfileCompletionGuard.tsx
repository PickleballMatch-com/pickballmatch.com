'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfileSync } from '@/lib/hooks/useProfileSync';
import { isProfileComplete } from '@/lib/utils/profileUtils';

interface ProfileCompletionGuardProps {
  children: React.ReactNode;
  threshold?: number; // Completion percentage threshold
  redirectTo?: string; // Where to redirect if profile is incomplete
  exemptPaths?: string[]; // Paths that don't require complete profile
}

export default function ProfileCompletionGuard({
  children,
  threshold = 70,
  redirectTo = '/profile/edit',
  exemptPaths = ['/profile', '/profile/edit', '/', '/sign-in', '/sign-up']
}: ProfileCompletionGuardProps) {
  const router = useRouter();
  const { profileData, isLoading } = useProfileSync();
  
  useEffect(() => {
    if (isLoading || !profileData?.user) return;
    
    // Check if current path is exempt
    const currentPath = window.location.pathname;
    const isExempt = exemptPaths.some(path => currentPath.startsWith(path));
    
    if (isExempt) return;
    
    // Check if profile is complete
    const isComplete = isProfileComplete(profileData.user, profileData.playerProfile, threshold);
    
    if (!isComplete) {
      // Redirect to profile completion page
      router.push(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [profileData, isLoading, router, threshold, redirectTo, exemptPaths]);
  
  // Don't render children until we've checked profile completion
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Checking profile...</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}