import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import userProfile from "../assets/userProfile.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState("light");

  // Dynamic active link styling with a subtle bottom indicator
  const activeClass = "text-primary font-bold border-b-2 border-primary pb-1";
  const inactiveClass = "text-base-content/70 hover:text-primary transition-all duration-300 font-medium";

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") ?? "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

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
        <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-contests" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
          All Contests
        </NavLink>
      </li>
      <li>
        <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
          Leaderboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutUs" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-[100] px-4 pt-4">
      <div className="navbar bg-base-100/80 backdrop-blur-md border border-base-content/5 shadow-xl rounded-[1.5rem] px-6 py-3 transition-all duration-300">
        
        {/* Start: Logo & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <button 
              onClick={() => setOpen(!open)} 
              className="btn btn-ghost lg:hidden p-0 mr-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            {open && (
              <ul className="menu menu-sm bg-base-100 rounded-2xl mt-4 w-56 p-4 shadow-2xl border border-base-200 lg:hidden">
                {links}
              </ul>
            )}
          </div>
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-8 px-1">
            {links}
          </ul>
        </div>

        {/* End: Actions */}
        <div className="navbar-end gap-3">
          
          {/* Theme Toggle */}
          <label className="swap swap-rotate btn btn-ghost btn-circle bg-base-200/50 hover:bg-base-200">
            <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
            <svg className="swap-off h-6 w-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>
            <svg className="swap-on h-6 w-6 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12.1 22c4.9 0 9-4.1 9-9 0-4.6-3.5-8.4-8-8.9.5 1.4.3 3-.6 4.3-1.7 2.6-4.4 4.1-7.4 4.1-.1 0-.3 0-.4 0 1.2 2.8 3.9 4.5 7.4 4.5z"/></svg>
          </label>

          {!user ? (
            <Link 
              to="/login" 
              className="btn btn-primary h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-slate-900"
            >
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary/20 hover:border-primary transition-all">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || userProfile} alt="profile" />
                </div>
              </label>

              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[100] p-4 shadow-2xl bg-base-100 rounded-2xl w-64 border border-base-200">
                <div className="px-4 py-3 mb-2 border-b border-base-200">
                  <p className="text-sm font-bold opacity-80 uppercase tracking-wider">Account</p>
                  <p className="text-primary font-black truncate">{user.displayName}</p>
                </div>
                <li>
                  <Link to="/dashboard" className="py-3 flex items-center gap-3 hover:bg-primary/10 rounded-xl transition-colors">
                    <span className="bg-primary/20 p-2 rounded-lg text-primary">⚙️</span>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="py-3 mt-1 flex items-center gap-3 hover:bg-error/10 text-error rounded-xl transition-colors"
                  >
                    <span className="bg-error/20 p-2 rounded-lg text-error">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;