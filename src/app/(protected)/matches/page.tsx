'use client';

import { useUser } from '@clerk/nextjs';
import { useProfileSync } from '@/lib/hooks/useProfileSync';

export default function MatchesPage() {
  const { user } = useUser();
  const { profileData } = useProfileSync();

  if (!user || !profileData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Matches</h1>
      
      {/* This page is protected by ProfileCompletionGuard */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">
          Welcome, {user.firstName}! You have completed your profile and can now find matches.
        </p>
        
        {profileData.playerProfile && (
          <div className="space-y-2">
            <p><strong>Skill Level:</strong> {profileData.playerProfile.skillLevel}</p>
            <p><strong>Play Style:</strong> {profileData.playerProfile.preferredPlayStyle || 'Any'}</p>
            <p><strong>Location:</strong> {profileData.playerProfile.preferredLocation || 'Not specified'}</p>
          </div>
        )}
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Available Players Near You</h2>
          <p className="text-gray-600">Match functionality coming soon...</p>
        </div>
      </div>
    </main>
  );
}