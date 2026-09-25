
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserCircle } from "lucide-react";

function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-700/60 bg-slate-900/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto w-full max-w-7xl px-5 py-4 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="shrink-0 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Zion's<span className="text-slate-300">Homes</span>
          </Link>

          <form className="hidden min-w-0 flex-1 md:block">
            <div className="mx-auto flex w-full max-w-md overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
              <input
                type="search"
                placeholder="Search properties..."
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                Search
              </button>
            </div>
          </form>

          <div className="hidden items-center gap-7 md:flex">
            <Link
              to="/"
              className="whitespace-nowrap text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="whitespace-nowrap text-sm font-medium text-slate-300 transition hover:text-white"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="whitespace-nowrap text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Contact
            </Link>

            {currentUser ? (
              <Link
                to="/profile"
                className="flex items-center justify-center rounded-full transition hover:opacity-80"
              >
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-slate-500 object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-500 bg-slate-800">
                    <UserCircle className="h-7 w-7 text-slate-300" />
                  </div>
                )}
              </Link>
            ) : (
              <Link
                to="/signin"
                className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                Sign In
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="ml-auto rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700 md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <form className="mt-4 md:hidden">
          <div className="flex w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
            <input
              type="search"
              placeholder="Search properties..."
              className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Search
            </button>
          </div>
        </form>

        {open && (
          <div className="mt-4 border-t border-slate-700 pt-4 md:hidden">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Contact
              </Link>

              {currentUser ? (
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center gap-3 rounded-lg px-4 py-3 text-slate-200 transition hover:bg-slate-800"
                >
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt="Profile"
                      className="h-10 w-10 rounded-full border-2 border-slate-500 object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-500 bg-slate-800">
                      <UserCircle className="h-7 w-7 text-slate-300" />
                    </div>
                  )}

                  <span className="text-sm font-medium">
                    {currentUser.username || "Profile"}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/signin"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-lg bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;