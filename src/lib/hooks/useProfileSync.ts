import { useRef, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/lib/trpc/client';

export function useProfileSync() {
  // Use a ref to ensure we only attempt sync once per component lifecycle
  const syncAttempted = useRef(false);
  const [syncFailed, setSyncFailed] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const { user, isLoaded, isSignedIn } = useUser();

  // Get the current profile data from our database
  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch
  } = api.profiles.getCurrent.useQuery(undefined, {
    enabled: !!isSignedIn,
    retry: 1, // Limit retries to reduce unnecessary requests
    // Even if sync failed, we still want to try to get the profile
    // as it might exist from previous sessions
    onSuccess: (data) => {
      if (syncFailed && data?.user) {
        // If we previously failed to sync but we have user data,
        // that means we can use the existing profile
        console.log("Found existing profile, no need to sync");
      }
    }
  });

  // Set up the sync mutation
  const syncProfile = api.profiles.syncFromClerk.useMutation({
    onSuccess: () => {
      console.log("Profile synced successfully");
      refetch();
    },
    onError: (error) => {
      console.error("Error syncing profile:", error);
      setSyncFailed(true);
      setErrorDetails(error.message || "Unknown error");

      // Try to refetch the profile data anyway, as it might exist
      refetch();
    }
  });

  // Perform the sync when needed
  useEffect(() => {
    if (
      isLoaded &&
      isSignedIn &&
      user &&
      !syncAttempted.current &&
      !syncProfile.isPending &&
      !syncFailed
    ) {
      // Don't try to sync again after initial attempt
      syncAttempted.current = true;

      // Only sync if we don't have the user data or if explicitly needed
      if (!profileData?.user) {
        console.log("Initiating profile sync from Clerk...");
        try {
          const clerkData = {
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.primaryEmailAddress?.emailAddress || '',
            imageUrl: user.imageUrl || '',
          };

          console.log("Sending profile data:", JSON.stringify(clerkData));
          syncProfile.mutate(clerkData);
        } catch (err) {
          console.error("Failed to initiate sync:", err);
          setSyncFailed(true);
        }
      }
    }
  }, [isLoaded, isSignedIn, user, profileData, syncProfile, syncFailed]);

  return {
    profileData,
    isLoading: isProfileLoading && !syncFailed, // Don't show loading if sync failed
    isError: syncProfile.isError || syncFailed,
    error: errorDetails || syncProfile.error?.message,
    refetch
  };
}