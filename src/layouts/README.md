
# Layouts Directory

This directory contains layout components that provide consistent structure across multiple pages.

## What are Layout Components?

Layout components:
- Define the overall structure of pages (header, footer, sidebar, etc.)
- Use the `<Outlet />` component from React Router to render child routes
- Provide consistent UI elements across multiple pages
- Can include navigation, authentication checks, and other shared functionality

## Layouts in this Application

### 1. `RootLayout.tsx`

- The main application layout
- Includes the navbar and footer
- Wraps most pages in the application

```tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
```

### 2. `AuthLayout.tsx`

- Specialized layout for authentication pages
- Centers the authentication forms on the page
- Handles redirection for authenticated users

```tsx
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <Outlet />
      </div>
    </div>
  );
};
```

## How Layouts Work with React Router

Layouts are applied through nested routes in the router configuration:

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
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "register",
        element: <RegisterPage />
      }
    ]
  }
];
```

## Benefits of Layout Components

1. **DRY (Don't Repeat Yourself)**: Avoid duplicating layout code across pages
2. **Consistency**: Ensure a consistent look and feel throughout the application
3. **Separation of Concerns**: Separate layout logic from page-specific content
4. **Easier Maintenance**: Update layouts in one place rather than across multiple pages
5. **Code Organization**: Clearer structure and organization of the application

## Best Practices for Layouts

1. Keep layouts focused on structure and positioning
2. Use the `<Outlet />` component to render nested routes
3. Create specialized layouts for different sections of the application
4. Handle responsive design at the layout level
5. Consider accessibility in layout design (skip links, landmark regions)
6. Use layouts to manage authentication state and redirects
