'use client';

import { useState } from 'react';
import { SignIn, SignUp } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type AuthModalProps = {
  initialView?: 'sign-in' | 'sign-up';
  triggerLabel?: string;
};

export default function AuthModal({ 
  initialView = 'sign-in',
  triggerLabel = 'Sign In'
}: AuthModalProps) {
  const [view, setView] = useState<'sign-in' | 'sign-up'>(initialView);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {view === 'sign-in' ? (
          <div className="flex flex-col items-center">
            <DialogTitle className="sr-only">Sign In</DialogTitle>
            <SignIn signUpUrl="" routing="hash" afterSignInUrl="/" />
            <p className="mt-4 text-sm text-center">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => setView('sign-up')}
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <DialogTitle className="sr-only">Sign Up</DialogTitle>
            <SignUp signInUrl="" routing="hash" afterSignUpUrl="/" />
            <p className="mt-4 text-sm text-center">
              Already have an account?{' '}
              <button
                onClick={() => setView('sign-in')}
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}