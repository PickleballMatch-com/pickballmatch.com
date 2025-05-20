'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useProfileSync } from '@/lib/hooks/useProfileSync';
import ProfileCompletionPrompt from '@/components/profile/ProfileCompletionPrompt';
import ProfileCompletionIndicator from '@/components/profile/ProfileCompletionIndicator';

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // Use our custom hook to manage profile synchronization
  const { profileData, isLoading } = useProfileSync();
  
  // Debug logging
  useEffect(() => {
    console.log("Profile data loaded:", {
      hasProfileData: !!profileData,
      user: profileData?.user ? {
        id: profileData.user.id,
        hasName: !!profileData.user.firstName,
        createdAtType: profileData.user.createdAt ? typeof profileData.user.createdAt : 'undefined',
        isDateObject: profileData.user.createdAt instanceof Date
      } : null,
      playerProfile: profileData?.playerProfile ? {
        hasSkillLevel: !!profileData.playerProfile.skillLevel,
        strengthsIsArray: Array.isArray(profileData.playerProfile.strengths),
        strengthsLength: Array.isArray(profileData.playerProfile.strengths) ? profileData.playerProfile.strengths.length : 'not an array',
        dateIsString: typeof profileData.playerProfile.updatedAt === 'string'
      } : null,
      environment: {
        hostname: window.location.hostname,
        isVercel: !window.location.hostname.includes('localhost')
      }
    });
  }, [profileData]);

  // Redirect to login if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // CRITICAL FIX: Check if data is nested under json property
  const unwrappedProfileData = profileData?.json ? profileData.json : profileData;
  console.log("Profile page - unwrapped profile data:", {
    original: profileData,
    unwrapped: unwrappedProfileData,
    hasUserBeforeUnwrap: profileData ? !!profileData.user : false,
    hasPlayerProfileBeforeUnwrap: profileData ? !!profileData.playerProfile : false,
    hasUserAfterUnwrap: unwrappedProfileData ? !!unwrappedProfileData.user : false,
    hasPlayerProfileAfterUnwrap: unwrappedProfileData ? !!unwrappedProfileData.playerProfile : false
  });
  
  // We'll show the profile even if we have errors, as long as we have some user data
  const showLoading = isLoading && !unwrappedProfileData;
  if (showLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading profile data...</div>;
  }
  
  return (
    <main className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      {/* Profile Completion Prompt */}
      <ProfileCompletionPrompt
        user={unwrappedProfileData?.user}
        playerProfile={unwrappedProfileData?.playerProfile}
        className="mb-6"
        variant="card"
      />
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            {user.imageUrl && (
              <Image 
                src={user.imageUrl} 
                alt={user.fullName || 'Profile'} 
                width={128}
                height={128}
                className="w-full h-full object-cover"
                unoptimized
              />
            )}
          </div>
          
          {/* Basic Info */}
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-2">{user.fullName}</h2>
            <p className="text-gray-600 mb-2">{user.primaryEmailAddress?.emailAddress}</p>
            
            {/* Profile Completion Indicator */}
            <ProfileCompletionIndicator
              user={unwrappedProfileData?.user}
              playerProfile={unwrappedProfileData?.playerProfile}
              showMissingFields={false}
              className="mb-4"
            />
            
            {/* Display custom profile data from our database */}
            {unwrappedProfileData?.playerProfile ? (
              <div className="mt-4">
                <p className="font-medium">Skill Level: <span className="font-normal">{unwrappedProfileData.playerProfile.skillLevel}</span></p>
                {unwrappedProfileData.playerProfile.yearsPlaying && (
                  <p className="font-medium">Experience: <span className="font-normal">{unwrappedProfileData.playerProfile.yearsPlaying} years</span></p>
                )}
                {unwrappedProfileData.playerProfile.preferredPlayStyle && (
                  <p className="font-medium">Preferred Style: <span className="font-normal">{unwrappedProfileData.playerProfile.preferredPlayStyle}</span></p>
                )}
                {unwrappedProfileData.playerProfile.bio && (
                  <div className="mt-4">
                    <p className="font-medium">Bio:</p>
                    <p className="text-gray-700">{unwrappedProfileData.playerProfile.bio}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Complete your player profile to get matched with other players
              </p>
            )}
            
            <div className="mt-6">
              <button 
                onClick={() => router.push('/profile/edit')}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional profile sections could go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Playing Preferences</h3>
          {unwrappedProfileData?.playerProfile ? (
            <div>
              {unwrappedProfileData.playerProfile.playingFrequency && (
                <p className="font-medium">Frequency: <span className="font-normal">{unwrappedProfileData.playerProfile.playingFrequency}</span></p>
              )}
              {unwrappedProfileData.playerProfile.maxTravelDistance && (
                <p className="font-medium">Max Travel Distance: <span className="font-normal">{unwrappedProfileData.playerProfile.maxTravelDistance} miles</span></p>
              )}
              {unwrappedProfileData.playerProfile.isAvailableToPlay !== undefined && (
                <p className="font-medium">Available to Play: <span className="font-normal">{unwrappedProfileData.playerProfile.isAvailableToPlay ? 'Yes' : 'No'}</span></p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">No preferences set</p>
          )}
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Strengths & Weaknesses</h3>
          {unwrappedProfileData?.playerProfile ? (
              <div>
                {/* Handle strengths with more robust checks */}
                {(() => {
                  // Helper function to handle possibly non-array strengths
                  const getStrengthsArray = () => {
                    const strengths = profileData.playerProfile.strengths;
                    if (Array.isArray(strengths) && strengths.length > 0) {
                      return strengths;
                    } 
                    // Try to handle strengths if it's a string representation of an array
                    if (typeof strengths === 'string' && strengths.trim() !== '' && strengths !== '[]') {
                      try {
                        const parsed = JSON.parse(strengths);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                          return parsed;
                        }
                        return [strengths]; // If it's a string but not an array
                      } catch (e) {
                        // Not valid JSON, but still a string
                        return [strengths];
                      }
                    }
                    // Handle object with array-like properties
                    if (strengths && typeof strengths === 'object') {
                      const keys = Object.keys(strengths).filter(k => !isNaN(Number(k)));
                      if (keys.length > 0) {
                        return keys.map(k => strengths[k]);
                      }
                    }
                    return null;
                  };
                  
                  const strengthsArray = getStrengthsArray();
                  if (strengthsArray) {
                    return (
                      <div className="mb-4">
                        <p className="font-medium mb-2">Strengths:</p>
                        <ul className="list-disc list-inside">
                          {strengthsArray.map((strength, index) => (
                            <li key={index} className="text-gray-700">{strength}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return null;
                })()}
                
                {/* Handle weaknesses with more robust checks */}
                {(() => {
                  // Helper function to handle possibly non-array weaknesses
                  const getWeaknessesArray = () => {
                    const weaknesses = profileData.playerProfile.weaknesses;
                    if (Array.isArray(weaknesses) && weaknesses.length > 0) {
                      return weaknesses;
                    } 
                    // Try to handle weaknesses if it's a string representation of an array
                    if (typeof weaknesses === 'string' && weaknesses.trim() !== '' && weaknesses !== '[]') {
                      try {
                        const parsed = JSON.parse(weaknesses);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                          return parsed;
                        }
                        return [weaknesses]; // If it's a string but not an array
                      } catch (e) {
                        // Not valid JSON, but still a string
                        return [weaknesses];
                      }
                    }
                    // Handle object with array-like properties
                    if (weaknesses && typeof weaknesses === 'object') {
                      const keys = Object.keys(weaknesses).filter(k => !isNaN(Number(k)));
                      if (keys.length > 0) {
                        return keys.map(k => weaknesses[k]);
                      }
                    }
                    return null;
                  };
                  
                  const weaknessesArray = getWeaknessesArray();
                  if (weaknessesArray) {
                    return (
                      <div>
                        <p className="font-medium mb-2">Areas to Improve:</p>
                        <ul className="list-disc list-inside">
                          {weaknessesArray.map((weakness, index) => (
                            <li key={index} className="text-gray-700">{weakness}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            ) : (
              <p className="text-gray-500 italic">No strengths or weaknesses added</p>
            )
          }
        </div>
      </div>
    </main>
  );
}