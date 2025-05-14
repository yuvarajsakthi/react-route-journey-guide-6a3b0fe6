
import { create } from 'zustand';

// Define types for our game data
export interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;
  genres: { id: number; name: string }[];
  platforms?: { platform: { id: number; name: string } }[];
}

// Define the store state type
interface GameState {
  games: Game[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedGenre: number | null;
  
  // Actions
  fetchGames: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genreId: number | null) => void;
}

// Create the store using Zustand
const useGameStore = create<GameState>((set) => ({
  games: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedGenre: null,
  
  // Action to fetch games from the API
  fetchGames: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Using the RAWG API which is a popular open source game database
      const response = await fetch(
        'https://api.rawg.io/api/games?key=2e3bff0ecc3f42b182d0c3bae6b2d300&page_size=20'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      
      const data = await response.json();
      set({ games: data.results, isLoading: false });
    } catch (error) {
      console.error('Error fetching games:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  // Set search query action
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  
  // Set selected genre action
  setSelectedGenre: (genreId: number | null) => set({ selectedGenre: genreId }),
}));

export default useGameStore;
