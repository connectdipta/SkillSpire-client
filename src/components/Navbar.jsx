import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import userProfile from "../assets/userProfile.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const [theme, setTheme] = useState("light");

  const activeClass =
    "bg-primary text-secondary font-semibold rounded-lg px-3 py-1";

  //Initialize theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") ?? "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  // ✅ Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logout().catch(console.log);
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : "")}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-contests" className={({ isActive }) => (isActive ? activeClass : "")}>
          All Contests
        </NavLink>
      </li>
      <li>
        <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? activeClass : "")}>
          Leaderboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutUs" className={({ isActive }) => (isActive ? activeClass : "")}>
          AboutUs
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="mb-5 navbar bg-base-100 shadow-sm rounded-2xl mx-2 mt-2 px-4">
      {/* Start */}
      <div className="navbar-start">
        <button onClick={() => setOpen(!open)} className="btn btn-ghost lg:hidden">
          ☰
        </button>

        {open && (
          <ul className="menu bg-base-100 absolute top-16 left-3 shadow w-52 p-2 z-50 lg:hidden">
            {links}
          </ul>
        )}

        <Link to="/" className="ml-2">
          <Logo />
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">{links}</ul>
      </div>

      {/* End */}
      <div className="navbar-end gap-2">
        {/* 🌗 Professional Theme Toggle */}
        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />

          {/* ☀️ Sun */}
          <svg
            className="swap-off h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="5" strokeWidth="2" />
            <path strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.95 16.95l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.95 7.05l1.42-1.42" />
          </svg>

          {/* 🌙 Moon */}
          <svg
            className="swap-on h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeWidth="2"
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
            />
          </svg>
        </label>

        {!user ? (
          <Link to="/login" className="btn btn-primary rounded-2xl text-secondary">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || userProfile}
                  alt="profile"
                />
              </div>
            </label>

            <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li className="font-semibold text-center">{user.displayName}</li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
