import React, { useEffect, useState } from "react";
import axiosPublic from "../../../api/axiosPublic";
import Swal from "sweetalert2";

const ManageContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load all contests
  useEffect(() => {
    axiosPublic.get("/contests").then((res) => {
      setContests(res.data);
      setLoading(false);
    });
  }, []);

  // 🔹 Update contest status
  const updateStatus = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Set contest as "${status}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    await axiosPublic.patch(`/contests/status/${id}`, { status });

    setContests((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, status } : c
      )
    );

    Swal.fire("Updated!", `Contest ${status}`, "success");
  };

  // 🔹 Delete contest
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete contest?",
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    await axiosPublic.delete(`/contests/${id}`);
    setContests((prev) => prev.filter((c) => c._id !== id));

    Swal.fire("Deleted!", "Contest removed", "success");
  };

  if (loading) {
    return <p className="text-center py-10 font-semibold">Loading contests...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Manage Contests</h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Contest</th>
              <th>Creator</th>
              <th>Participants</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <td>{index + 1}</td>

                <td className="font-semibold">
                  {contest.name}
                </td>

                <td className="text-sm">
                  {contest.creatorEmail}
                </td>

                <td>{contest.participants}</td>

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

                <td className="space-x-2">
                  {contest.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(contest._id, "confirmed")}
                        className="btn btn-xs btn-success"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => updateStatus(contest._id, "rejected")}
                        className="btn btn-xs btn-warning"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDelete(contest._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
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

export default ManageContests;
