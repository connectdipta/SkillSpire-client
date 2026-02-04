import React, { useEffect, useState } from "react";
import { FaTrophy, FaUsers, FaDollarSign } from "react-icons/fa";
import axiosPublic from "../api/axiosPublic";
import userProfile from "../assets/userProfile.png";

const WinnerShowcase = () => {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/winners")
      .then(res => setWinners(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary">
            🏆 Our Recent Winners
          </h2>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            SkillSpire rewards talent. Participate, compete, and become our next
            champion.
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <StatCard icon={<FaUsers />} title="1,200+" subtitle="Participants" />
          <StatCard icon={<FaTrophy />} title={winners.length} subtitle="Winners" />
          <StatCard icon={<FaDollarSign />} title="$25,000+" subtitle="Prize Money" />
        </div>

        {/* ================= WINNERS ================= */}
        {loading ? (
          <p className="text-center font-semibold">Loading winners…</p>
        ) : winners.length === 0 ? (
          <p className="text-center text-base-content/60">
            No winners announced yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {winners.map((winner, index) => (
              <div
                key={index}
                className="bg-base-100 rounded-3xl shadow-xl p-6 text-center
                hover:-translate-y-2 transition"
              >
                <img
                  src={winner.photo || userProfile}
                  alt={winner.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-primary"
                />

                <h3 className="text-xl font-bold mt-4 text-secondary">
                  {winner.name}
                </h3>

                <p className="text-sm text-base-content/60 mt-1">
                  Winner of <span className="font-semibold">{winner.contest}</span>
                </p>

                <div className="mt-4">
                  <span className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full font-semibold">
                    💰 ${winner.prize} Prize
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= CTA ================= */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-3 text-secondary">
            You Could Be the Next Winner 🚀
          </h3>
          <p className="text-base-content/70 mb-6">
            Join contests, submit your skills, and win exciting prizes.
          </p>
          <a
            href="/all-contests"
            className="btn btn-primary rounded-full px-8 text-lg"
          >
            Explore Contests
          </a>
        </div>
      </div>
    </section>
  );
};

/* ================= REUSABLE ================= */
const StatCard = ({ icon, title, subtitle }) => (
  <div className="bg-base-100 rounded-3xl p-6 shadow-lg text-center">
    <div className="text-4xl text-primary mb-3 flex justify-center">
      {icon}
    </div>
    <h3 className="text-3xl font-extrabold">{title}</h3>
    <p className="text-base-content/60 mt-1">{subtitle}</p>
  </div>
);

export default WinnerShowcase;
