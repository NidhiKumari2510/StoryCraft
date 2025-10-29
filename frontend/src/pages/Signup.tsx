import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("token", data.token);
      navigate("/create");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleSignup}
        className="relative bg-white p-10 rounded-3xl w-full max-w-md shadow-[0_10px_25px_rgba(0,0,0,0.1)] border-2 border-yellow-200"
      >
        {/* Cute top decoration */}
        <div className="absolute -top-8 inset-x-0 flex justify-center">
          <div className="bg-yellow-300 text-white text-xl font-bold px-6 py-2 rounded-full shadow-md">
            🌈 Create Account
          </div>
        </div>

        <div className="mt-6">
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-4 p-3 rounded-lg bg-yellow-50 text-gray-800 placeholder-gray-500 border-2 border-yellow-200 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
          />

          <input
            type="password"
            placeholder="Choose a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-4 p-3 rounded-lg bg-pink-50 text-gray-800 placeholder-gray-500 border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
          />

          {error && (
            <p className="text-red-500 text-sm mb-4 font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-all shadow-md"
          >
            {loading ? "Creating..." : "Sign Up ✨"}
          </button>
        </div>

        <p className="text-center text-gray-700 mt-5 font-medium">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
