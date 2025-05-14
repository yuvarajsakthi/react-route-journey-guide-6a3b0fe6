
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

/**
 * LoginPage Component
 * 
 * This page allows users to log in to the application.
 * It uses Zustand for state management and form handling.
 */
const LoginPage: React.FC = () => {
  // Local state for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Get auth functions and state from Zustand store
  const { login, isLoading, error } = useAuthStore();
  
  // React Router hooks for navigation
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page user was trying to access before redirecting to login
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  /**
   * Handle form submission
   * 
   * This function prevents the default form behavior,
   * calls the login function from the auth store,
   * and navigates to the previous page on success.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      // After successful login, navigate to the page user was trying to access
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Sign in to your account</h2>
      
      {/* Display error message if any */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 
                         dark:border-gray-700 dark:bg-gray-800 dark:text-white
                         rounded-md shadow-sm placeholder-gray-400 
                         focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 
                         dark:border-gray-700 dark:bg-gray-800 dark:text-white
                         rounded-md shadow-sm placeholder-gray-400 
                         focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent 
                       rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
      
      <div className="mt-6">
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
      
      {/* Demo credentials notice */}
      <div className="mt-8 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium">Demo Credentials</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Email: demo@example.com<br />
          Password: password
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
