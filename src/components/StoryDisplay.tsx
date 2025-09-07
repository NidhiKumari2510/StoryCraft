import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Heart, ArrowLeft } from 'lucide-react';
import { Story } from '../App';

interface StoryDisplayProps {
  story: Story;
  onBackToCreate: () => void;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onBackToCreate }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const downloadPDF = () => {
    // Placeholder for PDF download functionality
    alert('PDF download feature coming soon! 📄✨');
  };

  const saveToLibrary = () => {
    // Placeholder for save functionality
    alert('Story saved to your library! 📚💝');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBackToCreate}
        className="mb-6 flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-200"
      >
        <ArrowLeft className="w-5 h-5 text-purple-600" />
        <span className="text-lg font-semibold text-purple-600">Create New Story</span>
      </button>

      {/* Story Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
          {story.title}
        </h1>
        <div className="flex justify-center space-x-4">
          <span className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
            Page {currentPage + 1} of {story.pages.length}
          </span>
        </div>
      </div>

      {/* Flipbook Container */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-200 mb-8">
        <div className="aspect-[4/3] relative">
          {/* Current Page */}
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="flex-1 flex items-center justify-center mb-6 md:mb-0 md:mr-8">
              <div className="relative">
                <img
                  src={story.pages[currentPage].illustration}
                  alt={`Illustration for page ${currentPage + 1}`}
                  className="w-full max-w-sm h-64 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  ✨
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="flex-1 flex items-center">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100 shadow-inner">
                <p className="text-lg md:text-xl leading-relaxed text-gray-800 font-medium">
                  {story.pages[currentPage].text}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 ${
              currentPage === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600 hover:scale-110'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPage}
            disabled={currentPage === story.pages.length - 1}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 ${
              currentPage === story.pages.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600 hover:scale-110'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Page Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {story.pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'bg-purple-500 scale-125'
                  : 'bg-purple-200 hover:bg-purple-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
        >
          <Download className="w-6 h-6" />
          <span>Download PDF</span>
        </button>

        <button
          onClick={saveToLibrary}
          className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
        >
          <Heart className="w-6 h-6" />
          <span>Save to Library</span>
        </button>
      </div>
    </div>
  );
};

export default StoryDisplay;