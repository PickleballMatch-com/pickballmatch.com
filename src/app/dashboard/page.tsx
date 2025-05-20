'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { useProfileSync } from '@/lib/hooks/useProfileSync';
import ProfileCompletionPrompt from '@/components/profile/ProfileCompletionPrompt';
import { ProfileCompletionIndicatorCompact } from '@/components/profile/ProfileCompletionIndicator';

export default function Dashboard() {
  const { user } = useUser();
  const { profileData } = useProfileSync();
  const [activeTab, setActiveTab] = useState('matches');

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Please sign in to access your dashboard.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Completion Prompt */}
        <ProfileCompletionPrompt
          user={profileData?.user}
          playerProfile={profileData?.playerProfile}
          className="mb-6"
          variant="banner"
        />
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Image
              src={user.imageUrl || 'https://via.placeholder.com/80'}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full h-20 w-20 object-cover"
              unoptimized
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                Welcome, {user.firstName || 'Player'}!
              </h1>
              <p className="text-gray-600">
                Manage your pickleball matches and profile
              </p>
              <ProfileCompletionIndicatorCompact
                user={profileData?.user}
                playerProfile={profileData?.playerProfile}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('matches')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'matches'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                My Matches
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'requests'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Match Requests
              </button>
              <button
                onClick={() => setActiveTab('find')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'find'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Find Players
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                My Profile
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'matches' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
                <div className="text-center py-8 text-gray-500">
                  <p>You don&apos;t have any upcoming matches.</p>
                  <Link
                    href="#"
                    onClick={() => setActiveTab('find')}
                    className="text-blue-600 hover:underline inline-block mt-2"
                  >
                    Find players to match with
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'requests' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Match Requests</h2>
                <div className="text-center py-8 text-gray-500">
                  <p>You don&apos;t have any pending match requests.</p>
                </div>
              </div>
            )}

            {activeTab === 'find' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Find Players</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* This would be populated from the API */}
                  <div className="border rounded-lg p-4">
                    <p className="text-center py-8 text-gray-500">
                      Players will appear here once you complete your profile.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">My Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skill Level
                    </label>
                    <select
                      className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select your skill level</option>
                      <option value="2.5">2.5</option>
                      <option value="3.0">3.0</option>
                      <option value="3.5">3.5</option>
                      <option value="4.0">4.0</option>
                      <option value="4.5">4.5</option>
                      <option value="5.0">5.0</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Play Style
                    </label>
                    <select
                      className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select your preference</option>
                      <option value="singles">Singles</option>
                      <option value="doubles">Doubles</option>
                      <option value="mixed">Mixed Doubles</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Years Playing
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Central Park Courts"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      rows={3}
                      className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell others about yourself and your pickleball journey"
                    />
                  </div>
                  <div className="md:col-span-2 mt-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 