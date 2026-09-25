import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#111713]/90 backdrop-blur-md">
      <nav className="mx-auto w-full max-w-7xl px-5 py-4 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="shrink-0 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Zion's<span className="text-yellow-400">Homes</span>
          </Link>

          <form className="hidden min-w-0 flex-1 md:block">
            <div className="mx-auto flex w-full max-w-md overflow-hidden rounded-lg border border-white/15 bg-white/5">
              <input
                type="search"
                placeholder="Search properties..."
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-400"
              >
                Search
              </button>
            </div>
          </form>

          <div className="hidden items-center gap-7 md:flex">
            <Link
              to="/"
              className="whitespace-nowrap text-sm font-medium text-white/75 transition hover:text-yellow-400"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="whitespace-nowrap text-sm font-medium text-white/75 transition hover:text-yellow-400"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="whitespace-nowrap text-sm font-medium text-white/75 transition hover:text-yellow-400"
            >
              Contact
            </Link>

            {currentUser ? (
              <Link
                to="/profile"
                className="flex items-center gap-3"
              >
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border border-yellow-400 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
            
              </Link>
            ) : (
              <Link
                to="/signin"
                className="rounded-lg bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-black"
              >
                Sign In
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="ml-auto rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <form className="mt-4 md:hidden">
          <div className="flex w-full overflow-hidden rounded-lg border border-white/15 bg-white/5">
            <input
              type="search"
              placeholder="Search properties..."
              className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-yellow-500 px-4 py-2.5 text-sm font-semibold text-black"
            >
              Search
            </button>
          </div>
        </form>

        {open && (
          <div className="mt-4 border-t border-white/10 pt-4 md:hidden">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-yellow-400"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-yellow-400"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-yellow-400"
              >
                Contact
              </Link>

              {currentUser ? (
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center gap-3 rounded-lg px-4 py-3 text-white hover:bg-white/5"
                >
                  <img
                    src={currentUser.avatar}
                    alt="Profile"
                    className="h-10 w-10 rounded-full border border-yellow-400 object-cover"
                  />
                </Link>
              ) : (
                <Link
                  to="/signin"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-lg bg-yellow-500 px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-yellow-400"
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