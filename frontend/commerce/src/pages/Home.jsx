
import React from "react";

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      <div className="absolute inset-0 bg-black/55" />

      <section className="relative flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-32 sm:px-10 lg:px-16">
          <div className="max-w-3xl text-white">
            <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              Find a place you can call home
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Discover a home that
              <span className="block text-yellow-400">
                fits your lifestyle.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
              Explore carefully selected properties in great locations and
              find a space that matches the way you want to live.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-lg bg-yellow-500 px-7 py-3.5 font-semibold text-black transition hover:bg-yellow-400">
                Explore Properties
              </button>

              <button className="rounded-lg border border-white/40 px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-black">
                Learn More
              </button>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h2 className="text-3xl font-bold">500+</h2>
                <p className="mt-1 text-sm text-white/70">
                  Properties Listed
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold">120+</h2>
                <p className="mt-1 text-sm text-white/70">
                  Locations
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold">98%</h2>
                <p className="mt-1 text-sm text-white/70">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;