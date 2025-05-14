# Pages Directory

This directory contains React components that represent entire pages in the application.

## What are Page Components?

Page components are top-level components that:
- Are rendered by React Router routes
- Usually correspond to a specific URL
- Compose smaller components to form a complete page
- Handle page-specific logic and state

## Pages in this Application

### 1. `HomePage.tsx`

- The main landing page displaying a grid of games
- Includes search functionality
- Handles loading states with skeleton UI

### 2. `GameDetailPage.tsx`

- Displays detailed information about a specific game
- Fetches data based on the game ID from the URL params
- Shows game images, descriptions, and metadata

### 3. `LoginPage.tsx` and `RegisterPage.tsx`

- Handle user authentication
- Include form validation and error handling
- Interact with the authentication store

### 4. `ProfilePage.tsx`

- Displays user profile information
- Protected route that requires authentication
- Shows different tabs for profile info and favorites

### 5. `NotFound.tsx`

- Displayed when a user navigates to a non-existent route
- Provides navigation back to valid pages

## How Pages Work with React Router

Pages are connected to routes in the `App.tsx` file:

```tsx
const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "games/:gameId",
        element: <GameDetailPage />
      },
      // Other routes...
    ]
  }
];
```

## Page Component Structure

A typical page component follows this structure:

```tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Import components and hooks

/**
 * PageName Component
 * 
 * Description of what this page does and shows.
 */
const PageName: React.FC = () => {
  // State declarations
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Hooks (router hooks, store hooks, etc.)
  const { id } = useParams();
  const { user } = useAuthStore();
  
  // Effects for data fetching, etc.
  useEffect(() => {
    const fetchData = async () => {
      // Fetch data and update state
    };
    
    fetchData();
  }, [id]);
  
  // Conditional rendering for loading/error states
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  // Main render
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Page Title</h1>
      {/* Page content composed of smaller components */}
    </div>
  );
};

export default PageName;
```

## Best Practices for Pages

1. **Separation of Concerns**: Pages should focus on layout and composition, delegating specific UI rendering to smaller components
2. **Data Fetching**: Fetch data at the page level and pass it down to child components
3. **Loading States**: Handle loading, error, and empty states consistently
4. **Responsive Design**: Ensure pages look good on all device sizes
5. **Route Params**: Use React Router hooks like `useParams` to access URL parameters
6. **SEO Considerations**: Include proper headings and semantic HTML
7. **Authentication**: Handle protected content appropriately
8. **Consistent Layout**: Maintain consistent spacing and layout across pages
