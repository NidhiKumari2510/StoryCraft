import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Sparkles } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname;

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b-4 border-purple-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/create"
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <img
                src="/favicon.png"
                alt="Custom Logo"
                className="w-20 h-20 group-hover:scale-110 transition-transform duration-300"
              />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Magical Story Maker
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavButton to="/create" current={currentPage} label="Create Story" />
            <NavButton to="/history" current={currentPage} label="History" />
            <NavButton to="/about" current={currentPage} label="About Us" />
            <NavButton to="/contact" current={currentPage} label="Contact" />

            {!isLoggedIn ? (
              <>
                <NavButton to="/login" current={currentPage} label="Login" />
              {/* <NavButton to="/signup" current={currentPage} label="Signup" />  */}
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600 shadow-md"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile Get Started Button */}
          <Link
            to="/create"
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-pink-500 hover:to-purple-600 md:hidden"
          >
            ✨ Get Started
          </Link>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-center mt-4 space-x-4 flex-wrap">
          <NavButton to="/create" current={currentPage} label="Create" />
          <NavButton to="/history" current={currentPage} label="History" />
          <NavButton to="/about" current={currentPage} label="About" />
          <NavButton to="/contact" current={currentPage} label="Contact" />
          {!isLoggedIn ? (
            <>
              <NavButton to="/login" current={currentPage} label="Login" />
              <NavButton to="/signup" current={currentPage} label="Signup" />
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-400 to-purple-500 text-white"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

interface NavButtonProps {
  to: string;
  current: string;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ to, current, label }) => {
  const isActive = current === to;
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
        isActive
          ? "bg-purple-100 text-purple-700"
          : "text-gray-700 hover:text-purple-600"
      }`}
    >
      {label}
    </Link>
  );
};
