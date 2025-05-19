'use client';

import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NavbarProps {
  transparent?: boolean;
}

export const Navbar = ({ transparent = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 left-0 right-0 z-50 py-4 transition-all duration-200 ${
        scrolled || !transparent ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center text-primary font-bold">
              P
            </div>
            <span className="text-xl font-bold text-black">Pickleball Match</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/features"
              className={`text-gray-600 hover:text-black ${pathname === '/features' ? 'font-medium' : ''}`}
            >
              Features
            </Link>
            <Link 
              href="/how-it-works"
              className={`text-gray-600 hover:text-black ${pathname === '/how-it-works' ? 'font-medium' : ''}`}
            >
              How It Works
            </Link>
            <Link 
              href="/pricing"
              className={`text-gray-600 hover:text-black ${pathname === '/pricing' ? 'font-medium' : ''}`}
            >
              Pricing
            </Link>
            <Link 
              href="/login"
              className={`text-gray-600 hover:text-black ${pathname === '/login' ? 'font-medium' : ''}`}
            >
              Login
            </Link>
            <Button variant="primary" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
          
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </Container>
    </nav>
  );
};