import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";

const Banner = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/all-contests?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-base-100 shadow-lg">
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-base-100 to-secondary/10"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-secondary leading-tight">
          Discover & Compete in <br />
          <span className="text-primary">Skill-Based Contests</span>
        </h1>

        <p className="mt-6 text-base-content/70 max-w-2xl mx-auto text-lg">
          Join exciting contests, showcase your talent, climb the leaderboard,
          and win amazing rewards on SkillSpire.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto"
        >
          <div className="relative w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-60" />
            <input
              type="text"
              placeholder="Search contest type (Coding, Design, Quiz...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-base-300
              focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <button
            type="submit"
            className="px-8 py-4 rounded-full bg-primary text-secondary font-semibold shadow-md hover:shadow-lg transition"
          >
            Search
          </button>
        </form>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Coding", "UI/UX", "Quiz", "Photography", "Marketing"].map(tag => (
            <span
              key={tag}
              onClick={() => navigate(`/all-contests?search=${tag}`)}
              className="px-4 py-1 rounded-full text-sm bg-base-200 hover:bg-primary hover:text-secondary cursor-pointer transition"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
