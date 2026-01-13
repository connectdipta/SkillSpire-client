import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../api/axiosPublic";

const MyProfile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, wins: 0 });

  useEffect(() => {
    if (!user?.email) return;

    axiosPublic.get("/submissions").then(res => {
      const mine = res.data.filter(sub => sub.userEmail === user.email);
      const wins = mine.filter(sub => sub.isWinner).length;

      setStats({
        total: mine.length,
        wins,
      });
    });
  }, [user?.email]);

  const winPercentage =
    stats.total === 0 ? 0 : Math.round((stats.wins / stats.total) * 100);

  return (
    <div className="max-w-xl">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      <div className="card bg-base-100 shadow-xl p-6 rounded-xl">
        <img
          src={user?.photoURL}
          className="w-24 h-24 rounded-full mb-4"
        />

        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>

        <div className="mt-4">
          <p className="font-semibold">Win Percentage</p>
          <progress
            className="progress progress-success w-full"
            value={winPercentage}
            max="100"
          ></progress>
          <p className="text-sm mt-1">{winPercentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
