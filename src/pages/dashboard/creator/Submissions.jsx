import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axiosPublic from "../../../api/axiosPublic";
import Swal from "sweetalert2";

const Submissions = () => {
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get("contestId");
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (!contestId) return;

    axiosPublic
      .get(`/submissions/${contestId}`)
      .then(res => setSubmissions(res.data));
  }, [contestId]);

  const declareWinner = async (submission) => {
    await axiosPublic.post(`/contests/${contestId}/winner`, {
      name: submission.userName || "Winner",
      email: submission.userEmail,
      photo: submission.userPhoto || "",
    });

    Swal.fire("Winner Declared 🎉", "Contest updated successfully", "success");
  };

  if (!submissions.length) {
    return (
      <p className="text-center py-10 text-base-content/60">
        No submissions yet.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Submitted Tasks</h2>

      <div className="space-y-4">
        {submissions.map(sub => (
          <div
            key={sub._id}
            className="bg-base-200 p-5 rounded-2xl shadow"
          >
            <p className="font-semibold">{sub.userEmail}</p>

            <p className="mt-2 text-sm text-base-content/70">
              {sub.content}
            </p>

            <button
              onClick={() => declareWinner(sub)}
              className="btn btn-sm btn-primary mt-3"
            >
              Declare Winner
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
