import React, { useEffect, useState } from "react";
import axiosPublic from "../../../api/axiosPublic";
import useAuth from "../../../hooks/useAuth";

const ParticipatedContests = () => {
  const { user } = useAuth();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const loadParticipatedContests = async () => {
      try {
        // 1️⃣ Get contest IDs user participated in
        const idsRes = await axiosPublic.get(
          `/users/participated/${user.email}`
        );

        const contestIds = idsRes.data;

        if (!contestIds.length) {
          setContests([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Fetch contest details
        const contestRequests = contestIds.map(id =>
          axiosPublic.get(`/contests/${id}`).then(res => res.data)
        );

        const contestsData = await Promise.all(contestRequests);

        // 3️⃣ Sort by nearest deadline
        contestsData.sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );

        setContests(contestsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadParticipatedContests();
  }, [user?.email]);

  if (loading) {
    return (
      <p className="text-center py-10 font-semibold">
        Loading participated contests…
      </p>
    );
  }

  if (!contests.length) {
    return (
      <p className="text-center text-base-content/60">
        You haven’t joined any contests yet.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        My Participated Contests
      </h2>

      <div className="space-y-4">
        {contests.map(contest => (
          <div
            key={contest._id}
            className="card bg-base-100 shadow p-4 rounded-xl"
          >
            <h3 className="font-semibold text-lg">
              {contest.name}
            </h3>

            <p className="text-sm text-base-content/70">
              Deadline:{" "}
              {new Date(contest.deadline).toDateString()}
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
