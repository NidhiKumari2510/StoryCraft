import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { Story } from "../App";

interface StoryDisplayProps {
  story?: Story | null;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story: propStory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const state = location.state as { story?: Story } | null;

  const [story, setStory] = useState<Story | null>(
    propStory || state?.story || null
  );
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = story?.pages?.length || 0;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // ✅ Fetch from backend if not passed via state or props
    if (!story && id) {
      const fetchStory = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/history`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!res.ok) throw new Error("Failed to fetch stories");
          const stories: Story[] = await res.json();
          const found = stories.find((s) => s.id === id || s._id === id);
          if (!found) {
            alert("Story not found");
            navigate("/history");
            return;
          }
          setStory(found);
        } catch (err) {
          console.error(err);
          alert("Failed to load story");
          navigate("/history");
        } finally {
          setLoading(false);
        }
      };
      fetchStory();
    }
  }, [story, id, navigate]);

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (!story || !story.pages || story.pages.length === 0)
    return <p className="text-white text-center mt-10">No story available.</p>;

  const nextPage = () => {
    if (currentPage < story.pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(story.title, 20, 20);
    doc.setFontSize(14);
    let yOffset = 40;

    story.pages.forEach((page, i) => {
      if (yOffset > 260) {
        doc.addPage();
        yOffset = 20;
      }
      doc.text(`Page ${i + 1}:`, 20, yOffset);
      yOffset += 10;
      const splitText = doc.splitTextToSize(page.text || "", 170);
      doc.text(splitText, 20, yOffset);
      yOffset += splitText.length * 7 + 10;
    });

    doc.save(`${story.title}.pdf`);
  };

  // ✅ Save Story to Library (POST)
  const saveToLibrary = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: story.title,
            content: story.pages.map((p) => p.text).join("\n\n"),
          }),
        }
      );

      const data = await response.json();
      if (response.ok) alert("🎉 Story saved to your library successfully!");
      else alert(`⚠️ Failed to save story: ${data.message || "Try again."}`);
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong while saving the story.");
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto">
      {/* Left Poster */}
      <div className="w-1/3 flex items-center justify-center p-6">
        <img
          src="/picture.png"
          alt="Story Poster"
          className="w-full h-auto object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Right Story Content */}
      <div className="w-2/3 pl-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/create")}
          className="mb-6 flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-200"
        >
          <ArrowLeft className="w-5 h-5 text-purple-600" />
          <span className="text-lg font-semibold text-purple-600">
            Create New Story
          </span>
        </button>

        {/* Story Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
            {story.title}
          </h1>
          <div className="flex justify-center space-x-4">
            <span className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>
        </div>

        {/* Flipbook Container */}
        <div className="relative bg-gradient-to-br from-white/80 to-purple-50 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-200 mb-8">
          <div className="aspect-[4/3] relative">
            <div className="absolute inset-0 p-8 md:p-12 flex items-center justify-center">
              <div
                className="bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 
                rounded-3xl p-10 border-4 border-dashed border-pink-300 
                shadow-xl w-full"
              >
                <p className="text-lg md:text-xl leading-relaxed text-purple-900 font-comic tracking-wide text-center">
                  {story.pages[currentPage]?.text || "No content available."}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 ${
                currentPage === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-purple-500 text-white hover:bg-purple-600 hover:scale-110"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage === story.pages.length - 1}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 ${
                currentPage === story.pages.length - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-purple-500 text-white hover:bg-purple-600 hover:scale-110"
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
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
    </div>
  );
};

export default StoryDisplay;
