// src/components/islands/DashboardIsland.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { ThemeProvider } from '@/shared/components/providers/ThemeProvider';
import { AuthProvider } from '@/features/auth/providers/AuthProvider';
import { DashboardView } from '@/features/dashboard/components/DashboardView';

function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

export default function DashboardIsland() {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <DashboardView />
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}