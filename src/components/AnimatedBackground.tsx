import React from 'react';
import { Cloud, Star, Heart } from 'lucide-react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100"></div>
      
      {/* Floating Stars */}
      <div className="absolute top-10 left-10 text-yellow-300 animate-bounce" style={{ animationDelay: '0s' }}>
        <Star className="w-6 h-6 fill-current" />
      </div>
      <div className="absolute top-32 right-20 text-pink-300 animate-bounce" style={{ animationDelay: '1s' }}>
        <Star className="w-4 h-4 fill-current" />
      </div>
      <div className="absolute bottom-40 left-32 text-purple-300 animate-bounce" style={{ animationDelay: '2s' }}>
        <Star className="w-5 h-5 fill-current" />
      </div>
      <div className="absolute top-64 left-1/2 text-blue-300 animate-bounce" style={{ animationDelay: '0.5s' }}>
        <Star className="w-4 h-4 fill-current" />
      </div>

      {/* Floating Clouds */}
      <div className="absolute top-20 right-10 text-blue-200 animate-pulse" style={{ animationDelay: '1s' }}>
        <Cloud className="w-12 h-12 fill-current" />
      </div>
      <div className="absolute bottom-32 right-40 text-purple-200 animate-pulse" style={{ animationDelay: '2s' }}>
        <Cloud className="w-8 h-8 fill-current" />
      </div>
      <div className="absolute top-48 left-1/4 text-pink-200 animate-pulse" style={{ animationDelay: '0s' }}>
        <Cloud className="w-10 h-10 fill-current" />
      </div>

      {/* Floating Hearts */}
      <div className="absolute bottom-60 left-10 text-pink-300 animate-pulse" style={{ animationDelay: '1.5s' }}>
        <Heart className="w-6 h-6 fill-current" />
      </div>
      <div className="absolute top-80 right-1/3 text-purple-300 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-4 h-4 fill-current" />
      </div>

      {/* Floating Sparkles */}
      <div className="absolute top-16 left-1/3 w-2 h-2 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-48 right-16 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-96 left-20 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default AnimatedBackground;