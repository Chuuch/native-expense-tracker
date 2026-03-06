import { useQuery } from '@tanstack/react-query';
import { analyticsAPI } from '../lib/api';
import { queryKeys } from '../lib/queryClient';

export function useAnalytics(period: string = 'month') {
  // Get analytics summary
  const {
    data: summary,
    isLoading: isLoadingSummary,
    error: summaryError,
    refetch: refetchSummary,
  } = useQuery({
    queryKey: queryKeys.analytics.summary(period),
    queryFn: () => analyticsAPI.getSummary(period),
    enabled: true,
  });

  // Get category breakdown
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: queryKeys.analytics.categories(period),
    queryFn: () => analyticsAPI.getCategoryBreakdown(period),
    enabled: true,
  });

  // Get trends data
  const {
    data: trends,
    isLoading: isLoadingTrends,
    error: trendsError,
    refetch: refetchTrends,
  } = useQuery({
    queryKey: queryKeys.analytics.trends(period),
    queryFn: () => analyticsAPI.getTrends(period),
    enabled: true,
  });

  // Refetch all analytics data
  const refetchAll = () => {
    refetchSummary();
    refetchCategories();
    refetchTrends();
  };

  return {
    // Data
    summary,
    categories: categories || [],
    trends: trends || [],
    
    // State
    isLoading: isLoadingSummary || isLoadingCategories || isLoadingTrends,
    isLoadingSummary,
    isLoadingCategories,
    isLoadingTrends,
    
    // Errors
    error: summaryError || categoriesError || trendsError,
    summaryError,
    categoriesError,
    trendsError,
    
    // Actions
    refetchSummary,
    refetchCategories,
    refetchTrends,
    refetchAll,
  };
}
