
import { useState } from "react";
import useAuthStore from "../store/authStore";

/**
 * ProfilePage Component
 * 
 * This page displays the user's profile information.
 * It is protected and can only be accessed by authenticated users.
 */
const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Profile header */}
        <div className="bg-blue-600 px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-xl">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.username}</h2>
              <p className="text-blue-100">{user?.email}</p>
            </div>
          </div>
        </div>
        
        {/* Tab navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex px-6">
            <button
              className={`py-4 px-1 mr-8 border-b-2 font-medium text-sm ${
                activeTab === "profile"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Info
            </button>
            <button
              className={`py-4 px-1 mr-8 border-b-2 font-medium text-sm ${
                activeTab === "favorites"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              Favorite Games
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {activeTab === "profile" ? (
            <div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Username</h3>
                  <p className="text-lg text-gray-900 dark:text-white">{user?.username}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h3>
                  <p className="text-lg text-gray-900 dark:text-white">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Account ID</h3>
                  <p className="text-lg text-gray-900 dark:text-white">{user?.id}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Settings</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  This is a demo application. In a real app, you would be able to edit your profile
                  information and manage account settings here.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No favorite games yet</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Your favorite games will appear here once you add them.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
