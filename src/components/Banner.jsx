import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Banner = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    // 🔥 BACKEND READY
    // Later you will send `query` to backend
    console.log("Searching contest type:", query);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-base-100 shadow-lg">
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-base-100 to-secondary/10"></div>

      {/* Decorative Blurs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-secondary leading-tight">
          Discover & Compete in <br />
          <span className="text-primary">Skill-Based Contests</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base-content/70 max-w-2xl mx-auto text-lg">
          Join exciting contests, showcase your talent, climb the leaderboard,
          and win amazing rewards on SkillSpire.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto"
        >
          <div className="relative w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 text-xl" />
            <input
              type="text"
              placeholder="Search contest type (Coding, Design, Quiz...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
                w-full pl-12 pr-4 py-4 rounded-full
                bg-base-100 border border-base-300
                focus:outline-none focus:ring-2 focus:ring-primary/40
                transition
              "
            />
          </div>

          <button
            type="submit"
            className="
              px-8 py-4 rounded-full
              bg-primary text-secondary font-semibold
              hover:brightness-95 transition
              shadow-md hover:shadow-lg
            "
          >
            Search
          </button>
        </form>

        {/* Tags / Suggestions */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Coding", "UI/UX", "Quiz", "Photography", "Marketing"].map(
            (tag) => (
              <span
                key={tag}
                className="px-4 py-1 rounded-full text-sm
                bg-base-200 text-base-content/80
                hover:bg-primary hover:text-secondary
                transition cursor-pointer"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
