import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateTransactionData, Transaction, transactionAPI, TransactionFilters } from '../lib/api';
import { invalidateTransactionQueries, queryKeys } from '../lib/queryClient';

export function useTransactions(filters?: TransactionFilters) {
  const queryClient = useQueryClient();

  // Get transactions
  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    error: transactionsError,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: queryKeys.transactions.list(filters),
    queryFn: () => transactionAPI.getTransactions(filters),
    enabled: true, // Auto-fetch when filters change
  });

  // Create transaction mutation
  const createTransactionMutation = useMutation({
    mutationFn: transactionAPI.createTransaction,
    onSuccess: () => {
      // Invalidate and refetch transactions
      invalidateTransactionQueries();
    },
    onError: (error) => {
      console.error('Create transaction failed:', error);
    },
  });

  // Update transaction mutation
  const updateTransactionMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Transaction> }) =>
      transactionAPI.updateTransaction(id, updates),
    onSuccess: (updatedTransaction) => {
      // Update the transaction in cache
      queryClient.setQueryData(
        queryKeys.transactions.detail(updatedTransaction.id),
        updatedTransaction
      );
      // Invalidate list queries
      invalidateTransactionQueries();
    },
    onError: (error) => {
      console.error('Update transaction failed:', error);
    },
  });

  // Delete transaction mutation
  const deleteTransactionMutation = useMutation({
    mutationFn: transactionAPI.deleteTransaction,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: queryKeys.transactions.detail(deletedId),
      });
      // Invalidate list queries
      invalidateTransactionQueries();
    },
    onError: (error) => {
      console.error('Delete transaction failed:', error);
    },
  });

  // Create transaction function
  const createTransaction = async (transaction: CreateTransactionData) => {
    return createTransactionMutation.mutateAsync(transaction);
  };

  // Update transaction function
  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    return updateTransactionMutation.mutateAsync({ id, updates });
  };

  // Delete transaction function
  const deleteTransaction = async (id: string) => {
    return deleteTransactionMutation.mutateAsync(id);
  };

  return {
    // Data
    transactions: transactionsData?.data || [],
    pagination: transactionsData ? {
      total: transactionsData.total,
      page: transactionsData.page,
      limit: transactionsData.limit,
      totalPages: transactionsData.totalPages,
    } : null,
    
    // State
    isLoading: isLoadingTransactions,
    isLoadingCreate: createTransactionMutation.isPending,
    isLoadingUpdate: updateTransactionMutation.isPending,
    isLoadingDelete: deleteTransactionMutation.isPending,
    
    // Errors
    error: transactionsError,
    createError: createTransactionMutation.error,
    updateError: updateTransactionMutation.error,
    deleteError: deleteTransactionMutation.error,
    
    // Actions
    createTransaction,
    updateTransaction,
    deleteTransaction,
    refetchTransactions,
    
    // Mutations (for advanced usage)
    createTransactionMutation,
    updateTransactionMutation,
    deleteTransactionMutation,
  };
}

// Hook for a single transaction
export function useTransaction(id: string) {
  const {
    data: transaction,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.transactions.detail(id),
    queryFn: () => transactionAPI.getTransactions({ limit: 1 }).then(res => res.data[0]),
    enabled: !!id,
  });

  return {
    transaction,
    isLoading,
    error,
  };
}
