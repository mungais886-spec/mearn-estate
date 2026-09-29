import React from "react";

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#111713]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/house_bg.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-[#111713]/40" />

      <div className="absolute inset-0 bg-[#111713]/50" />

      <section className="relative flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-32 sm:px-10 lg:px-16">
          <div className="max-w-4xl text-white">
            <span className="mb-6 inline-block rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-400 backdrop-blur-sm">
              Find a place you can call home
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Discover a home that
              <span className="block text-yellow-400">
                fits your lifestyle.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg lg:text-xl">
              Explore carefully selected properties in great locations and find
              a space that matches the way you want to live.
            </p>

            <div className="mt-10 max-w-3xl rounded-2xl border border-yellow-400/20 bg-[#111713]/90 p-4 shadow-2xl backdrop-blur-md">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Search location
                  </label>

                  <input
                    type="text"
                    placeholder="Enter a city, neighborhood or area"
                    className="w-full rounded-lg border border-gray-700 bg-[#1b241e] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                  />
                </div>

                <div className="flex items-end">
                  <button className="w-full rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-[#111713] transition hover:bg-yellow-300">
                    Search Properties
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-lg bg-yellow-400 px-7 py-3.5 font-semibold text-[#111713] shadow-lg transition hover:bg-yellow-300">
                Explore Properties
              </button>

              <button className="rounded-lg border border-yellow-400/50 bg-[#111713]/30 px-7 py-3.5 font-semibold text-white transition hover:bg-yellow-400 hover:text-[#111713]">
                Learn More
              </button>
            </div>

            <div className="mt-14 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-3">
              <div className="border-l-2 border-yellow-400 pl-4">
                <h2 className="text-3xl font-bold text-yellow-400">500+</h2>
                <p className="mt-1 text-sm text-gray-300">Properties Listed</p>
              </div>

              <div className="border-l-2 border-yellow-400 pl-4">
                <h2 className="text-3xl font-bold text-yellow-400">120+</h2>
                <p className="mt-1 text-sm text-gray-300">Locations</p>
              </div>

              <div className="col-span-2 border-l-2 border-yellow-400 pl-4 sm:col-span-1">
                <h2 className="text-3xl font-bold text-yellow-400">98%</h2>
                <p className="mt-1 text-sm text-gray-300">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
