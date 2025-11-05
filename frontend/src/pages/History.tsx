import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Story {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const History: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //  Fetch user's saved stories
  const fetchStories = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/history`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStories(data);
      } else {
        console.error("Error fetching stories:", data.message);
      }
    } catch (err) {
      console.error("Error fetching stories:", err);
    } finally {
      setLoading(false);
    }
  };

  //  Delete story handler
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    if (!confirm("Are you sure you want to delete this story?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/history/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Story deleted successfully!");
        setStories((prev) => prev.filter((story) => story._id !== id));
      } else {
        alert(data.message || "Failed to delete story");
      }
    } catch (err) {
      console.error("Error deleting story:", err);
      alert("Error deleting story");
    }
  };

  //  Download story as .txt
  const handleDownload = (story: Story) => {
    const blob = new Blob([story.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${story.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  if (loading)
    return <p className="text-white text-center mt-10">Loading stories...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Your Saved Stories
      </h2>

      {stories.length === 0 ? (
        <p className="text-gray-300 text-center">
          No stories saved yet.{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/create")}
          >
            Create one now!
          </span>
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white/10 border border-white/20 p-5 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-black mb-2">
                {story.title}
              </h3>
              <p className="text-black line-clamp-3 mb-3">
                {story.content.slice(0, 100)}...
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Created: {new Date(story.createdAt).toLocaleDateString()}
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    // Convert content to pages if needed
                    const pages = story.content
                      ? story.content.split(/\n\s*\n/).map((text) => ({ text }))
                      : [];
                    navigate(`/story/${story._id}`, {
                      state: { story: { ...story, pages } },
                    });
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm"
                >
                  View
                </button>

                <button
                  onClick={() => handleDownload(story)}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md text-sm"
                >
                  Download
                </button>

                <button
                  onClick={() => handleDelete(story._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
