import React from 'react';
import { ListTodo, Moon, Sun } from 'lucide-react';

// TypeScript interfaces
interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Header Component
const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-800 dark:to-pink-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ListTodo size={32} className="animate-pulse" />
            <h1 className="text-3xl font-bold">My Todos</h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;