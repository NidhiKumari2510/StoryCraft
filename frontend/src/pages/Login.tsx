import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      navigate("/create");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] relative">
      <form
        onSubmit={handleLogin}
        className="relative bg-white p-10 rounded-3xl w-full max-w-md shadow-xl border border-gray-200"
      >
        {/* Centered yellow badge heading */}
        <div className="absolute -top-8 inset-x-0 flex justify-center">
          <div className="bg-yellow-300 text-white text-xl font-bold px-6 py-2 rounded-full shadow-md">
            🌟 Welcome Back
          </div>
        </div>

        {/* Input fields */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 mt-6 p-3 rounded-md bg-gray-100 text-gray-800 placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded-md bg-gray-100 text-gray-800 placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Login button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition-all shadow-md"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Navigation link */}
        <p className="text-center text-gray-600 mt-4 font-medium">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
