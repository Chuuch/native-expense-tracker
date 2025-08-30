# Zustand State Management Setup

This project uses Zustand for state management, with a focus on authentication state. Zustand is a lightweight, fast, and scalable state management solution.

## Structure

```
stores/
├── index.ts          # Exports all stores
└── authStore.ts      # Authentication state and actions

hooks/
├── index.ts          # Exports all hooks
└── useAuth.ts        # Authentication hook with routing logic
```

## Auth Store

The `authStore` manages all authentication-related state:

### State Properties
- `user`: Current user object (null if not authenticated)
- `accessToken`: JWT access token
- `refreshToken`: JWT refresh token
- `isAuthenticated`: Boolean indicating auth status
- `isLoading`: Loading state for async operations
- `error`: Error message if any

### Actions
- `login(email, password)`: Authenticate user
- `register(userData)`: Create new user account
- `logout()`: Clear auth state
- `refreshAccessToken()`: Refresh expired access token
- `updateUserProfile(updates)`: Update user profile data
- `setUser(user)`: Set user data
- `setTokens(accessToken, refreshToken)`: Set auth tokens
- `setLoading(loading)`: Set loading state
- `setError(error)`: Set error message
- `clearError()`: Clear error message

## Usage Examples

### Basic Store Usage
```tsx
import { useAuthStore } from '../stores';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  
  // Access state
  if (isAuthenticated) {
    console.log('User:', user?.fullName);
  }
  
  // Call actions
  const handleLogin = () => login('user@example.com', 'password');
  const handleLogout = () => logout();
}
```

### Authentication Hook
```tsx
import { useAuth } from '../hooks';

function AppLayout() {
  // This hook automatically handles routing based on auth state
  const { isAuthenticated, user, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return isAuthenticated ? <MainApp /> : <AuthFlow />;
}
```

### Profile Updates
```tsx
import { useAuthStore } from '../stores';

function ProfileEditor() {
  const { user, updateUserProfile } = useAuthStore();
  
  const handleUpdateName = (newName: string) => {
    updateUserProfile({ fullName: newName });
  };
}
```

## Persistence

The auth store automatically persists the following data to AsyncStorage:
- User object
- Access token
- Refresh token
- Authentication status

This ensures the user stays logged in between app sessions.

## Integration with React Query

The store works well with React Query for API calls. You can use the store for local state and React Query for server state:

```tsx
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores';

function UserProfile() {
  const { user } = useAuthStore();
  
  // Use React Query for API data
  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => fetchUserProfile(user?.id),
    enabled: !!user?.id,
  });
  
  // Use Zustand for local state
  const { updateUserProfile } = useAuthStore();
}
```

## Error Handling

The store includes built-in error handling:

```tsx
const { error, clearError } = useAuthStore();

// Display errors
if (error) {
  Alert.alert('Error', error);
  clearError();
}

// Handle async operations
try {
  await login(email, password);
} catch (error) {
  // Error is automatically set in the store
  console.log('Login failed');
}
```

## Adding New Stores

To add new stores, follow this pattern:

```tsx
// stores/newStore.ts
import { create } from 'zustand';

interface NewStore {
  // State
  data: any[];
  
  // Actions
  addItem: (item: any) => void;
  removeItem: (id: string) => void;
}

export const useNewStore = create<NewStore>((set) => ({
  data: [],
  addItem: (item) => set((state) => ({ 
    data: [...state.data, item] 
  })),
  removeItem: (id) => set((state) => ({ 
    data: state.data.filter(item => item.id !== id) 
  })),
}));
```

Then export it in `stores/index.ts`:
```tsx
export { useNewStore } from './newStore';
```

## Best Practices

1. **Selective Subscriptions**: Only subscribe to the state you need
2. **Action Composition**: Compose actions from other actions when possible
3. **Immutable Updates**: Always return new state objects
4. **Error Boundaries**: Use try-catch for async operations
5. **Type Safety**: Leverage TypeScript for better development experience

## Migration from Context

If you're migrating from React Context, the main changes are:

1. Replace `useContext(AuthContext)` with `useAuthStore()`
2. Replace context providers with direct store usage
3. Remove context wrapper components
4. Update imports to use the new store structure
