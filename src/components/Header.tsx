import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b-4 border-purple-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentPage('create')}
          >
            <div className="relative">
              <BookOpen className="w-10 h-10 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Magical Story Maker
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setCurrentPage('create')}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                currentPage === 'create' || currentPage === 'story'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Create Story
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                currentPage === 'about'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                currentPage === 'contact'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Get Started Button */}
          <button
            onClick={() => setCurrentPage('create')}
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-pink-500 hover:to-purple-600"
          >
            ✨ Get Started
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-center mt-4 space-x-4">
          <button
            onClick={() => setCurrentPage('create')}
            className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              currentPage === 'create' || currentPage === 'story'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:text-purple-600'
            }`}
          >
            Create
          </button>
          <button
            onClick={() => setCurrentPage('about')}
            className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              currentPage === 'about'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:text-purple-600'
            }`}
          >
            About
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              currentPage === 'contact'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:text-purple-600'
            }`}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;