'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculateProfileCompletionPercentage, getMissingProfileFields, isProfileComplete } from '@/lib/utils/profileUtils';
import type { User, PlayerProfile } from '@/lib/types/profile';

interface ProfileCompletionPromptProps {
  user: User | null | undefined;
  playerProfile: PlayerProfile | null | undefined;
  className?: string;
  variant?: 'banner' | 'card';
}

export default function ProfileCompletionPrompt({
  user,
  playerProfile,
  className,
  variant = 'banner'
}: ProfileCompletionPromptProps) {
  // Ensure dates are properly converted from strings if needed
  const normalizedUser = user ? {
    ...user,
    createdAt: user.createdAt instanceof Date ? user.createdAt : 
               typeof user.createdAt === 'string' ? new Date(user.createdAt) : new Date(),
    updatedAt: user.updatedAt instanceof Date ? user.updatedAt : 
               typeof user.updatedAt === 'string' ? new Date(user.updatedAt) : new Date(),
    lastActive: user.lastActive instanceof Date ? user.lastActive : 
                typeof user.lastActive === 'string' ? new Date(user.lastActive) : null,
  } : null;
  
  // Ensure player profile arrays are initialized and dates are converted
  const normalizedPlayerProfile = playerProfile ? {
    ...playerProfile,
    updatedAt: playerProfile.updatedAt instanceof Date ? playerProfile.updatedAt : 
               typeof playerProfile.updatedAt === 'string' ? new Date(playerProfile.updatedAt) : new Date(),
    strengths: Array.isArray(playerProfile.strengths) ? playerProfile.strengths : [],
    weaknesses: Array.isArray(playerProfile.weaknesses) ? playerProfile.weaknesses : [],
    gameplayVideos: Array.isArray(playerProfile.gameplayVideos) ? playerProfile.gameplayVideos : [],
    equipmentIds: Array.isArray(playerProfile.equipmentIds) ? playerProfile.equipmentIds : [],
    matchTypes: Array.isArray(playerProfile.matchTypes) ? playerProfile.matchTypes : [],
  } : null;

  // Log debug information
  console.log("ProfileCompletionPrompt normalized data:", { 
    userDates: normalizedUser ? {
      createdAt: normalizedUser.createdAt,
      updatedAt: normalizedUser.updatedAt,
    } : null,
    playerProfileFields: normalizedPlayerProfile ? {
      hasStrengths: Array.isArray(normalizedPlayerProfile.strengths),
      strengthsLength: normalizedPlayerProfile.strengths?.length
    } : null
  });

  const completionPercentage = calculateProfileCompletionPercentage(normalizedUser, normalizedPlayerProfile);
  const isComplete = isProfileComplete(normalizedUser, normalizedPlayerProfile);
  const missingFields = getMissingProfileFields(normalizedUser, normalizedPlayerProfile);
  
  // Don't show prompt if profile is complete
  if (isComplete) {
    return null;
  }
  
  // Determine alert severity based on completion
  const getSeverity = () => {
    if (completionPercentage < 30) return 'error';
    if (completionPercentage < 60) return 'warning';
    return 'info';
  };
  
  const severity = getSeverity();
  
  const severityStyles = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      title: 'text-red-900',
      text: 'text-red-700',
      button: 'bg-red-600 hover:bg-red-700 text-white'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      title: 'text-yellow-900',
      text: 'text-yellow-700',
      button: 'bg-yellow-600 hover:bg-yellow-700 text-white'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-900',
      text: 'text-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  };
  
  const styles = severityStyles[severity];
  
  if (variant === 'banner') {
    return (
      <div className={cn(
        'p-4 rounded-lg border',
        styles.bg,
        styles.border,
        className
      )}>
        <div className="flex items-start">
          <AlertCircle className={cn('h-5 w-5 mt-0.5', styles.icon)} />
          <div className="ml-3 flex-1">
            <h3 className={cn('text-sm font-medium', styles.title)}>
              Complete your profile to get better matches!
            </h3>
            <p className={cn('mt-1 text-sm', styles.text)}>
              Your profile is {completionPercentage}% complete. Add more information to help other players find you.
            </p>
            {missingFields.length > 0 && (
              <p className={cn('mt-1 text-xs', styles.text)}>
                Missing: {missingFields.slice(0, 3).join(', ')}
                {missingFields.length > 3 && `, and ${missingFields.length - 3} more`}
              </p>
            )}
          </div>
          <Link
            href="/profile/edit"
            className={cn(
              'ml-4 inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
              styles.button
            )}
          >
            Complete Profile
            <ChevronRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }
  
  // Card variant
  return (
    <div className={cn(
      'p-6 rounded-lg border bg-white shadow-sm',
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          {completionPercentage === 100 ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className={cn('h-5 w-5', styles.icon)} />
          )}
          <h3 className="ml-2 text-lg font-semibold text-gray-900">
            Profile Completion
          </h3>
        </div>
        <span className="text-lg font-bold text-gray-900">
          {completionPercentage}%
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out',
            completionPercentage < 30 ? 'bg-red-500' :
            completionPercentage < 60 ? 'bg-yellow-500' :
            completionPercentage < 90 ? 'bg-blue-500' :
            'bg-green-500'
          )}
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        A complete profile helps you find better match partners and shows others you&apos;re serious about playing.
      </p>
      
      {missingFields.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            To complete your profile, add:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            {missingFields.slice(0, 5).map((field, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                {field}
              </li>
            ))}
            {missingFields.length > 5 && (
              <li className="text-gray-500 italic">
                And {missingFields.length - 5} more...
              </li>
            )}
          </ul>
        </div>
      )}
      
      <Link
        href="/profile/edit"
        className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
      >
        Complete Your Profile
        <ChevronRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}