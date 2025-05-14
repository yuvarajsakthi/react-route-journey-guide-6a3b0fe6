
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define user type
export interface User {
  id: string;
  username: string;
  email: string;
}

// Define authentication state
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Mock user database - in a real app, this would be a backend service
const mockUsers: User[] = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@example.com',
  },
];

// Create the auth store with persistence
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Login action
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Find user by email (simplified authentication)
        const user = mockUsers.find(u => u.email === email);
        
        if (user && password === 'password') {
          set({ user, isAuthenticated: true, isLoading: false });
        } else {
          set({ error: 'Invalid email or password', isLoading: false });
        }
      },
      
      // Register action
      register: async (username: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          set({ error: 'User already exists', isLoading: false });
          return;
        }
        
        // Create new user
        const newUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          username,
          email,
        };
        
        // In a real app, we would send this to a backend
        mockUsers.push(newUser);
        
        // Log the user in
        set({ user: newUser, isAuthenticated: true, isLoading: false });
      },
      
      // Logout action
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      // Clear error action
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
