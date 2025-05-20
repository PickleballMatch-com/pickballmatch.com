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
      console.log("Profile data retrieved:", data);
      console.log("Raw profile data types:", {
        userObject: data?.user ? {
          createdAtType: typeof data.user.createdAt,
          updatedAtType: typeof data.user.updatedAt,
          lastActiveType: typeof data.user.lastActive,
          isCreatedAtDate: data.user.createdAt instanceof Date,
          sample: JSON.stringify(data.user).substring(0, 100) + "..."
        } : null,
        playerProfileObject: data?.playerProfile ? {
          updatedAtType: typeof data.playerProfile.updatedAt,
          isUpdatedAtDate: data.playerProfile.updatedAt instanceof Date,
          strengthsType: typeof data.playerProfile.strengths,
          isStrengthsArray: Array.isArray(data.playerProfile.strengths),
          weaknessesType: typeof data.playerProfile.weaknesses,
          isWeaknessesArray: Array.isArray(data.playerProfile.weaknesses),
          sample: JSON.stringify(data.playerProfile).substring(0, 100) + "..."
        } : null,
        environment: typeof window !== 'undefined' ? {
          isVercel: !window.location.hostname.includes('localhost'),
          hostname: window.location.hostname
        } : 'server-side'
      });

      if (syncFailed && data?.user) {
        // If we previously failed to sync but we have user data,
        // that means we can use the existing profile
        console.log("Found existing profile, no need to sync");
      }
      
      // Create a working copy of the data to fix any issues
      const fixedData = { ...data };
      
      // Fix date objects in user data if needed
      if (fixedData?.user) {
        try {
          if (typeof fixedData.user.createdAt === 'string') {
            console.log("Converting createdAt from string to Date", { 
              original: fixedData.user.createdAt,
              dateObj: new Date(fixedData.user.createdAt)
            });
            fixedData.user.createdAt = new Date(fixedData.user.createdAt);
          }
          if (typeof fixedData.user.updatedAt === 'string') {
            console.log("Converting updatedAt from string to Date", { 
              original: fixedData.user.updatedAt,
              dateObj: new Date(fixedData.user.updatedAt)
            });
            fixedData.user.updatedAt = new Date(fixedData.user.updatedAt);
          }
          if (typeof fixedData.user.lastActive === 'string') {
            console.log("Converting lastActive from string to Date", { 
              original: fixedData.user.lastActive,
              dateObj: new Date(fixedData.user.lastActive)
            });
            fixedData.user.lastActive = new Date(fixedData.user.lastActive);
          }
        } catch (e) {
          console.error("Error converting date strings to Date objects:", e);
        }
      }
      
      // Additional check for empty arrays and fix player profile data
      if (fixedData?.playerProfile) {
        try {
          // Convert date strings to Date objects
          if (typeof fixedData.playerProfile.updatedAt === 'string') {
            console.log("Converting profile updatedAt from string to Date", { 
              original: fixedData.playerProfile.updatedAt,
              dateObj: new Date(fixedData.playerProfile.updatedAt)
            });
            fixedData.playerProfile.updatedAt = new Date(fixedData.playerProfile.updatedAt);
          }
          
          // Ensure arrays are properly initialized
          if (!Array.isArray(fixedData.playerProfile.strengths)) {
            console.log("Fixing strengths array:", { 
              before: fixedData.playerProfile.strengths,
              fixed: []
            });
            fixedData.playerProfile.strengths = [];
          }
            
          if (!Array.isArray(fixedData.playerProfile.weaknesses)) {
            console.log("Fixing weaknesses array:", { 
              before: fixedData.playerProfile.weaknesses,
              fixed: []
            });
            fixedData.playerProfile.weaknesses = [];
          }
            
          if (!Array.isArray(fixedData.playerProfile.gameplayVideos)) {
            console.log("Fixing gameplayVideos array:", { 
              before: fixedData.playerProfile.gameplayVideos,
              fixed: []
            });
            fixedData.playerProfile.gameplayVideos = [];
          }
            
          if (!Array.isArray(fixedData.playerProfile.equipmentIds)) {
            console.log("Fixing equipmentIds array:", { 
              before: fixedData.playerProfile.equipmentIds,
              fixed: []
            });
            fixedData.playerProfile.equipmentIds = [];
          }
            
          if (!Array.isArray(fixedData.playerProfile.matchTypes)) {
            console.log("Fixing matchTypes array:", { 
              before: fixedData.playerProfile.matchTypes,
              fixed: []
            });
            fixedData.playerProfile.matchTypes = [];
          }
        } catch (e) {
          console.error("Error fixing player profile data:", e);
        }
      }
      
      // Update the reference to the fixed data
      Object.assign(data, fixedData);
      
      // Log the fixed data
      console.log("Fixed profile data types:", {
        userObject: data?.user ? {
          createdAtType: typeof data.user.createdAt,
          updatedAtType: typeof data.user.updatedAt,
          lastActiveType: typeof data.user.lastActive,
          isCreatedAtDate: data.user.createdAt instanceof Date
        } : null,
        playerProfileObject: data?.playerProfile ? {
          updatedAtType: typeof data.playerProfile.updatedAt,
          isUpdatedAtDate: data.playerProfile.updatedAt instanceof Date,
          strengthsType: typeof data.playerProfile.strengths,
          isStrengthsArray: Array.isArray(data.playerProfile.strengths),
          strengthsLength: Array.isArray(data.playerProfile.strengths) ? data.playerProfile.strengths.length : 'not an array'
        } : null
      });
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