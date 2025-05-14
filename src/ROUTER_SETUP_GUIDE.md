
# React Router Setup Guide

## Understanding and Fixing Router Context Issues

### 1. The Problem: Components Outside Router Context

In our application, we encountered two main errors:

```
Error: useNavigate() may be used only in the context of a <Router> component.
```

and

```
TypeError: Cannot destructure property 'basename' of 'React2.useContext(...)' as it is null.
```

These errors occur because we were using React Router hooks (`useNavigate`, `Link` components) outside of a Router context.

### 2. React Router Setup: Two Approaches

There are two common ways to set up React Router:

#### Approach 1: BrowserRouter in the entry file (What we're using now)
```jsx
// main.tsx
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

With this approach, we use `Routes` and `Route` components in our App.tsx:

```jsx
// App.tsx
import { Routes, Route } from 'react-router-dom';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    {/* more routes */}
  </Routes>
);
```

#### Approach 2: RouterProvider with createBrowserRouter (Our previous approach)
```jsx
// App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  // more routes
]);

const App = () => <RouterProvider router={router} />;
```

### 3. The Fix: Consistent Router Setup

Our issue was that we were mixing approaches. We were:
1. Not including a router in main.tsx, but
2. Components (like Navbar) were using router hooks outside of RouterProvider

We fixed this by choosing Approach 1 - adding BrowserRouter to main.tsx and converting our App.tsx to use Routes and Route components directly.

### 4. Important React Router Concepts

- **Router Context**: All components that use router features must be descendants of a router component
- **useNavigate**: This hook provides programmatic navigation but requires router context
- **Link**: Similar to an anchor tag but prevents page reload and requires router context
- **Protected Routes**: Components that check auth status before rendering routes

### 5. TypeScript Interface Updates

We also updated the Game interface to include the `description` property that was being used in GameDetailPage.

### Learning Resources:

- [React Router Documentation](https://reactrouter.com/en/main)
- [useNavigate Hook](https://reactrouter.com/en/main/hooks/use-navigate)
- [Route Protection Patterns](https://reactrouter.com/en/main/guides/auth)
