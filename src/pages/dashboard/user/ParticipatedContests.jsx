import React, { useEffect, useState } from "react";
import axiosPublic from "../../../api/axiosPublic";
import useAuth from "../../../hooks/useAuth";

const ParticipatedContests = () => {
  const { user } = useAuth();
  const [contests, setContests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axiosPublic.get("/submissions").then(res => {
      const joined = res.data.filter(
        sub => sub.userEmail === user.email
      );

      // sort by nearest deadline
      joined.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );

      setContests(joined);
    });
  }, [user?.email]);

  if (!contests.length) {
    return <p className="text-center text-base-content/60">
      You haven’t joined any contests yet.
    </p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Participated Contests</h2>

      <div className="space-y-4">
        {contests.map((contest, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow p-4 rounded-xl"
          >
            <h3 className="font-semibold">{contest.contestName}</h3>
            <p className="text-sm text-base-content/70">
              Deadline: {new Date(contest.deadline).toDateString()}
            </p>

            <span className="badge badge-success mt-2">
              Payment Successful
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipatedContests;
