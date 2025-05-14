
# Store Directory

This directory contains Zustand stores used for state management throughout the application.

## What is Zustand?

Zustand is a small, fast, and scalable state management solution. It uses a hook-based API, making it simpler than Redux while being just as powerful for most use cases.

## Stores

### 1. `gameStore.ts`

Manages the state related to games, including:
- List of games
- Loading states
- Filtering and search functionality
- Game fetching logic

### 2. `authStore.ts`

Handles authentication state, including:
- User information
- Authentication status
- Login/logout functionality
- Registration logic

## How Zustand Works

### Creating a Store

```typescript
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

### Using a Store in Components

```typescript
import useCounterStore from './store/counterStore';

const CounterComponent = () => {
  const { count, increment, decrement } = useCounterStore();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

## Why Zustand over Redux?

1. **Simpler API**: No providers, actions, or reducers required
2. **Less Boilerplate**: Define your store in a single file
3. **Hook-Based**: Works naturally with React's hook system
4. **Small Size**: Tiny bundle size (less than 1KB)
5. **No Context**: Avoids the performance issues with React Context
6. **Middleware Support**: Includes middleware for persistence, devtools, etc.

## Zustand Patterns

### Async Actions

```typescript
const useStore = create((set) => ({
  todos: [],
  isLoading: false,
  error: null,
  fetchTodos: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      set({ todos, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
```

### Persistence

```typescript
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // store definition
    }),
    {
      name: 'storage-key',
      getStorage: () => localStorage,
    }
  )
);
```

### Store Slicing

```typescript
const useStore = create((set) => ({
  // User slice
  user: null,
  setUser: (user) => set({ user }),
  
  // Theme slice
  theme: 'light',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
}));

// In components, only select what you need
const user = useStore((state) => state.user);
const setUser = useStore((state) => state.setUser);
```

## Best Practices

1. Keep store logic separate from UI components
2. Use TypeScript for better type safety
3. Split large stores into smaller ones
4. Use middleware for common patterns like persistence
5. Consider performance with selectors
6. Avoid storing derived state that can be computed
7. Keep actions and state together in the same store
