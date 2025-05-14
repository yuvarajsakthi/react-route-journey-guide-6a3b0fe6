
import { useEffect, useState } from "react";
import useGameStore from "../store/gameStore";
import GameCard from "../components/games/GameCard";
import { AlertCircle } from "lucide-react";

/**
 * HomePage Component
 * 
 * This is the main landing page that displays a grid of games.
 * It uses the game store to fetch and display games with loading states.
 */
const HomePage: React.FC = () => {
  const { games, fetchGames, isLoading, error } = useGameStore();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Load games when component mounts
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);
  
  // Filter games based on search term
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Create loading skeleton cards
  const renderSkeletonCards = () => {
    return Array(12)
      .fill(null)
      .map((_, index) => <GameCard key={`skeleton-${index}`} game={{} as any} isLoading={true} />);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Discover Games</h1>
        
        {/* Search input */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 
                      focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        {/* API Error message */}
        {error && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center text-yellow-800 dark:text-yellow-200">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        )}
      </div>
      
      {/* Game grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? renderSkeletonCards()
          : filteredGames.map((game) => <GameCard key={game.id} game={game} />)}
        
        {!isLoading && filteredGames.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              No games found matching "{searchTerm}"
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try a different search term or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
