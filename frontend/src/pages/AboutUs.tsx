import React from 'react';
import { Heart, Star, Sparkles, Users } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-6">
          About Our Magic ✨
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
          We believe every child has an amazing story inside them, waiting to come alive!
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border-2 border-purple-100 mb-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            At Magical Story Maker, we use the power of AI to help children explore their creativity, 
            learn valuable lessons, and develop a love for reading through personalized, magical stories 
            that spark imagination and wonder.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 shadow-lg border-2 border-blue-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
              <Star className="w-6 h-6 text-white fill-current" />
            </div>
            <h3 className="text-2xl font-bold text-blue-800">Personalized Stories</h3>
          </div>
          <p className="text-blue-700 text-lg leading-relaxed">
            Every story is unique and tailored to your child's interests, age, and imagination. 
            No two stories are ever the same!
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl p-8 shadow-lg border-2 border-pink-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mr-4">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <h3 className="text-2xl font-bold text-pink-800">Safe & Educational</h3>
          </div>
          <p className="text-pink-700 text-lg leading-relaxed">
            All our stories are designed with love, promoting positive values like kindness, 
            friendship, and learning in a safe environment.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-8 shadow-lg border-2 border-purple-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-purple-800">AI-Powered Magic</h3>
          </div>
          <p className="text-purple-700 text-lg leading-relaxed">
            Our advanced AI creates beautiful, coherent stories with engaging illustrations 
            that bring every tale to life in seconds.
          </p>
        </div>

        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-3xl p-8 shadow-lg border-2 border-yellow-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-800">Family Friendly</h3>
          </div>
          <p className="text-yellow-700 text-lg leading-relaxed">
            Perfect for bedtime stories, educational moments, or just having fun together as a family. 
            Create memories that last forever!
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border-2 border-pink-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Made with Love 💝</h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
          Our team of storytellers, educators, and tech wizards work together to create the most 
          magical story experience for children everywhere. We're passionate about nurturing creativity 
          and making reading an adventure!
        </p>
        <div className="flex justify-center space-x-4">
          <div className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🧙‍♀️</div>
          <div className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>📚</div>
          <div className="text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</div>
          <div className="text-4xl animate-bounce" style={{ animationDelay: '0.6s' }}>🌟</div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;