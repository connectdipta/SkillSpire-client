import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosPublic from "../../api/axiosPublic";
import {
  FaUsers,
  FaTrophy,
  FaClipboardList,
  FaShieldAlt,
  FaRocket,
  FaChartLine,
  FaCrown,
} from "react-icons/fa";
import { motion } from "framer-motion";

const DashboardHome = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    axiosPublic.get("/users/me")
      .then(res => setRole(res.data.role))
      .catch(() => setRole("user"));
  }, []);

  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="text-slate-500 animate-pulse">Synchronizing your arena...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* ================= HERO SECTION ================= */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-indigo-600 rounded-[2.5rem] p-10 text-slate-900 shadow-2xl shadow-primary/20"
      >
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-3">
            Welcome back, {user?.displayName?.split(' ')[0] || "Champion"} 👋
          </h2>
          <p className="text-slate-900/80 font-medium max-w-xl text-lg">
            Your SkillSpire hub is ready. Track your growth, manage entries, and push for the next milestone.
          </p>
        </div>
        {/* Abstract background shape */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl rounded-full -mr-20 -mt-20"></div>
      </motion.div>

      {/* ================= QUICK STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<FaChartLine />} title="Your Growth" value="+24%" subtitle="Performance increase" />
        <StatCard icon={<FaUsers />} title="Global Community" value="1.2k" subtitle="Active Creators" />
        <StatCard icon={<FaTrophy />} title="Prize Pool" value="$25,000" subtitle="Ready to be won" />
      </div>

      {/* ================= ROLE BASED CONTENT ================= */}
      <div className="pt-4">
        {role === "user" && <UserDashboard />}
        {role === "creator" && <CreatorDashboard />}
        {role === "admin" && <AdminDashboard />}
      </div>

      {/* ================= MOTIVATION CARD ================= */}
      <div className="relative group bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] p-10 text-center transition-all hover:border-primary/30">
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <FaRocket className="text-5xl text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
        <h3 className="text-3xl font-black text-white mb-4">
          Ready to climb the leaderboard? 🚀
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
          Every submission is a step toward global exposure. Compete with the best and leave your mark on the spire.
        </p>
      </div>
    </div>
  );
};

/* ================= ROLE SUB-DASHBOARDS ================= */

const UserDashboard = () => (
  <section className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="h-8 w-1.5 bg-primary rounded-full"></div>
      <h3 className="text-2xl font-black text-white">Your Activity Hub</h3>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      <ActionCard icon={<FaClipboardList />} title="Joined Contests" text="Track all your active participations." />
      <ActionCard icon={<FaCrown className="text-yellow-400" />} title="My Achievements" text="View your wins and certifications." />
      <ActionCard icon={<FaUsers />} title="Talent Pool" text="See who you are competing against." />
    </div>
  </section>
);

const CreatorDashboard = () => (
  <section className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="h-8 w-1.5 bg-secondary rounded-full"></div>
      <h3 className="text-2xl font-black text-white">Creator Command Center</h3>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      <ActionCard icon={<FaClipboardList />} title="Active Contests" text="Monitor and update your hosted challenges." />
      <ActionCard icon={<FaUsers />} title="Review Submissions" text="Grade entries and provide feedback." />
      <ActionCard icon={<FaTrophy />} title="Winner Selection" text="Finalize results and award prizes." />
    </div>
  </section>
);

const AdminDashboard = () => (
  <section className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
      <h3 className="text-2xl font-black text-white">System Overview</h3>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      <ActionCard icon={<FaShieldAlt />} title="Permissions" text="Configure global system security levels." />
      <ActionCard icon={<FaUsers />} title="User Directory" text="Manage user accounts and assigned roles." />
      <ActionCard icon={<FaClipboardList />} title="Content Quality" text="Approve, reject, or flag contest entries." />
    </div>
  </section>
);

/* ================= REUSABLE ATOMS ================= */

const StatCard = ({ icon, title, value, subtitle }) => (
  <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 transition-all hover:bg-slate-900/60 group">
    <div className="text-2xl text-primary/60 group-hover:text-primary mb-4 transition-colors">{icon}</div>
    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{title}</p>
    <h4 className="text-4xl font-black text-white my-1 tracking-tight">{value}</h4>
    <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
  </div>
);

const ActionCard = ({ icon, title, text }) => (
  <div className="bg-[#0a0f1c] border border-slate-800/50 rounded-3xl p-8 hover:border-primary/40 transition-all cursor-pointer group shadow-xl">
    <div className="text-4xl text-primary/80 group-hover:text-primary mb-5 transition-colors">{icon}</div>
    <h4 className="text-xl font-black text-white mb-2">{title}</h4>
    <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
  </div>
);

export default DashboardHome;