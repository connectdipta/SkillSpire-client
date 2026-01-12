import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosPublic from "../api/axiosPublic";

const ContestDetails = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axiosPublic
      .get(`/contests/${id}`)
      .then((res) => {
        setContest(res.data);
      })
      .catch((error) => {
        console.error("Failed to load contest:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-lg font-semibold">
        Loading contest details...
      </div>
    );
  }

  // ❌ Not found
  if (!contest) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-red-500">
        Contest not found
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      
      {/* Image */}
      <div className="rounded-3xl overflow-hidden shadow-lg mb-8">
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-secondary">
          {contest.name}
        </h1>

        <p className="text-base-content/70 text-lg">
          {contest.description}
        </p>

        <div className="flex items-center gap-6 mt-4">
          <span className="text-primary font-semibold">
            👥 {contest.participants} Participants
          </span>

          {contest.type && (
            <span className="px-4 py-1 rounded-full bg-base-200 text-sm">
              {contest.type}
            </span>
          )}
        </div>

        {/* Action Buttons (future-ready) */}
        <div className="mt-8 flex gap-4">
          <button
            className="px-6 py-3 rounded-full bg-primary text-secondary
            font-semibold hover:brightness-95 transition"
          >
            Join Contest
          </button>

          <button
            className="px-6 py-3 rounded-full border border-primary
            text-primary font-semibold hover:bg-primary hover:text-secondary transition"
          >
            Submit Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContestDetails;
