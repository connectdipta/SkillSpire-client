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
      name: submission.userName,
      email: submission.userEmail,
      photo: submission.userPhoto,
    });

    Swal.fire("Winner Declared 🏆", "", "success");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Submissions</h2>

      {!submissions.length && <p>No submissions yet.</p>}

      <div className="space-y-4">
        {submissions.map(sub => (
          <div key={sub._id} className="card bg-base-200 p-4 rounded-xl">
            <p><strong>Email:</strong> {sub.userEmail}</p>
            <p className="mt-2 text-sm">{sub.content}</p>

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
