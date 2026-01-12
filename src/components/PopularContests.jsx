import React, { useEffect, useState } from "react";
import axiosPublic from "../api/axiosPublic";
import ContestCard from "./ContestCard";
import { Link } from "react-router";

const PopularContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/contests", {
        params: {
          sort: "participants",
          limit: 5,
        },
      })
      .then((res) => {
        setContests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load contests", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-secondary font-semibold">
        Loading popular contests...
      </div>
    );
  }

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-secondary">
            Popular Contests
          </h2>
          <p className="mt-3 text-base-content/70">
            Top contests based on participation
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.map((contest) => (
            <ContestCard key={contest._id} contest={contest} />
          ))}
        </div>

        {/* Show All */}
        <div className="flex justify-center mt-12">
          <Link
            to="/all-contests"
            className="px-8 py-3 rounded-full bg-secondary text-base-100
            font-semibold hover:opacity-90 transition"
          >
            Show All Contests
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularContests;
