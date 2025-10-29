import React from 'react';
import { Cloud, Star, Heart } from 'lucide-react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Background with warmer pink-purple tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-100 to-blue-100"></div>

      {/* Optional: soft radial glow in the center */}
      <div className="absolute inset-0 bg-pink-300 opacity-20 rounded-full blur-3xl"></div>

      {/* Floating Stars */}
      <div className="absolute top-10 left-8 text-yellow-200 animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}>
        <Star className="w-6 h-6 fill-current opacity-80" />
      </div>
      <div className="absolute top-32 right-20 text-pink-200 animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
        <Star className="w-5 h-5 fill-current opacity-70" />
      </div>
      <div className="absolute bottom-40 left-32 text-purple-200 animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}>
        <Star className="w-6 h-6 fill-current opacity-75" />
      </div>
      <div className="absolute top-64 left-1/2 text-blue-200 animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }}>
        <Star className="w-4 h-4 fill-current opacity-70" />
      </div>

      {/* Floating Clouds */}
      <div className="absolute top-20 right-10 text-blue-200 animate-[sway_10s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
        <Cloud className="w-12 h-12 fill-current opacity-70" />
      </div>
      <div className="absolute bottom-32 right-40 text-purple-200 animate-[sway_12s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}>
        <Cloud className="w-10 h-10 fill-current opacity-60" />
      </div>
      <div className="absolute top-48 left-1/4 text-pink-200 animate-[sway_9s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}>
        <Cloud className="w-14 h-14 fill-current opacity-70" />
      </div>

      {/* Floating Hearts */}
      <div className="absolute bottom-60 left-10 text-pink-300 animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }}>
        <Heart className="w-6 h-6 fill-current opacity-80" />
      </div>
      <div className="absolute top-80 right-1/3 text-purple-300 animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-5 h-5 fill-current opacity-75" />
      </div>

      {/* Floating Sparkles */}
      <div className="absolute top-16 left-1/3 w-2 h-2 bg-yellow-200 rounded-full animate-[ping_3s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-48 right-16 w-2 h-2 bg-pink-300 rounded-full animate-[ping_4s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-96 left-20 w-3 h-3 bg-purple-300 rounded-full animate-[ping_5s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/2 w-2 h-2 bg-blue-200 rounded-full animate-[ping_3.5s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default AnimatedBackground;
