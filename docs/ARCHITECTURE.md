# Architecture: TanStack Query + Zustand

This project uses a hybrid approach combining **TanStack Query** for server state and **Zustand** for client-only state. This architecture provides the best of both worlds: powerful server state management with automatic caching, and lightweight client state management.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    React Components                        │
├─────────────────────────────────────────────────────────────┤
│                    Custom Hooks                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐         │
│  │   useAuth   │ │useTransactions│ │useAnalytics │         │
│  └─────────────┘ └─────────────┘ └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                  TanStack Query                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐         │
│  │   Auth      │ │Transactions │ │ Analytics   │         │
│  │  Queries    │ │  Queries    │ │  Queries    │         │
│  └─────────────┘ └─────────────┘ └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                    API Layer                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐         │
│  │   authAPI   │ │transactionAPI│ │analyticsAPI │         │
│  └─────────────┘ └─────────────┘ └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                    Backend                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Zustand Store                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   UI Store                          │   │
│  │  • Theme preferences                                │   │
│  │  • Navigation state                                 │   │
│  │  • App preferences                                  │   │
│  │  • Onboarding status                               │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## When to Use What

### TanStack Query (Server State)
- **API calls** and data fetching
- **Authentication** state (user data, tokens)
- **Transactions**, analytics, savings goals
- **Real-time data** that needs caching
- **Optimistic updates** and error handling
- **Background refetching** and synchronization

### Zustand (Client State)
- **UI preferences** (theme, notifications)
- **Navigation state** (current tab, onboarding status)
- **Form state** (not yet submitted)
- **Temporary UI state** (modals, dropdowns)
- **App configuration** (settings, preferences)

## File Structure

```
lib/
├── api.ts              # API client and endpoints
├── queryClient.ts      # TanStack Query configuration
└── types.ts            # Shared TypeScript interfaces

hooks/
├── index.ts            # Hook exports
├── useAuth.ts          # Authentication operations
├── useTransactions.ts  # Transaction operations
├── useAnalytics.ts     # Analytics operations
└── useSavingsGoals.ts  # Savings goals operations

stores/
├── index.ts            # Store exports
└── uiStore.ts          # UI state management
```

## Usage Examples

### Authentication with TanStack Query

```tsx
import { useAuth } from '../hooks';

function LoginForm() {
  const { login, isLoadingLogin, loginError } = useAuth();
  
  const handleLogin = async () => {
    try {
      await login(email, password);
      // Navigation is handled automatically
    } catch (error) {
      // Error is already handled in the hook
    }
  };
  
  return (
    <TouchableOpacity 
      onPress={handleLogin} 
      disabled={isLoadingLogin}
    >
      <Text>{isLoadingLogin ? 'Signing In...' : 'Sign In'}</Text>
    </TouchableOpacity>
  );
}
```

### Transactions with TanStack Query

```tsx
import { useTransactions } from '../hooks';

function TransactionList() {
  const { 
    transactions, 
    createTransaction, 
    isLoadingCreate,
    pagination 
  } = useTransactions({ page: 1, limit: 20 });
  
  const handleCreate = async (transaction) => {
    await createTransaction(transaction);
    // Cache is automatically updated
  };
  
  return (
    <View>
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
      <PaginationInfo pagination={pagination} />
    </View>
  );
}
```

### UI State with Zustand

```tsx
import { useUIStore } from '../stores';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useUIStore();
  
  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Text>{isDarkMode ? '🌙' : '☀️'}</Text>
    </TouchableOpacity>
  );
}
```

## Key Features

### TanStack Query Benefits
- **Automatic Caching**: Data is cached and shared across components
- **Background Updates**: Data stays fresh with automatic refetching
- **Optimistic Updates**: UI updates immediately, rolls back on error
- **Error Handling**: Built-in error states and retry logic
- **Loading States**: Automatic loading indicators
- **Pagination**: Built-in support for paginated data
- **Infinite Queries**: Perfect for infinite scrolling

### Zustand Benefits
- **Lightweight**: Minimal bundle size impact
- **Simple API**: Easy to use and understand
- **TypeScript**: Full type safety
- **Persistence**: Automatic storage to AsyncStorage
- **DevTools**: Great debugging experience

## Best Practices

### 1. Query Keys
Use consistent query keys for proper cache management:

```tsx
export const queryKeys = {
  transactions: {
    all: ['transactions'] as const,
    lists: () => [...queryKeys.transactions.all, 'list'] as const,
    list: (filters: any) => [...queryKeys.transactions.lists(), filters] as const,
    detail: (id: string) => [...queryKeys.transactions.all, 'detail', id] as const,
  },
};
```

### 2. Error Handling
Handle errors gracefully in components:

```tsx
const { data, error, isLoading } = useQuery();

if (error) {
  return <ErrorMessage error={error} />;
}

if (isLoading) {
  return <LoadingSpinner />;
}
```

### 3. Optimistic Updates
Update cache immediately for better UX:

```tsx
const updateMutation = useMutation({
  mutationFn: updateAPI,
  onMutate: async (updates) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(queryKey);
    
    // Snapshot previous value
    const previousData = queryClient.getQueryData(queryKey);
    
    // Optimistically update
    queryClient.setQueryData(queryKey, old => ({ ...old, ...updates }));
    
    return { previousData };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(queryKey, context.previousData);
  },
});
```

### 4. Cache Invalidation
Invalidate related queries when data changes:

```tsx
const createMutation = useMutation({
  mutationFn: createAPI,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
  },
});
```

## Migration Guide

### From Context API
1. Replace `useContext(AuthContext)` with `useAuth()`
2. Replace `useContext(TransactionContext)` with `useTransactions()`
3. Remove context providers from component tree
4. Update error handling to use mutation errors

### From Redux
1. Replace Redux actions with TanStack Query mutations
2. Replace Redux selectors with query data
3. Replace Redux state with Zustand for UI state
4. Update middleware to use query client

### From Zustand (Full)
1. Keep Zustand for UI state only
2. Move API calls to TanStack Query hooks
3. Update components to use new hooks
4. Remove server state from Zustand stores

## Performance Considerations

### Query Optimization
- Use `staleTime` to control refetch frequency
- Implement proper `enabled` conditions
- Use `select` to transform data efficiently
- Leverage `keepPreviousData` for smooth transitions

### Cache Management
- Set appropriate `gcTime` for memory usage
- Use `refetchOnWindowFocus` judiciously
- Implement proper cache invalidation strategies
- Monitor cache size in development

### Bundle Size
- TanStack Query: ~13KB gzipped
- Zustand: ~2KB gzipped
- Total overhead: ~15KB gzipped

## Development Tools

### React Query DevTools
```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Add to your app (development only)
{__DEV__ && <ReactQueryDevtools initialIsOpen={false} />}
```

### Zustand DevTools
```tsx
import { devtools } from 'zustand/middleware';

export const useStore = create(
  devtools(
    (set) => ({ ... }),
    { name: 'store-name' }
  )
);
```

## Testing

### Testing Queries
```tsx
import { renderHook, waitFor } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const { result } = renderHook(() => useTransactions(), { wrapper });

await waitFor(() => {
  expect(result.current.transactions).toBeDefined();
});
```

### Testing Stores
```tsx
import { act } from '@testing-library/react-native';
import { useUIStore } from '../stores';

act(() => {
  useUIStore.getState().toggleTheme();
});

expect(useUIStore.getState().isDarkMode).toBe(false);
```

This architecture provides a robust, scalable foundation for your React Native app with excellent developer experience and performance characteristics.
