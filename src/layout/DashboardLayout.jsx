import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FiPlusCircle, FiGrid, FiUpload } from "react-icons/fi";
import Logo from "../components/Logo";

const DashboardLayout = () => {
  const activeClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-secondary font-semibold shadow-md";

  const normalClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-base-content/80 hover:bg-base-200 transition";

  return (
    <div className="min-h-screen grid grid-cols-12 bg-base-200">

      {/* Sidebar */}
      <aside className="col-span-12 md:col-span-3 lg:col-span-2
        bg-gradient-to-b from-[#0f172a] to-[#020617]
        text-white p-5">

        {/* Logo */}
        <div className="mb-10">
          <Link to = "/"><Logo /></Link>
        </div>

        <h2 className="text-sm uppercase tracking-widest text-white/60 mb-4">
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
      </aside>

      {/* Main Content */}
      <main className="col-span-12 md:col-span-9 lg:col-span-10
        p-6 md:p-10 bg-base-100 rounded-l-3xl shadow-inner">

        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
