import React, { useEffect, useState } from "react";
import axiosPublic from "../api/axiosPublic";
import { FaTrophy, FaMedal } from "react-icons/fa";
import userProfile from "../assets/userProfile.png";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/leaderboard")
      .then(res => setLeaders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center py-20 text-lg font-semibold animate-pulse">
        Loading leaderboard…
      </p>
    );
  }

  if (!leaders.length) {
    return (
      <p className="text-center py-20 text-base-content/60">
        No winners yet. Be the first champion 🏆
      </p>
    );
  }
const MotivationCard = ({ icon, title, text }) => (
  <div className="bg-base-100 rounded-2xl p-6 text-center shadow-lg
  hover:-translate-y-2 hover:shadow-2xl transition">
    <div className="text-5xl mb-4">{icon}</div>
    <h4 className="text-xl font-bold mb-2 text-secondary">{title}</h4>
    <p className="text-base-content/70">{text}</p>
  </div>
);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* ================= HEADER ================= */}
      <div className="text-center mb-14">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text
        bg-gradient-to-r from-primary to-secondary">
          🏆 Leaderboard
        </h2>
        <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
          Celebrating the champions who proved their skills and dominated the contests
        </p>
      </div>

      {/* ================= TOP 3 PODIUM ================= */}
      {leaders.length >= 3 && (
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {leaders.slice(0, 3).map((user, index) => (
            <PodiumCard key={user.email} user={user} rank={index} />
          ))}
        </div>
      )}

      {/* ================= REST OF LEADERBOARD ================= */}
      <div className="space-y-4">
        {leaders.slice(3).map((user, index) => (
          <div
            key={user.email}
            className="flex items-center justify-between
            bg-base-100 rounded-2xl shadow-md p-5
            hover:shadow-xl hover:-translate-y-1 transition"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold w-8">
                {index + 4}
              </span>

              <img
                src={user.photo || userProfile}
                className="w-12 h-12 rounded-full border object-cover"
                alt="User"
              />

              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm opacity-60">{user.email}</p>
              </div>
            </div>

            <span className="badge badge-primary text-lg px-4 py-2">
              <FaTrophy className="mr-1" /> {user.wins}
            </span>
          </div>
        ))}
      </div>

            {/* ================= MOTIVATION SECTION ================= */}
      <div className="mt-24 bg-gradient-to-r from-primary/10 to-secondary/10
      rounded-3xl p-10">

        <div className="text-center mb-12">
          <h3 className="text-4xl font-extrabold text-secondary">
            Your Name Could Be Here 🚀
          </h3>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            SkillSpire is more than competitions — it’s a platform where talent
            gets rewarded, skills get recognized, and careers get boosted.
          </p>
        </div>

        {/* MOTIVATION CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          <MotivationCard
            title="Sharpen Your Skills"
            text="Compete in real-world challenges designed by experts and improve
            your coding, design, and creative skills."
            icon="💡"
          />

          <MotivationCard
            title="Win Exciting Prizes"
            text="Cash rewards, recognition, and leaderboard glory await top
            performers in every contest."
            icon="💰"
          />

          <MotivationCard
            title="Build Your Reputation"
            text="Climb the leaderboard, get noticed, and showcase your achievements
            to the world."
            icon="🏆"
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="/all-contests"
            className="btn btn-primary text-lg px-10 rounded-full shadow-lg
            hover:scale-105 transition"
          >
            Join a Contest Now
          </a>
        </div>
      </div>

    </section>
  );
};

/* ================= PODIUM CARD ================= */
const PodiumCard = ({ user, rank }) => {
  const colors = [
    "from-yellow-400 to-yellow-600",
    "from-gray-300 to-gray-500",
    "from-orange-400 to-orange-600",
  ];

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div
      className={`rounded-3xl p-6 text-center shadow-xl
      bg-gradient-to-b ${colors[rank]} text-white
      hover:-translate-y-2 transition`}
    >
      <div className="text-5xl mb-2">{medals[rank]}</div>

      <img
        src={user.photo || userProfile}
        className="w-24 h-24 mx-auto rounded-full border-4 border-white object-cover"
        alt="User"
      />

      <h3 className="text-xl font-bold mt-4">{user.name}</h3>
      <p className="text-sm opacity-90">{user.email}</p>

      <div className="mt-4 flex justify-center items-center gap-2">
        <FaMedal />
        <span className="font-semibold">{user.wins} Wins</span>
      </div>
    </div>
  );
};

export default Leaderboard;
