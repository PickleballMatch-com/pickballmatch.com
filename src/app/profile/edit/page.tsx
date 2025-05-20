'use client';

import { useEffect, useState, Suspense } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/trpc/client';
import { useProfileSync } from '@/lib/hooks/useProfileSync';
import ProfileCompletionIndicator from '@/components/profile/ProfileCompletionIndicator';

// Create a component that uses searchParams
function EditProfileContent() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Use our custom hook to manage profile synchronization
  const { profileData, isLoading } = useProfileSync();
  
  const updateProfile = api.profiles.updatePlayerProfile.useMutation({
    onSuccess: () => {
      console.log("Profile updated successfully");
      
      // Check if there's a redirect parameter
      const redirectTo = searchParams.get('redirect');
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push('/profile');
      }
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      alert("Failed to update profile: " + error.message);
    }
  });
  
  // Form state
  const [formData, setFormData] = useState({
    skillLevel: '2.0', // Default to beginner
    preferredPlayStyle: '',
    yearsPlaying: 0,
    preferredLocation: '',
    bio: '',
    playingFrequency: '',
    maxTravelDistance: 0,
    isAvailableToPlay: true,
    strengths: [] as string[],
    weaknesses: [] as string[],
  });
  
  // New strength/weakness input fields
  const [newStrength, setNewStrength] = useState('');
  const [newWeakness, setNewWeakness] = useState('');
  
  // Set initial form data from profile
  useEffect(() => {
    if (profileData?.playerProfile) {
      setFormData({
        skillLevel: profileData.playerProfile.skillLevel || '',
        preferredPlayStyle: profileData.playerProfile.preferredPlayStyle || '',
        yearsPlaying: profileData.playerProfile.yearsPlaying || 0,
        preferredLocation: profileData.playerProfile.preferredLocation || '',
        bio: profileData.playerProfile.bio || '',
        playingFrequency: profileData.playerProfile.playingFrequency || '',
        maxTravelDistance: profileData.playerProfile.maxTravelDistance || 0,
        isAvailableToPlay: profileData.playerProfile.isAvailableToPlay ?? true,
        strengths: profileData.playerProfile.strengths || [],
        weaknesses: profileData.playerProfile.weaknesses || [],
      });
    }
  }, [profileData]);
  
  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'yearsPlaying' || name === 'maxTravelDistance') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Handle adding strengths and weaknesses
  const addStrength = () => {
    if (newStrength.trim()) {
      setFormData(prev => ({ 
        ...prev, 
        strengths: [...prev.strengths, newStrength.trim()]
      }));
      setNewStrength('');
    }
  };
  
  const addWeakness = () => {
    if (newWeakness.trim()) {
      setFormData(prev => ({ 
        ...prev, 
        weaknesses: [...prev.weaknesses, newWeakness.trim()]
      }));
      setNewWeakness('');
    }
  };
  
  // Handle removing strengths and weaknesses
  const removeStrength = (index: number) => {
    setFormData(prev => ({
      ...prev,
      strengths: prev.strengths.filter((_, i) => i !== index)
    }));
  };
  
  const removeWeakness = (index: number) => {
    setFormData(prev => ({
      ...prev,
      weaknesses: prev.weaknesses.filter((_, i) => i !== index)
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.skillLevel) {
      alert("Skill level is required");
      return;
    }
    
    // Convert empty strings to null for API validation
    const processValue = (value: any) => {
      if (value === '') return null;
      if (value === undefined) return null;
      return value;
    };
    
    // Prepare data in the exact shape expected by the API
    const profileData = {
      skillLevel: formData.skillLevel,
      preferredPlayStyle: processValue(formData.preferredPlayStyle),
      yearsPlaying: typeof formData.yearsPlaying === 'number' ? formData.yearsPlaying : null,
      preferredLocation: processValue(formData.preferredLocation),
      bio: processValue(formData.bio),
      maxTravelDistance: typeof formData.maxTravelDistance === 'number' ? formData.maxTravelDistance : null,
      isAvailableToPlay: typeof formData.isAvailableToPlay === 'boolean' ? formData.isAvailableToPlay : true,
      strengths: Array.isArray(formData.strengths) ? formData.strengths : [],
      weaknesses: Array.isArray(formData.weaknesses) ? formData.weaknesses : [],
      playingFrequency: processValue(formData.playingFrequency),
    };
    
    console.log("Submitting full profile data:", JSON.stringify(profileData));
    
    // Add debug info to the console
    console.log("Current environment:", {
      hostname: window.location.hostname,
      isLocal: window.location.hostname.includes('localhost'),
      protocol: window.location.protocol,
    });
    
    // Try with direct AJAX request as a fallback if tRPC is failing
    if (!window.location.hostname.includes('localhost')) {
      console.log("Using direct fetch approach as fallback");
      
      fetch(`${window.location.origin}/api/trpc/profiles.updatePlayerProfile?batch=1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ json: profileData }]),
      })
      .then(response => {
        console.log("Profile update response status:", response.status);
        return response.json();
      })
      .then(data => {
        console.log("Profile update success:", data);
        router.push('/profile');
      })
      .catch(error => {
        console.error("Profile update error with fetch:", error);
        alert(`Failed to update profile: ${error.message || 'Unknown error'}`);
      });
    } else {
      // Use tRPC approach locally
      try {
        updateProfile.mutate(profileData, {
          onSuccess: () => {
            console.log("Profile updated successfully!");
            router.push('/profile');
          },
          onError: (error) => {
            console.error("Profile update error:", error);
            
            // Add more detailed error info
            if (error.data?.zodError) {
              console.error("Validation errors:", error.data.zodError);
              const formErrors = Object.entries(error.data.zodError.fieldErrors || {})
                .map(([field, errors]) => `${field}: ${errors?.join(', ')}`)
                .join('\n');
                
              alert(`Validation errors:\n${formErrors || error.message}`);
            } else {
              alert(`Failed to update profile: ${error.message}`);
            }
          }
        });
      } catch (error) {
        console.error("Error in mutation:", error);
        alert("An error occurred while updating your profile");
      }
    }
  };
  
  // Redirect to login if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // We'll show the form even if we have errors, as long as we have some user data
  const showLoading = isLoading && !profileData;
  if (showLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading profile data...</div>;
  }
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
      
      {/* Profile Completion Indicator */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <ProfileCompletionIndicator
          user={profileData?.user ? {
            ...profileData.user,
            // Convert string dates back to Date objects for the indicator
            createdAt: new Date(profileData.user.createdAt),
            updatedAt: new Date(profileData.user.updatedAt),
            lastActive: profileData.user.lastActive ? new Date(profileData.user.lastActive) : null,
          } : null}
          playerProfile={profileData?.playerProfile ? {
            ...profileData.playerProfile,
            // Convert string date back to Date object
            updatedAt: new Date(profileData.playerProfile.updatedAt),
            // Override with form data, converting types as needed
            skillLevel: formData.skillLevel || profileData.playerProfile.skillLevel,
            preferredPlayStyle: formData.preferredPlayStyle,
            yearsPlaying: typeof formData.yearsPlaying === 'number' ? formData.yearsPlaying : null,
            preferredLocation: formData.preferredLocation,
            bio: formData.bio,
            maxTravelDistance: typeof formData.maxTravelDistance === 'number' ? formData.maxTravelDistance : null,
            isAvailableToPlay: formData.isAvailableToPlay,
            strengths: formData.strengths,
            weaknesses: formData.weaknesses,
            playingFrequency: formData.playingFrequency,
          } : null}
          showMissingFields={true}
        />
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Basic Player Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Level
              <select
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Select Skill Level</option>
                <option value="2.0">2.0 - Beginner</option>
                <option value="2.5">2.5</option>
                <option value="3.0">3.0 - Intermediate</option>
                <option value="3.5">3.5</option>
                <option value="4.0">4.0 - Advanced</option>
                <option value="4.5">4.5</option>
                <option value="5.0">5.0 - Professional</option>
              </select>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years Playing
              <input
                type="number"
                name="yearsPlaying"
                min="0"
                max="50"
                value={formData.yearsPlaying}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Play Style
              <select
                name="preferredPlayStyle"
                value={formData.preferredPlayStyle}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="">Select Play Style</option>
                <option value="singles">Singles</option>
                <option value="doubles">Doubles</option>
                <option value="mixed doubles">Mixed Doubles</option>
                <option value="any">Any</option>
              </select>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Playing Frequency
              <select
                name="playingFrequency"
                value={formData.playingFrequency}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="">Select Frequency</option>
                <option value="daily">Daily</option>
                <option value="several times a week">Several Times a Week</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="occasionally">Occasionally</option>
              </select>
            </label>
          </div>
          
          {/* Location & Travel */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Location
              <input
                type="text"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                placeholder="e.g. Downtown Courts, City Tennis Club"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Travel Distance (miles)
              <input
                type="number"
                name="maxTravelDistance"
                min="0"
                max="500"
                value={formData.maxTravelDistance}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="isAvailableToPlay"
                checked={formData.isAvailableToPlay}
                onChange={(e) => setFormData(prev => ({ ...prev, isAvailableToPlay: e.target.checked }))}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mr-2"
              />
              Available to Play
            </label>
          </div>
          
          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Tell other players about yourself..."
              />
            </label>
          </div>
          
          {/* Strengths */}
          <div className="md:col-span-2 border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Strengths</h3>
            <div className="mb-4">
              {formData.strengths.map((strength, index) => (
                <div key={index} className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2">
                  <span className="text-sm">{strength}</span>
                  <button 
                    type="button" 
                    onClick={() => removeStrength(index)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newStrength}
                onChange={(e) => setNewStrength(e.target.value)}
                placeholder="Add a strength..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              <button
                type="button"
                onClick={addStrength}
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Weaknesses */}
          <div className="md:col-span-2 border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Areas to Improve</h3>
            <div className="mb-4">
              {formData.weaknesses.map((weakness, index) => (
                <div key={index} className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2">
                  <span className="text-sm">{weakness}</span>
                  <button 
                    type="button" 
                    onClick={() => removeWeakness(index)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newWeakness}
                onChange={(e) => setNewWeakness(e.target.value)}
                placeholder="Add an area to improve..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              <button
                type="button"
                onClick={addWeakness}
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end gap-4 border-t pt-6">
          <button
            type="button"
            onClick={() => router.push('/profile')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
            disabled={updateProfile.isPending}
          >
            {updateProfile.isPending ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Default export with Suspense boundary
export default function EditProfilePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading profile editor...</div>}>
      <EditProfileContent />
    </Suspense>
  );
}