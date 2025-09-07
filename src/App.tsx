import React, { useState } from 'react';
import Header from './components/Header';
import CreateStory from './components/CreateStory';
import StoryDisplay from './components/StoryDisplay';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import AnimatedBackground from './components/AnimatedBackground';

export interface Story {
  id: string;
  title: string;
  pages: Array<{
    text: string;
    illustration: string;
  }>;
}

function App() {
  const [currentPage, setCurrentPage] = useState('create');
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);

  const handleStoryGenerated = (story: Story) => {
    setGeneratedStory(story);
    setCurrentPage('story');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'create':
        return <CreateStory onStoryGenerated={handleStoryGenerated} />;
      case 'story':
        return generatedStory ? (
          <StoryDisplay 
            story={generatedStory} 
            onBackToCreate={() => setCurrentPage('create')}
          />
        ) : (
          <CreateStory onStoryGenerated={handleStoryGenerated} />
        );
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <Contact />;
      default:
        return <CreateStory onStoryGenerated={handleStoryGenerated} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="container mx-auto px-4 py-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;