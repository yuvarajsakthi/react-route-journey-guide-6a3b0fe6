
import { Link } from "react-router-dom";
import { Game } from "../../store/gameStore";

interface GameCardProps {
  game: Game;
  isLoading?: boolean;
}

/**
 * GameCard Component
 * 
 * This component displays an individual game as a card with
 * image, title, rating, and basic details.
 * 
 * It also has a loading skeleton state for better UX.
 */
const GameCard: React.FC<GameCardProps> = ({ game, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg h-[350px]">
        <div className="skeleton h-48 w-full"></div>
        <div className="p-4 space-y-3">
          <div className="skeleton h-6 w-3/4"></div>
          <div className="skeleton h-4 w-1/2"></div>
          <div className="skeleton h-4 w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/games/${game.id}`} className="block h-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full transition-transform hover:scale-[1.02]">
        {/* Game Image */}
        <div className="h-48 bg-gray-200 overflow-hidden">
          {game.background_image ? (
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">No image</span>
            </div>
          )}
        </div>
        
        {/* Game Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
            {game.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
              <svg
                className="w-4 h-4 text-yellow-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15.585l-7.007 4.42c-.95.6-2.172-.368-1.845-1.464l1.908-6.43L.312 8.97c-.92-.89-.435-2.44.847-2.537l6.517-.572L9.97.584c.455-1.123 2.04-1.123 2.496 0l2.293 5.276 6.518.572c1.282.098 1.767 1.648.847 2.537l-4.744 4.142 1.907 6.43c.326 1.096-.895 2.064-1.845 1.464L10 15.585z"
                />
              </svg>
              <span className="text-blue-800 dark:text-blue-200">{game.rating.toFixed(1)}</span>
            </div>
            
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {game.released ? new Date(game.released).getFullYear() : "N/A"}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {game.genres?.slice(0, 2).map((genre) => (
              <span
                key={genre.id}
                className="inline-block bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
