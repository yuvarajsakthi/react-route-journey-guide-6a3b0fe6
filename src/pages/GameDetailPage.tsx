
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Game } from "../store/gameStore";

/**
 * GameDetailPage Component
 * 
 * This page displays detailed information about a specific game.
 * It fetches data from the API based on the game ID in the URL.
 */
const GameDetailPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!gameId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${gameId}?key=2e3bff0ecc3f42b182d0c3bae6b2d300`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch game details");
        }
        
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGameDetails();
  }, [gameId]);
  
  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="skeleton h-8 w-1/2 mb-6"></div>
        <div className="skeleton h-96 w-full mb-8 rounded-lg"></div>
        <div className="space-y-4">
          <div className="skeleton h-6 w-1/3"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-3/4"></div>
        </div>
      </div>
    );
  }
  
  // Render error state
  if (error || !game) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {error || "Game not found"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn't load the game details. Please try again.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Return to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Games
      </Link>
      
      {/* Game title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{game.name}</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        {/* Game header image */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          {game.background_image ? (
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
          )}
          
          {/* Overlay with rating */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="flex items-center">
              <div className="flex items-center bg-white bg-opacity-90 px-3 py-1 rounded-full">
                <svg
                  className="w-5 h-5 text-yellow-500 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-7.007 4.42c-.95.6-2.172-.368-1.845-1.464l1.908-6.43L.312 8.97c-.92-.89-.435-2.44.847-2.537l6.517-.572L9.97.584c.455-1.123 2.04-1.123 2.496 0l2.293 5.276 6.518.572c1.282.098 1.767 1.648.847 2.537l-4.744 4.142 1.907 6.43c.326 1.096-.895 2.064-1.845 1.464L10 15.585z"
                  />
                </svg>
                <span className="font-semibold text-black">{game.rating?.toFixed(1) || "N/A"}</span>
              </div>
              
              <span className="ml-3 text-white font-medium">
                Released: {game.released ? new Date(game.released).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Game details */}
        <div className="p-6">
          {/* Genres */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {game.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-800 dark:text-gray-300 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          
          {/* Platforms */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {game.platforms?.map((item) => (
                <span
                  key={item.platform.id}
                  className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-800 dark:text-gray-300 text-sm"
                >
                  {item.platform.name}
                </span>
              ))}
            </div>
          </div>
          
          {/* Description */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About</h3>
            <div 
              className="text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: game.description || "No description available." }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
