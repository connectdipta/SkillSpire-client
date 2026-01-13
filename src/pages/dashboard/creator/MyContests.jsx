import React, { useEffect, useState } from "react";
import axiosPublic from "../../../api/axiosPublic";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyContests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosPublic
      .get("/contests", { params: { creatorEmail: user.email } })
      .then(res => setContests(res.data))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete contest?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      await axiosPublic.delete(`/contests/${id}`);
      setContests(prev => prev.filter(c => c._id !== id));
      Swal.fire("Deleted!", "Contest removed", "success");
    }
  };

  if (loading) {
    return <p className="text-center py-10 font-semibold">Loading contests…</p>;
  }

  if (!contests.length) {
    return (
      <p className="text-center py-10 text-base-content/60">
        You haven’t created any contests yet.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Contests</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Participants</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contests.map(contest => (
              <tr key={contest._id}>
                <td>{contest.name}</td>

                <td>
                  <span
                    className={`badge ${
                      contest.status === "pending"
                        ? "badge-warning"
                        : contest.status === "confirmed"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {contest.status}
                  </span>
                </td>

                <td>{contest.participants}</td>

                <td className="space-x-2">
                  {contest.status === "pending" && (
                    <button
                      onClick={() => handleDelete(contest._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  )}

                  <button
                    onClick={() =>
                      navigate(`/dashboard/submissions?contestId=${contest._id}`)
                    }
                    className="btn btn-xs btn-outline"
                  >
                    See Submissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContests;
