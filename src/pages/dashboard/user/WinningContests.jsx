import React, { useEffect, useState } from "react";
import axiosPublic from "../../../api/axiosPublic";
import useAuth from "../../../hooks/useAuth";

const WinningContests = () => {
  const { user } = useAuth();
  const [wins, setWins] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axiosPublic.get("/submissions").then(res => {
      const winners = res.data.filter(
        sub => sub.userEmail === user.email && sub.isWinner === true
      );
      setWins(winners);
    });
  }, [user?.email]);

  if (!wins.length) {
    return <p className="text-center text-base-content/60">
      You haven’t won any contests yet.
    </p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Winning Contests</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {wins.map((win, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl p-6 rounded-xl"
          >
            <h3 className="font-bold text-lg">
              🏆 {win.contestName}
            </h3>
            <p className="mt-2">
              Prize: <strong>${win.prize}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinningContests;
