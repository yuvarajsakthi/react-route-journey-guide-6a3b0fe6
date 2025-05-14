
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const { isAuthenticated, clearError } = useAuthStore();

  // Clear any previous authentication errors when entering auth pages
  useEffect(() => {
    clearError();
  }, [clearError]);

  // If user is already authenticated, redirect to home page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              GameHub
            </h2>
          </Link>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Your ultimate gaming destination
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
