'use client';

import { useState, useEffect } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';

export default function UserDropdown() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    if (user) {
      // Get user profile image
      const img = user.imageUrl;
      setImageUrl(img);
      
      // Get user name and email
      const name = user.firstName && user.lastName 
        ? `${user.firstName} ${user.lastName}`
        : user.username || 'User';
      
      setUserName(name);
      setUserEmail(user.primaryEmailAddress?.emailAddress || '');
    }
  }, [user]);

  if (!user) return null;

  const handleSignOut = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border border-gray-200 hover:border-primary transition-colors">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Profile"
              width={36}
              height={36}
              className="object-cover w-full h-full"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
              {userName.charAt(0)}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="font-bold">{userName}</span>
          <span className="text-xs text-gray-500">{userEmail}</span>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            My Profile
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/profile/settings" className="cursor-pointer">
            Account Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            Dashboard
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500 cursor-pointer">
          Sign out
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1 text-xs text-gray-500">
          Pickleball Match App
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}