import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const ContestCard = ({ contest }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDetails = () => {
    if (!user) {
      // 🔐 Redirect to login & remember where to go back
      navigate("/login", {
        state: `/contests/${contest._id}`,
      });
    } else {
      navigate(`/contests/${contest._id}`);
    }
  };

  return (
    <div className="group bg-base-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
      
      <div className="h-48 overflow-hidden">
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-secondary">
          {contest.name}
        </h3>

        <p className="mt-2 text-sm text-base-content/70">
          {contest.description.slice(0, 80)}...
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-primary">
            👥 {contest.participants} Participants
          </span>

          <button
            onClick={handleDetails}
            className="px-4 py-2 rounded-full bg-primary text-secondary
            font-semibold hover:brightness-95 transition"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
