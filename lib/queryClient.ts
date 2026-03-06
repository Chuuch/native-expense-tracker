import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount: number, error: any) => {
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: false,
    },
  },
});

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

export const clearAllQueries = () => {
  queryClient.clear();
};

export const invalidateAuthQueries = () => {
  queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
};

export const invalidateTransactionQueries = () => {
  queryClient.invalidateQueries({ queryKey: queryKeys.transactions.lists() });
};

export const invalidateAnalyticsQueries = () => {
  queryClient.invalidateQueries({ queryKey: ['analytics'] });
};
