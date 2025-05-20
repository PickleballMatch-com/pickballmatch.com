'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { api } from './client';
import superjson from 'superjson';

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 0,
        onError: (error) => {
          console.error('API mutation error:', error);
        },
      },
    },
  }));
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: `/api/trpc`,
          // Use relative URL which will work in all environments
          // Add custom headers if needed
          headers() {
            return {
              'Content-Type': 'application/json',
            };
          },
        }),
      ],
      transformer: superjson,
    })
  );

  // Log environment info for debugging
  console.log("Environment:", {
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
    isVercel: typeof window !== 'undefined' && !window.location.hostname.includes('localhost'),
    protocol: typeof window !== 'undefined' ? window.location.protocol : 'N/A',
  });

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
} 