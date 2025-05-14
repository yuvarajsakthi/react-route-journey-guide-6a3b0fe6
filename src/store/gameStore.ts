
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
  rating: number;
  released?: string;
  genres?: Genre[];
  platforms?: { platform: Platform }[];
  description?: string;
}

// Fallback data for when API is unavailable
const fallbackGames: Game[] = [
  {
    id: 1,
    name: "The Witcher 3: Wild Hunt",
    background_image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    rating: 4.7,
    released: "2015-05-18",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 5, name: "RPG", slug: "role-playing-games-rpg" }
    ]
  },
  {
    id: 2,
    name: "Red Dead Redemption 2",
    background_image: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
    rating: 4.8,
    released: "2018-10-26",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 3, name: "Adventure", slug: "adventure" }
    ]
  },
  {
    id: 3,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    rating: 4.5,
    released: "2013-09-17",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 3, name: "Adventure", slug: "adventure" }
    ]
  },
  {
    id: 4,
    name: "God of War",
    background_image: "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
    rating: 4.6,
    released: "2018-04-20",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 3, name: "Adventure", slug: "adventure" }
    ]
  },
  {
    id: 5,
    name: "Horizon Zero Dawn",
    background_image: "https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg",
    rating: 4.3,
    released: "2017-02-28",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 5, name: "RPG", slug: "role-playing-games-rpg" }
    ]
  },
  {
    id: 6,
    name: "The Last of Us",
    background_image: "https://media.rawg.io/media/games/a5a/a5abaa1b5cc1567b026fa3aa9fbd828e.jpg",
    rating: 4.7,
    released: "2013-06-14",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 3, name: "Adventure", slug: "adventure" }
    ]
  },
  {
    id: 7,
    name: "Cyberpunk 2077",
    background_image: "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
    rating: 4.1,
    released: "2020-12-10",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 5, name: "RPG", slug: "role-playing-games-rpg" }
    ]
  },
  {
    id: 8,
    name: "Death Stranding",
    background_image: "https://media.rawg.io/media/games/2ad/2ad87a4a69b1104f02435c14c5196095.jpg",
    rating: 4.2,
    released: "2019-11-08",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 3, name: "Adventure", slug: "adventure" }
    ]
  }
];

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
      // Use fallback data when API fetch fails
      console.log('Using fallback game data instead');
      set({ 
        games: fallbackGames, 
        error: 'API unavailable, using local game data', 
        isLoading: false 
      });
    }
  },
}));

export default useGameStore;
