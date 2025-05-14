
# Components Directory

This directory contains reusable UI components organized by feature or function.

## Directory Structure

- `auth/`: Authentication-related components like ProtectedRoute
- `games/`: Game-related components like GameCard
- `navigation/`: Navigation components like Navbar and Footer
- `ui/`: Shadcn UI components (read-only)

## Component Design Principles

1. **Reusability**: Components are designed to be reusable across the application
2. **Single Responsibility**: Each component has a specific purpose
3. **Props Interface**: TypeScript interfaces define the props for each component
4. **Modularity**: Components are modular and can be composed together
5. **Documentation**: Components include JSDoc comments explaining their purpose

## Component Example

```tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

/**
 * Button Component
 * 
 * Renders a button with different variants.
 */
const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}) => {
  const buttonClasses = variant === 'primary'
    ? 'bg-blue-600 text-white'
    : 'bg-gray-200 text-gray-800';
    
  return (
    <button
      className={`px-4 py-2 rounded ${buttonClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

## Best Practices

1. Use TypeScript interfaces for component props
2. Include descriptive JSDoc comments
3. Keep components focused on a single responsibility
4. Use composition over inheritance
5. Avoid deeply nested components
6. Use semantic HTML elements
7. Ensure proper accessibility (aria-* attributes, keyboard navigation)
8. Add data-testid attributes for testing
