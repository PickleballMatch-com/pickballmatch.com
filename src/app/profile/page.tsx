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

  // Redirect to login if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // We'll show the profile even if we have errors, as long as we have some user data
  const showLoading = isLoading && !profileData;
  if (showLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading profile data...</div>;
  }
  
  return (
    <main className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      {/* Profile Completion Prompt */}
      <ProfileCompletionPrompt
        user={profileData?.user}
        playerProfile={profileData?.playerProfile}
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
              user={profileData?.user}
              playerProfile={profileData?.playerProfile}
              showMissingFields={false}
              className="mb-4"
            />
            
            {/* Display custom profile data from our database */}
            {profileData?.playerProfile ? (
              <div className="mt-4">
                <p className="font-medium">Skill Level: <span className="font-normal">{profileData.playerProfile.skillLevel}</span></p>
                {profileData.playerProfile.yearsPlaying && (
                  <p className="font-medium">Experience: <span className="font-normal">{profileData.playerProfile.yearsPlaying} years</span></p>
                )}
                {profileData.playerProfile.preferredPlayStyle && (
                  <p className="font-medium">Preferred Style: <span className="font-normal">{profileData.playerProfile.preferredPlayStyle}</span></p>
                )}
                {profileData.playerProfile.bio && (
                  <div className="mt-4">
                    <p className="font-medium">Bio:</p>
                    <p className="text-gray-700">{profileData.playerProfile.bio}</p>
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
          {profileData?.playerProfile ? (
            <div>
              {profileData.playerProfile.playingFrequency && (
                <p className="font-medium">Frequency: <span className="font-normal">{profileData.playerProfile.playingFrequency}</span></p>
              )}
              {profileData.playerProfile.maxTravelDistance && (
                <p className="font-medium">Max Travel Distance: <span className="font-normal">{profileData.playerProfile.maxTravelDistance} miles</span></p>
              )}
              {profileData.playerProfile.isAvailableToPlay !== undefined && (
                <p className="font-medium">Available to Play: <span className="font-normal">{profileData.playerProfile.isAvailableToPlay ? 'Yes' : 'No'}</span></p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">No preferences set</p>
          )}
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Strengths & Weaknesses</h3>
          {profileData?.playerProfile && 
            (profileData.playerProfile.strengths?.length || profileData.playerProfile.weaknesses?.length) ? (
              <div>
                {profileData.playerProfile.strengths?.length ? (
                  <div className="mb-4">
                    <p className="font-medium mb-2">Strengths:</p>
                    <ul className="list-disc list-inside">
                      {profileData.playerProfile.strengths.map((strength, index) => (
                        <li key={index} className="text-gray-700">{strength}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                
                {profileData.playerProfile.weaknesses?.length ? (
                  <div>
                    <p className="font-medium mb-2">Areas to Improve:</p>
                    <ul className="list-disc list-inside">
                      {profileData.playerProfile.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-gray-700">{weakness}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
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