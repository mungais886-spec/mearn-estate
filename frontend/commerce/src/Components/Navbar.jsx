import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <nav className="mx-auto w-full max-w-6xl px-4 py-3">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="shrink-0 text-xl font-bold text-gray-900 sm:text-2xl"
          >
            Mearn Estate
          </Link>

          <form className="hidden min-w-0 flex-1 md:block">
            <div className="mx-auto flex w-full max-w-md overflow-hidden rounded-md border border-gray-300">
              <input
                type="search"
                placeholder="Search properties..."
                className="min-w-0 flex-1 px-3 py-2 text-sm text-gray-800 outline-none"
              />

              <button
                type="submit"
                className="shrink-0 bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
              >
                Search
              </button>
            </div>
          </form>

          <div className="hidden items-center gap-5 md:flex">
            <Link
              to="/"
              className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-green-700"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-green-700"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-green-700"
            >
              Contact
            </Link>

            <Link
              to="/signin"
              className="whitespace-nowrap rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
            >
              Sign In
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="ml-auto rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 md:hidden"
          >
            Menu
          </button>
        </div>

        <form className="mt-3 md:hidden">
          <div className="flex w-full overflow-hidden rounded-md border border-gray-300">
            <input
              type="search"
              placeholder="Search properties..."
              className="min-w-0 flex-1 px-3 py-2 text-sm text-gray-800 outline-none"
            />

            <button
              type="submit"
              className="shrink-0 bg-green-700 px-4 py-2 text-sm font-medium text-white"
            >
              Search
            </button>
          </div>
        </form>

        {open && (
          <div className="mt-3 border-t border-gray-200 pt-3 md:hidden">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Contact
              </Link>

              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-md bg-green-700 px-4 py-2 text-center text-sm font-medium text-white"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
