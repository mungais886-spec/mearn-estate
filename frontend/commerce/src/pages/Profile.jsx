
import React from "react";
import { useSelector } from "react-redux";
import { UserCircle, LogOut, Trash2, Camera } from "lucide-react";

export const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 px-6 py-8 text-center">
            <div className="relative inline-block">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-md">
                  <UserCircle className="w-20 h-20 text-slate-400" />
                </div>
              )}

              <button
                type="button"
                className="absolute bottom-1 right-1 bg-white text-slate-700 p-2 rounded-full shadow-md hover:bg-slate-100 transition"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-4">
              {currentUser?.username || "Your Profile"}
            </h2>

            <p className="text-slate-300 text-sm mt-1">
              Manage your account information
            </p>
          </div>

          <form className="p-6 flex flex-col gap-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                defaultValue={currentUser?.username}
                placeholder="Enter your username"
                className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-800 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue={currentUser?.email}
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-800 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter a new password"
                className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-800 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold uppercase tracking-wide hover:bg-slate-700 active:bg-slate-900 transition"
            >
              Update Profile
            </button>
          </form>

          <div className="border-t border-slate-200 px-6 py-5">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-red-600 font-medium hover:bg-red-50 transition"
              >
                <Trash2 className="w-5 h-5" />
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Keep your account information up to date.
        </p>
      </div>
    </div>
  );
};
