import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { FaUsers, FaArrowRight } from "react-icons/fa6";

const ContestCard = ({ contest }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDetails = () => {
    if (!user) {
      navigate("/login", {
        state: `/contests/${contest._id}`,
      });
    } else {
      navigate(`/contests/${contest._id}`);
    }
  };

  return (
    <div className="group relative bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col h-full">

      {/* ================= IMAGE SECTION ================= */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent opacity-60"></div>

        {/* 🔥 STATUS BADGE (TOP LEFT) */}
        <div
          className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest
            ${contest.status === "ended"
              ? "bg-red-500/90 text-white"
              : "bg-emerald-500/90 text-slate-900"}
          `}
        >
          {contest.status === "ended" ? "Ended" : "Active"}
        </div>

        {/* 👥 PARTICIPANTS BADGE (TOP RIGHT) */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
          <FaUsers className="text-primary" />
          {contest.participants}
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors duration-300 line-clamp-1">
          {contest.name}
        </h3>

        <p className="mt-3 text-slate-400 text-sm leading-relaxed line-clamp-2">
          {contest.description}
        </p>

        {/* ================= FOOTER ================= */}
        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              Prize Pool
            </span>
            <span className="text-lg font-black text-primary">
              ${contest.prize || "TBA"}
            </span>
          </div>

          <button
            onClick={handleDetails}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-slate-900 font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/10"
          >
            Details
            <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
