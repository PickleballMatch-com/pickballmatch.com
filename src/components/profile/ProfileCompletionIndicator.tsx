'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { calculateProfileCompletionPercentage, getMissingProfileFields } from '@/lib/utils/profileUtils';
import type { User, PlayerProfile } from '@/lib/types/profile';

interface ProfileCompletionIndicatorProps {
  user: User | null | undefined;
  playerProfile: PlayerProfile | null | undefined;
  showMissingFields?: boolean;
  className?: string;
}

export default function ProfileCompletionIndicator({
  user,
  playerProfile,
  showMissingFields = false,
  className
}: ProfileCompletionIndicatorProps) {
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
  
  // Calculate completion with normalized data
  const completionPercentage = calculateProfileCompletionPercentage(normalizedUser, normalizedPlayerProfile);
  const missingFields = getMissingProfileFields(normalizedUser, normalizedPlayerProfile);
  
  // Log debug information
  console.log("ProfileCompletionIndicator normalized data:", { 
    userDates: normalizedUser ? {
      createdAt: normalizedUser.createdAt,
      updatedAt: normalizedUser.updatedAt,
      lastActive: normalizedUser.lastActive
    } : null,
    playerProfileFields: normalizedPlayerProfile ? {
      hasStrengths: Array.isArray(normalizedPlayerProfile.strengths),
      hasWeaknesses: Array.isArray(normalizedPlayerProfile.weaknesses),
      strengthsLength: normalizedPlayerProfile.strengths?.length
    } : null,
    completionPercentage,
    missingFields
  });
  
  // Determine color based on completion percentage
  const getProgressBarColor = () => {
    if (completionPercentage < 30) return 'bg-red-500';
    if (completionPercentage < 60) return 'bg-yellow-500';
    if (completionPercentage < 90) return 'bg-blue-500';
    return 'bg-green-500';
  };
  
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Profile Completion</span>
        <span className="text-sm font-semibold text-gray-900">{completionPercentage}%</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out',
            getProgressBarColor()
          )}
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
      
      {/* Missing fields */}
      {showMissingFields && missingFields.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-gray-600 mb-1">
            Complete these fields to improve your profile:
          </p>
          <ul className="text-xs text-gray-500">
            {missingFields.slice(0, 3).map((field, index) => (
              <li key={index}>• {field}</li>
            ))}
            {missingFields.length > 3 && (
              <li className="text-gray-400">• {missingFields.length - 3} more...</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export function ProfileCompletionIndicatorCompact({
  user,
  playerProfile,
  className
}: ProfileCompletionIndicatorProps) {
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
  
  const completionPercentage = calculateProfileCompletionPercentage(normalizedUser, normalizedPlayerProfile);
  
  // Determine color based on completion percentage
  const getProgressBarColor = () => {
    if (completionPercentage < 30) return 'bg-red-500';
    if (completionPercentage < 60) return 'bg-yellow-500';
    if (completionPercentage < 90) return 'bg-blue-500';
    return 'bg-green-500';
  };
  
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <span className="text-xs text-gray-600">Profile:</span>
      <div className="w-20 bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out',
            getProgressBarColor()
          )}
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700">{completionPercentage}%</span>
    </div>
  );
}