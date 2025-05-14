
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Install required dependencies for Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

createRoot(document.getElementById("root")!).render(<App />);
