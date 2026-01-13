import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FiPlusCircle,
  FiGrid,
  FiUpload,
  FiUsers,
  FiCheckSquare,
  FiLogOut,
} from "react-icons/fi";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import axiosPublic from "../api/axiosPublic";
import userProfile from "../assets/userProfile.png";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/users/role/${user.email}`)
        .then(res => setRole(res.data.role));
    }
  }, [user]);

  const activeClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-secondary font-semibold";

  const normalClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-base-content/80 hover:bg-base-300 transition";

  return (
    <div className="min-h-screen grid grid-cols-12 bg-base-200">
      {/* Sidebar */}
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-base-100 p-5 flex flex-col justify-between border-r">
        <div>
          <Link to="/" className="mb-8 block">
            <Logo />
          </Link>

          {/* CREATOR LINKS */}
          {role === "creator" && (
            <>
              <h2 className="text-xs uppercase mb-3 opacity-60">
                Creator Panel
              </h2>
              <NavLink to="/dashboard/add-contest" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FiPlusCircle /> Add Contest
              </NavLink>
              <NavLink to="/dashboard/my-contests" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FiGrid /> My Contests
              </NavLink>
              <NavLink to="/dashboard/submissions" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FiUpload /> Submissions
              </NavLink>
            </>
          )}

          {/* ADMIN LINKS */}
          {role === "admin" && (
            <>
              <h2 className="text-xs uppercase mt-6 mb-3 opacity-60">
                Admin Panel
              </h2>
              <NavLink to="/dashboard/manage-users" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FiUsers /> Manage Users
              </NavLink>
              <NavLink to="/dashboard/manage-contests" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FiCheckSquare /> Manage Contests
              </NavLink>
            </>
          )}
        </div>

        {/* USER INFO */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user?.photoURL || userProfile}
              className="w-10 h-10 rounded-full"
              alt="User"
            />
            <div>
              <p className="font-semibold text-sm">{user?.displayName}</p>
              <p className="text-xs opacity-60">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-base-200 hover:bg-error hover:text-white px-4 py-2 rounded-xl"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-6">
        <div className="bg-base-100 rounded-3xl p-6 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
