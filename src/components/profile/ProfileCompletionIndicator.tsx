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
  const completionPercentage = calculateProfileCompletionPercentage(user, playerProfile);
  const missingFields = getMissingProfileFields(user, playerProfile);
  
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
  const completionPercentage = calculateProfileCompletionPercentage(user, playerProfile);
  
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