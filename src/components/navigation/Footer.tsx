
import { Link } from "react-router-dom";

/**
 * Footer Component
 * 
 * This component displays the site footer with navigation links
 * and copyright information.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">GameHub</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your ultimate gaming destination - discover new games and keep track of your favorites.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Home
                </Link>
              </li>
              {/* Additional links would go here */}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">About</h3>
            <p className="text-gray-600 dark:text-gray-400">
              This project demonstrates React, React Router, Zustand, and responsive design techniques.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} GameHub. All rights reserved. Built as a learning project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
