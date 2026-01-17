import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axiosPublic from "../../../api/axiosPublic";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Submissions = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const contestId = searchParams.get("contestId");

  const [contests, setContests] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= STEP 1: LOAD CREATOR CONTESTS ================= */
  useEffect(() => {
    if (!user?.email) return;

    axiosPublic
      .get("/contests", { params: { creatorEmail: user.email } })
      .then(res => setContests(res.data));
  }, [user]);

  /* ================= STEP 2: LOAD SUBMISSIONS IF contestId ================= */
  useEffect(() => {
    if (!contestId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    axiosPublic
      .get(`/submissions/${contestId}`)
      .then(res => setSubmissions(res.data))
      .finally(() => setLoading(false));
  }, [contestId]);

  /* ================= DECLARE WINNER ================= */
  const declareWinner = async (submissionId) => {
    const confirm = await Swal.fire({
      title: "Declare Winner?",
      text: "Only one winner is allowed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Declare",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosPublic.patch(`/submissions/winner/${submissionId}`);
      Swal.fire("Winner Declared 🏆", "", "success");

      const res = await axiosPublic.get(`/submissions/${contestId}`);
      setSubmissions(res.data);
    } catch {
      Swal.fire("Error", "Failed to declare winner", "error");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <p className="text-center py-10 font-semibold">
        Loading submissions…
      </p>
    );
  }

  /* ================= NO contestId → SHOW CONTEST LIST ================= */
  if (!contestId) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">
          Submitted Tasks
        </h2>

        {!contests.length && (
          <p className="text-base-content/60">
            You have no contests yet.
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {contests.map(contest => (
            <div
              key={contest._id}
              className="p-5 bg-base-200 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{contest.name}</p>
                <p className="text-sm opacity-60">
                  Participants: {contest.participants}
                </p>
              </div>

              <button
                onClick={() =>
                  setSearchParams({ contestId: contest._id })
                }
                className="btn btn-sm btn-primary"
              >
                View Submissions
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ================= SHOW SUBMISSIONS ================= */
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Contest Submissions
      </h2>

      {!submissions.length && (
        <p className="text-base-content/60">
          No submissions yet.
        </p>
      )}

      <div className="space-y-4">
        {submissions.map(sub => (
          <div
            key={sub._id}
            className={`p-5 rounded-xl border ${
              sub.isWinner
                ? "border-primary bg-primary/10"
                : "bg-base-200"
            }`}
          >
            <p className="font-semibold">
              {sub.userEmail}
              {sub.isWinner && (
                <span className="ml-2 badge badge-success">
                  Winner
                </span>
              )}
            </p>

            <p className="mt-2 text-sm break-all">
              {sub.content}
            </p>

            {!sub.isWinner && (
              <button
                onClick={() => declareWinner(sub._id)}
                className="btn btn-sm btn-primary mt-4"
              >
                Declare Winner
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
