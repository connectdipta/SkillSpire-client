import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axiosPublic from "../api/axiosPublic";
import ContestCard from "../components/ContestCard";

const AllContests = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Page Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-secondary">
          All Contests
        </h1>
        {search && (
          <p className="mt-2 text-base-content/70">
            Showing results for: <span className="font-semibold">{search}</span>
          </p>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20 text-lg font-semibold">
          Loading contests...
        </div>
      )}

      {/* Empty State */}
      {!loading && contests.length === 0 && (
        <div className="text-center py-20 text-base-content/70">
          No contests found.
        </div>
      )}

      {/* Contest Grid */}
      {!loading && contests.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contests.map((contest) => (
            <ContestCard key={contest._id} contest={contest} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllContests;
