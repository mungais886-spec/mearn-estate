
import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-8 sm:p-10">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign up to get started with your account
          </p>
        </div>

        <form className="space-y-5">

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-slate-800 focus:ring-2 focus:ring-slate-200 transition duration-200"
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
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-slate-800 focus:ring-2 focus:ring-slate-200 transition duration-200"
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
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-slate-800 focus:ring-2 focus:ring-slate-200 transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 active:bg-slate-950 transition duration-200 shadow-sm"
          >
            Create Account
          </button>

        </form>

        <div className="mt-7 pt-6 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="font-semibold text-slate-900 hover:text-slate-600 transition duration-200"
            >
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default SignUp