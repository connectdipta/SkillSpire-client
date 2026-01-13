import React, { useEffect, useState } from "react";
import axiosPublic from "../../api/axiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const MyContests = () => {
  const { user } = useAuth();
  const [contests, setContests] = useState([]);

  useEffect(() => {
    axiosPublic
      .get("/contests", { params: { creatorEmail: user.email } })
      .then(res => setContests(res.data));
  }, [user.email]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete contest?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      await axiosPublic.delete(`/contests/${id}`);
      setContests(contests.filter(c => c._id !== id));
      Swal.fire("Deleted!", "", "success");
    }
  };

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
                  <span className={`badge ${
                    contest.status === "pending"
                      ? "badge-warning"
                      : contest.status === "confirmed"
                      ? "badge-success"
                      : "badge-error"
                  }`}>
                    {contest.status}
                  </span>
                </td>
                <td>{contest.participants}</td>
                <td className="space-x-2">
                  {contest.status === "pending" && (
                    <button
                      onClick={() => handleDelete(contest._id)}
                      className="btn btn-xs btn-error">
                      Delete
                    </button>
                  )}
                  <button className="btn btn-xs btn-outline">
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
