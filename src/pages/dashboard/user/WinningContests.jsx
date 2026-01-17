import React, { useEffect, useState } from "react";
import axiosPublic from "../../../api/axiosPublic";
import useAuth from "../../../hooks/useAuth";

const WinningContests = () => {
  const { user } = useAuth();
  const [wins, setWins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const loadWins = async () => {
      try {
        // 1️⃣ get won contest IDs from user
        const idsRes = await axiosPublic.get(
          `/users/won/${user.email}`
        );

        const contestIds = idsRes.data;

        if (!contestIds.length) {
          setWins([]);
          setLoading(false);
          return;
        }

        // 2️⃣ load contest details
        const requests = contestIds.map(id =>
          axiosPublic.get(`/contests/${id}`).then(res => res.data)
        );

        const contests = await Promise.all(requests);
        setWins(contests);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWins();
  }, [user?.email]);

  if (loading) {
    return (
      <p className="text-center py-10 font-semibold">
        Loading winning contests…
      </p>
    );
  }

  if (!wins.length) {
    return (
      <p className="text-center text-base-content/60">
        You haven’t won any contests yet.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        My Winning Contests 🏆
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {wins.map(contest => (
          <div
            key={contest._id}
            className="card bg-base-100 shadow-xl p-6 rounded-xl border border-primary/30"
          >
            <h3 className="font-bold text-lg text-secondary">
              🏆 {contest.name}
            </h3>

            <p className="mt-2">
              Prize:{" "}
              <span className="font-bold text-primary">
                ${contest.prize}
              </span>
            </p>

            <p className="text-sm text-base-content/60 mt-1">
              Deadline:{" "}
              {new Date(contest.deadline).toDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinningContests;
