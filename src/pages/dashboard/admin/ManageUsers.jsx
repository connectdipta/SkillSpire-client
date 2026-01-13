import React, { useEffect, useState } from "react";
import axiosPublic from "../../../api/axiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const ManageUsers = () => {
  const { user: loggedInUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load users
  useEffect(() => {
    axiosPublic.get("/users").then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  // 🔹 Change role
  const handleRoleChange = async (email, role) => {
    if (email === loggedInUser.email) {
      Swal.fire("Not Allowed", "You cannot change your own role", "warning");
      return;
    }

    const result = await Swal.fire({
      title: "Change Role?",
      text: `Set role to "${role}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Change",
    });

    if (!result.isConfirmed) return;

    await axiosPublic.patch(`/users/role/${email}`, { role });

    setUsers((prev) =>
      prev.map((u) =>
        u.email === email ? { ...u, role } : u
      )
    );

    Swal.fire("Updated!", "User role updated", "success");
  };

  if (loading) {
    return <p className="text-center py-10 font-semibold">Loading users...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, index) => (
              <tr key={u._id}>
                <td>{index + 1}</td>

                <td className="font-semibold">
                  {u.name || "N/A"}
                </td>

                <td>{u.email}</td>

                <td>
                  <span
                    className={`badge ${
                      u.role === "admin"
                        ? "badge-error"
                        : u.role === "creator"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleRoleChange(u.email, "user")}
                    className="btn btn-xs btn-outline"
                  >
                    User
                  </button>

                  <button
                    onClick={() => handleRoleChange(u.email, "creator")}
                    className="btn btn-xs btn-warning"
                  >
                    Creator
                  </button>

                  <button
                    onClick={() => handleRoleChange(u.email, "admin")}
                    className="btn btn-xs btn-error"
                  >
                    Admin
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

export default ManageUsers;
