import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateSavingsGoalData, SavingsGoal, savingsGoalAPI } from '../lib/api';
import { invalidateAnalyticsQueries, queryKeys } from '../lib/queryClient';

export function useSavingsGoals() {
  const queryClient = useQueryClient();

  // Get savings goals
  const {
    data: goals,
    isLoading: isLoadingGoals,
    error: goalsError,
    refetch: refetchGoals,
  } = useQuery({
    queryKey: queryKeys.savingsGoals.lists(),
    queryFn: savingsGoalAPI.getGoals,
    enabled: true,
  });

  // Create savings goal mutation
  const createGoalMutation = useMutation({
    mutationFn: savingsGoalAPI.createGoal,
    onSuccess: () => {
      // Invalidate and refetch goals
      queryClient.invalidateQueries({ queryKey: queryKeys.savingsGoals.lists() });
      // Invalidate analytics as goals affect financial calculations
      invalidateAnalyticsQueries();
    },
    onError: (error) => {
      console.error('Create savings goal failed:', error);
    },
  });

  // Update savings goal mutation
  const updateGoalMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<SavingsGoal> }) =>
      savingsGoalAPI.updateGoal(id, updates),
    onSuccess: (updatedGoal) => {
      // Update the goal in cache
      queryClient.setQueryData(
        queryKeys.savingsGoals.detail(updatedGoal.id),
        updatedGoal
      );
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: queryKeys.savingsGoals.lists() });
      // Invalidate analytics
      invalidateAnalyticsQueries();
    },
    onError: (error) => {
      console.error('Update savings goal failed:', error);
    },
  });

  // Delete savings goal mutation
  const deleteGoalMutation = useMutation({
    mutationFn: savingsGoalAPI.deleteGoal,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: queryKeys.savingsGoals.detail(deletedId),
      });
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: queryKeys.savingsGoals.lists() });
      // Invalidate analytics
      invalidateAnalyticsQueries();
    },
    onError: (error) => {
      console.error('Delete savings goal failed:', error);
    },
  });

  // Create goal function
  const createGoal = async (goal: CreateSavingsGoalData) => {
    return createGoalMutation.mutateAsync(goal);
  };

  // Update goal function
  const updateGoal = async (id: string, updates: Partial<SavingsGoal>) => {
    return updateGoalMutation.mutateAsync({ id, updates });
  };

  // Delete goal function
  const deleteGoal = async (id: string) => {
    return deleteGoalMutation.mutateAsync(id);
  };

  return {
    // Data
    goals: goals || [],
    
    // State
    isLoading: isLoadingGoals,
    isLoadingCreate: createGoalMutation.isPending,
    isLoadingUpdate: updateGoalMutation.isPending,
    isLoadingDelete: deleteGoalMutation.isPending,
    
    // Errors
    error: goalsError,
    createError: createGoalMutation.error,
    updateError: updateGoalMutation.error,
    deleteError: deleteGoalMutation.error,
    
    // Actions
    createGoal,
    updateGoal,
    deleteGoal,
    refetchGoals,
    
    // Mutations (for advanced usage)
    createGoalMutation,
    updateGoalMutation,
    deleteGoalMutation,
  };
}

// Hook for a single savings goal
export function useSavingsGoal(id: string) {
  const queryClient = useQueryClient();

  const {
    data: goal,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.savingsGoals.detail(id),
    queryFn: () => savingsGoalAPI.getGoals().then(goals => goals.find(g => g.id === id)),
    enabled: !!id,
  });

  return {
    goal,
    isLoading,
    error,
  };
}
