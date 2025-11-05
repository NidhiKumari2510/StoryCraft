import React, { useState } from "react";
import { Wand2, Loader2 } from "lucide-react";
import { generateStory } from "../components/service/geminiService";
import { useNavigate } from "react-router-dom";

import StorybookImage from "../assets/storyBook.png";
import BedtimeImage from "../assets/bedTime.png";
import EducationalImage from "../assets/Educational.png";
import Age0to2Image from "../assets/age_0_2.png";
import Age3to6Image from "../assets/age_3_6.png";
import Age7to10Image from "../assets/age_7_10.png";
import PaperCutImage from "../assets/paper_cut.png";
import PixelArtImage from "../assets/pixel_art.png";
import WatercolorImage from "../assets/watercolor.png";
import Cartoon3DImage from "../assets/3d_cartoon.png";
import { Story } from "../App"; //  Import type from App

// Accept the prop from App.tsx
interface CreateStoryProps {
  onStoryGenerated: (story: Story) => void;
}

const CreateStory: React.FC<CreateStoryProps> = ({ onStoryGenerated }) => {
  const [subject, setSubject] = useState("");
  const [storyType, setStoryType] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [imageStyle, setImageStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const storyTypes = [
    { id: "storybook", image: StorybookImage },
    { id: "bedtime", image: BedtimeImage },
    { id: "educational", image: EducationalImage },
  ];

  const ageGroups = [
    { id: "0-2", image: Age0to2Image },
    { id: "3-6", image: Age3to6Image },
    { id: "7-10", image: Age7to10Image },
  ];

  const imageStyles = [
    { id: "paper", image: PaperCutImage },
    { id: "pixel", image: PixelArtImage },
    { id: "watercolor", image: WatercolorImage },
    { id: "3d", image: Cartoon3DImage },
  ];

  const handleGenerate = async () => {
    if (!subject || !storyType || !ageGroup || !imageStyle) {
      alert("Please fill in all the fields to create your magical story! ✨");
      return;
    }

    setIsGenerating(true);

    try {
      console.log("🔮 Sending request with:", {
        subject,
        storyType,
        ageGroup,
        imageStyle,
      });

      const parsed = await generateStory(
        subject,
        storyType,
        ageGroup,
        imageStyle
      );
      console.log("📖 Parsed story JSON from service:", parsed);

      if (
        !parsed ||
        !Array.isArray(parsed.pages) ||
        parsed.pages.length === 0
      ) {
        throw new Error("Parsed story did not contain pages[]");
      }

      const story: Story = {
        id: Date.now().toString(),
        title: `The Adventure of ${subject}`,
        pages: parsed.pages.map((p: any, idx: number) => ({
          text: p.text ?? `Page ${idx + 1}`,
          illustration: p.illustration ?? "https://placekitten.com/400/300",
        })),
      };

      console.log("✅ Final story object:", story);

      //  Tell App.tsx that a story has been generated
      onStoryGenerated(story);

      //  Navigate to the Story page (route matches App.tsx)
      navigate("/story", { state: { story } });
    } catch (error) {
      console.error("❌ Error generating story in UI:", error);
      alert(
        "Oops! Something went wrong while creating your story. Check the browser console for details."
      );
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
          {storyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setStoryType(type.id)}
              className={`p-2 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                storyType === type.id
                  ? "bg-purple-100 shadow-xl"
                  : "bg-white/80 hover:bg-purple-50"
              }`}
            >
              <img
                src={type.image}
                alt={type.id}
                className={`w-full h-48 mx-auto mb-3 rounded-2xl border ${
                  storyType === type.id
                    ? "border-purple-400"
                    : "border-transparent"
                } transition-all duration-300`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Age Group Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Who's the story for? 👶👧👦
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {ageGroups.map((age) => (
            <button
              key={age.id}
              onClick={() => setAgeGroup(age.id)}
              className={`p-2 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                ageGroup === age.id
                  ? "bg-pink-100 shadow-xl"
                  : "bg-white/80 hover:bg-pink-50"
              }`}
            >
              <img
                src={age.image}
                alt={age.id}
                className={`w-full h-46 object-cover rounded-2xl border ${
                  ageGroup === age.id ? "border-pink-400" : "border-transparent"
                } transition-all duration-300`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Image Style Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Pick Your Art Style 🎨
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {imageStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => setImageStyle(style.id)}
              className={`p-2 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                imageStyle === style.id
                  ? "bg-blue-100 shadow-xl"
                  : "bg-white/80 hover:bg-blue-50"
              }`}
            >
              <img
                src={style.image}
                alt={style.id}
                className={`w-full h-48 object-cover rounded-2xl border ${
                  imageStyle === style.id
                    ? "border-blue-400"
                    : "border-transparent"
                } transition-all duration-300`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={handleGenerate}
          disabled={
            isGenerating || !subject || !storyType || !ageGroup || !imageStyle
          }
          className={`px-12 py-6 rounded-full text-2xl font-bold shadow-xl transition-all duration-300 transform ${
            isGenerating || !subject || !storyType || !ageGroup || !imageStyle
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-white hover:scale-105 hover:shadow-2xl"
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin inline mr-3" />
              Creating Magic...
            </>
          ) : (
            <>
              <Wand2 className="w-8 h-8 inline mr-3" />✨ Generate My Story
            </>
          )}
        </button>
      </div>

      {/* Loading Animation */}
      {isGenerating && (
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-yellow-200">
          <div className="text-center">
            <div className="inline-block animate-spin w-16 h-16 border-4 border-yellow-300 border-t-yellow-600 rounded-full mb-4"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Creating Your Magical Story...
            </h3>
            <p className="text-lg text-gray-600">
              Our AI wizards are working their magic! ✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStory;
