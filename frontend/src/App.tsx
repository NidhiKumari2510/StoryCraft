import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import CreateStory from "./pages/CreateStory";
import StoryDisplay from "./components/StoryDisplay";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History";
import AnimatedBackground from "./components/AnimatedBackground";
import { isLoggedIn } from "./utils/auth";

// ✅ Story interface (shared type)
export interface Story {
  id?: string; // id might be optional
  _id?: string; // add this line for MongoDB
  title: string;
  pages: Array<{
    text: string;
    illustration: string;
  }>;
}

function App() {
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);

  // ✅ Callback to receive story from CreateStory
  const handleStoryGenerated = (story: Story) => {
    setGeneratedStory(story);
  };

  // ✅ Protect certain routes
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isLoggedIn() ? children : <Navigate to="/login" replace />;
  };

  // ✅ Prevent logged-in users from seeing login/signup again
  const AuthRoute = ({ children }: { children: JSX.Element }) => {
    return isLoggedIn() ? <Navigate to="/create" replace /> : children;
  };

  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/create" />} />

              {/* Public Routes */}
              <Route
                path="/login"
                element={
                  <AuthRoute>
                    <Login />
                  </AuthRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <AuthRoute>
                    <Signup />
                  </AuthRoute>
                }
              />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected Routes */}
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreateStory onStoryGenerated={handleStoryGenerated} />
                  </ProtectedRoute>
                }
              />

              {/* ✅ Added both routes for story */}
              <Route
                path="/story"
                element={
                  <ProtectedRoute>
                    {generatedStory ? (
                      <StoryDisplay story={generatedStory ?? undefined} />
                    ) : (
                      <Navigate to="/create" />
                    )}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/story/:id"
                element={
                  <ProtectedRoute>
                    <StoryDisplay />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
