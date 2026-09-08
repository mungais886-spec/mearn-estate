import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/backend/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setLoading(false);
      console.log(data);

      navigate("/signin");
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      id="signup"
      className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10"
    >
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign up to get started with your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-slate-800 focus:ring-2 focus:ring-slate-200 disabled:opacity-60 transition duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-slate-800 focus:ring-2 focus:ring-slate-200 disabled:opacity-60 transition duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-slate-800 focus:ring-2 focus:ring-slate-200 disabled:opacity-60 transition duration-200"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            id="signupButton"
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 active:bg-slate-950 disabled:opacity-60 disabled:cursor-not-allowed transition duration-200 shadow-sm"
          >
            {loading ? "Loading..." : "Create Account"}
          </button>
        </form>

        <div className="mt-7 pt-6 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              id="signinLink"
              to="/signin"
              className="font-semibold text-slate-900 hover:text-slate-600 transition duration-200"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
