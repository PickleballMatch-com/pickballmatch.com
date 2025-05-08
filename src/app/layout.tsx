import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { TRPCProvider } from '@/lib/trpc/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pickleball Match',
  description: 'Find pickleball players near you',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <TRPCProvider>
            {children}
          </TRPCProvider>
        </ClerkProvider>
      </body>
    </html>
  );
} 