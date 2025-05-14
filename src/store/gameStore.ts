
import { create } from 'zustand';

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image?: string;
  rating?: number;
  released?: string;
  genres?: Genre[];
  platforms?: { platform: Platform }[];
  description?: string; // Add this property to fix the TypeScript error
}

interface GameState {
  games: Game[];
  isLoading: boolean;
  error: string | null;
  fetchGames: () => Promise<void>;
}

const useGameStore = create<GameState>((set) => ({
  games: [],
  isLoading: false,
  error: null,
  fetchGames: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        "https://api.rawg.io/api/games?key=2e3bff0ecc3f42b182d0c3bae6b2d300&page_size=20"
      );
      if (!response.ok) throw new Error('Failed to fetch games');
      const data = await response.json();
      set({ games: data.results, isLoading: false });
    } catch (error) {
      console.error('Error fetching games:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));

export default useGameStore;
