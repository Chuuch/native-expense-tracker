import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global query options
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Global mutation options
      retry: false, // Don't retry mutations by default
    },
  },
});

// Query keys for consistent caching
export const queryKeys = {
  auth: {
    profile: ['auth', 'profile'] as const,
  },
  transactions: {
    all: ['transactions'] as const,
    lists: () => [...queryKeys.transactions.all, 'list'] as const,
    list: (filters: any) => [...queryKeys.transactions.lists(), filters] as const,
    details: () => [...queryKeys.transactions.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.transactions.details(), id] as const,
  },
  analytics: {
    summary: (period: string) => ['analytics', 'summary', period] as const,
    categories: (period: string) => ['analytics', 'categories', period] as const,
    trends: (period: string) => ['analytics', 'trends', period] as const,
  },
  savingsGoals: {
    all: ['savings-goals'] as const,
    lists: () => [...queryKeys.savingsGoals.all, 'list'] as const,
    list: (filters: any) => [...queryKeys.savingsGoals.lists(), filters] as const,
    details: () => [...queryKeys.savingsGoals.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.savingsGoals.details(), id] as const,
  },
};

// Utility function to clear all queries (useful for logout)
export const clearAllQueries = () => {
  queryClient.clear();
};

// Utility function to invalidate auth-related queries
export const invalidateAuthQueries = () => {
  queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
};

// Utility function to invalidate transaction queries
export const invalidateTransactionQueries = () => {
  queryClient.invalidateQueries({ queryKey: queryKeys.transactions.lists() });
};

// Utility function to invalidate analytics queries
export const invalidateAnalyticsQueries = () => {
  queryClient.invalidateQueries({ queryKey: ['analytics'] });
};
