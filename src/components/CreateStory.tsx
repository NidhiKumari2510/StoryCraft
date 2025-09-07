import React, { useState } from 'react';
import { Book, Moon, GraduationCap, Baby, Users, BookOpen, Scissors, Gamepad2, Palette, Box, Wand2, Loader2 } from 'lucide-react';
import { Story } from '../App';
import { GoogleGenerativeAI } from "@google/generative-ai"; 

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


interface CreateStoryProps {
  onStoryGenerated: (story: Story) => void;
}

const CreateStory: React.FC<CreateStoryProps> = ({ onStoryGenerated }) => {
  const [subject, setSubject] = useState('');
  const [storyType, setStoryType] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [imageStyle, setImageStyle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const storyTypes = [
    { id: 'storybook', icon: Book, label: 'Storybook', description: 'Classic adventure tales' },
    { id: 'bedtime', icon: Moon, label: 'Bedtime Story', description: 'Peaceful and dreamy' },
    { id: 'educational', icon: GraduationCap, label: 'Educational', description: 'Learn while having fun' }
  ];

  const ageGroups = [
    { id: '0-2', icon: Baby, label: '0-2 years', description: 'Simple and sweet' },
    { id: '3-6', icon: Users, label: '3-6 years', description: 'Fun and playful' },
    { id: '7-10', icon: BookOpen, label: '7-10 years', description: 'Adventure and learning' }
  ];

  const imageStyles = [
    { id: 'paper', icon: Scissors, label: 'Paper Cut', description: 'Crafty and textured', emoji: '✂️' },
    { id: 'pixel', icon: Gamepad2, label: 'Pixel Art', description: 'Retro 8-bit style', emoji: '🎮' },
    { id: 'watercolor', icon: Palette, label: 'Watercolor', description: 'Soft and dreamy', emoji: '🎨' },
    { id: '3d', icon: Box, label: '3D Cartoon', description: 'Blocky and fun', emoji: '🧩' }
  ];

  const handleGenerate = async () => {
  if (!subject || !storyType || !ageGroup || !imageStyle) {
    alert('Please fill in all the fields to create your magical story! ✨');
    return;
  }

  setIsGenerating(true);

  try {
    const prompt = `
      Write a children's story based on these inputs:
      - Subject: ${subject}
      - Story type: ${storyType}
      - Age group: ${ageGroup}
      - Image style: ${imageStyle}

      The story should be simple, kid-friendly, and split into 4 short pages.
      Each page should have around 3–4 sentences.
      Return the story in JSON format with "pages": [{text: "..."}].
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Gemini sometimes wraps JSON in markdown
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    const story: Story = {
      id: Date.now().toString(),
      title: `The Adventure of ${subject}`,
      pages: parsed.pages.map((p: any) => ({
        text: p.text,
        // You can later generate images based on p.text using another call
        illustration: "https://placekitten.com/400/300"
      }))
    };

    onStoryGenerated(story);
  } catch (error) {
    console.error("Error generating story:", error);
    alert("Oops! Something went wrong while creating your story.");
  } finally {
    setIsGenerating(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-4">
          Create Your Magical Story
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 font-medium">
          Let's bring your imagination to life with AI magic! ✨
        </p>
      </div>

      {/* Story Subject Input */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-purple-100 mb-8">
        <label className="block text-2xl font-bold text-gray-800 mb-4">
          What's your story about? 🌟
        </label>
        <textarea
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="A rabbit who learns to share, a dragon who loves to bake, a magical tree that grants wishes..."
          className="w-full p-6 text-lg rounded-2xl border-3 border-purple-200 focus:border-purple-400 focus:outline-none resize-none h-32 bg-purple-50/50 placeholder-gray-500"
          maxLength={200}
        />
        <div className="text-right mt-2 text-sm text-gray-500">
          {subject.length}/200 characters
        </div>
      </div>

      {/* Story Type Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Choose Your Story Type 📚
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {storyTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setStoryType(type.id)}
                className={`p-6 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
                  storyType === type.id
                    ? 'border-purple-400 bg-purple-100 shadow-xl'
                    : 'border-purple-200 bg-white/80 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <Icon className={`w-12 h-12 mx-auto mb-3 ${
                  storyType === type.id ? 'text-purple-600' : 'text-purple-400'
                }`} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{type.label}</h3>
                <p className="text-gray-600">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Age Group Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Who's the story for? 👶👧👦
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {ageGroups.map((age) => {
            const Icon = age.icon;
            return (
              <button
                key={age.id}
                onClick={() => setAgeGroup(age.id)}
                className={`p-6 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
                  ageGroup === age.id
                    ? 'border-pink-400 bg-pink-100 shadow-xl'
                    : 'border-pink-200 bg-white/80 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                <Icon className={`w-12 h-12 mx-auto mb-3 ${
                  ageGroup === age.id ? 'text-pink-600' : 'text-pink-400'
                }`} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{age.label}</h3>
                <p className="text-gray-600">{age.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Image Style Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Pick Your Art Style 🎨
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {imageStyles.map((style) => {
            const Icon = style.icon;
            return (
              <button
                key={style.id}
                onClick={() => setImageStyle(style.id)}
                className={`p-6 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
                  imageStyle === style.id
                    ? 'border-blue-400 bg-blue-100 shadow-xl'
                    : 'border-blue-200 bg-white/80 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="text-3xl mb-2">{style.emoji}</div>
                <Icon className={`w-8 h-8 mx-auto mb-3 ${
                  imageStyle === style.id ? 'text-blue-600' : 'text-blue-400'
                }`} />
                <h3 className="text-lg font-bold text-gray-800 mb-1">{style.label}</h3>
                <p className="text-sm text-gray-600">{style.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !subject || !storyType || !ageGroup || !imageStyle}
          className={`px-12 py-6 rounded-full text-2xl font-bold shadow-xl transition-all duration-300 transform ${
            isGenerating || !subject || !storyType || !ageGroup || !imageStyle
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-white hover:scale-105 hover:shadow-2xl'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin inline mr-3" />
              Creating Magic...
            </>
          ) : (
            <>
              <Wand2 className="w-8 h-8 inline mr-3" />
              ✨ Generate My Story
            </>
          )}
        </button>
      </div>

      {/* Loading Animation */}
      {isGenerating && (
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-yellow-200">
          <div className="text-center">
            <div className="inline-block animate-spin w-16 h-16 border-4 border-yellow-300 border-t-yellow-600 rounded-full mb-4"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Creating Your Magical Story...</h3>
            <p className="text-lg text-gray-600">Our AI wizards are working their magic! ✨</p>
            <div className="flex justify-center space-x-2 mt-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStory;