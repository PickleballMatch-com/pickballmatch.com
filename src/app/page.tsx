'use client';

import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  const { isSignedIn, user } = useUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-green-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-800">
          Welcome to Pickleball Match
        </h1>
        <p className="text-center text-lg mb-8 text-gray-600">
          Connect with pickleball players in your area, schedule matches, and improve your game.
        </p>
        
        <div className="flex justify-center mb-8">
          {isSignedIn ? (
            <div className="text-center">
              <p className="mb-4 text-xl">
                Welcome back, {user.firstName || 'Player'}!
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                <Link
                  href="/dashboard"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Go to Dashboard
                </Link>
                <SignOutButton>
                  <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-xl">
                Sign in to find your next pickleball match
              </p>
              <SignInButton mode="modal">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Find Players</h3>
            <p>
              Browse players based on skill level, location, and availability.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Schedule Matches</h3>
            <p>
              Send match requests and manage your pickleball calendar.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Build Your Profile</h3>
            <p>
              Showcase your skills and find players at your level.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 