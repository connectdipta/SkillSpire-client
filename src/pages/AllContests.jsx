import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axiosPublic from "../api/axiosPublic";
import ContestCard from "../components/ContestCard";

const contestTypes = [
  "All",
  "Coding",
  "Design",
  "Article Writing",
  "Photography",
  "Marketing",
  "Quiz",
];

const AllContests = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState("All");

  useEffect(() => {
    setLoading(true);

    axiosPublic
      .get("/contests", {
        params: { search },
      })
      .then((res) => {
        setContests(res.data);
      })
      .catch((err) => {
        console.error("Failed to load contests:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  // 🔥 Filter by tab
  const filteredContests =
    activeType === "All"
      ? contests
      : contests.filter(
          (contest) =>
            contest.type?.toLowerCase() === activeType.toLowerCase()
        );

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Page Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-secondary">
          All Contests
        </h1>

        {search && (
          <p className="mt-2 text-base-content/70">
            Showing results for:{" "}
            <span className="font-semibold">{search}</span>
          </p>
        )}
      </div>

      {/* 🔖 Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {contestTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition
              ${
                activeType === type
                  ? "bg-primary text-secondary"
                  : "bg-base-200 text-base-content hover:bg-primary hover:text-secondary"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20 text-lg font-semibold">
          Loading contests...
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredContests.length === 0 && (
        <div className="text-center py-20 text-base-content/70">
          No contests found.
        </div>
      )}

      {/* Contest Grid */}
      {!loading && filteredContests.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredContests.map((contest) => (
            <ContestCard key={contest._id} contest={contest} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllContests;
