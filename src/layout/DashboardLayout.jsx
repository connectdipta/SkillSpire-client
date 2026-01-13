import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FiPlusCircle, FiGrid, FiUpload, FiLogOut } from "react-icons/fi";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import userProfile from "../assets/userProfile.png";

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  const activeClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-secondary font-semibold shadow-md";

  const normalClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-base-content/80 hover:bg-base-300 transition";

  return (
    <div className="min-h-screen grid grid-cols-12 bg-base-200">

      {/* Sidebar */}
      <aside className="col-span-12 md:col-span-3 lg:col-span-2
        bg-base-100 text-base-content p-5 flex flex-col justify-between
        border-r border-base-300">

        {/* Top Section */}
        <div>
          {/* Logo */}
          <div className="mb-10">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <h2 className="text-sm uppercase tracking-widest text-base-content/60 mb-4">
            Creator Panel
          </h2>

          <nav className="space-y-2">

            <NavLink
              to="/dashboard/add-contest"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              <FiPlusCircle className="text-lg" />
              Add Contest
            </NavLink>

            <NavLink
              to="/dashboard/my-contests"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              <FiGrid className="text-lg" />
              My Contests
            </NavLink>

            <NavLink
              to="/dashboard/submissions"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              <FiUpload className="text-lg" />
              Submitted Tasks
            </NavLink>

          </nav>
        </div>

        {/* Bottom User Section */}
        <div className="mt-10 border-t border-base-300 pt-4">

          <div className="flex items-center gap-3 mb-3">
            <img
              src={user?.photoURL || userProfile}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
              <p className="font-semibold text-sm">
                {user?.displayName || "Creator"}
              </p>
              <p className="text-xs text-base-content/60">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2
            px-4 py-2 rounded-xl bg-base-200 hover:bg-error
            hover:text-white transition text-sm font-semibold"
          >
            <FiLogOut />
            Logout
          </button>

        </div>
      </aside>

      {/* Main Content */}
      <main className="col-span-12 md:col-span-9 lg:col-span-10
        p-6 md:p-10 bg-base-200">

        <div className="bg-base-100 rounded-3xl shadow-inner p-6 md:p-8 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
