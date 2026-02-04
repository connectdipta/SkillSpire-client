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
} from "react-icons/fa";

const DashboardHome = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/users/role/${user.email}`)
        .then(res => setRole(res.data.role));
    }
  }, [user]);

  if (!role) {
    return <p className="text-center py-20">Loading dashboard…</p>;
  }

  return (
    <div className="space-y-14">

      {/* ================= HERO ================= */}
      <div className="bg-gradient-to-r from-primary to-secondary
      rounded-3xl p-8 text-white shadow-xl">
        <h2 className="text-4xl font-extrabold mb-2">
          Welcome back, {user?.displayName || "User"} 👋
        </h2>
        <p className="text-white/90 max-w-2xl">
          This is your personal SkillSpire dashboard.
          Track progress, manage activities, and reach new milestones.
        </p>
      </div>

      {/* ================= QUICK STATS ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          icon={<FaChartLine />}
          title="Growth"
          value="+24%"
          subtitle="This month"
        />
        <StatCard
          icon={<FaUsers />}
          title="Community"
          value="1,200+"
          subtitle="Active users"
        />
        <StatCard
          icon={<FaTrophy />}
          title="Rewards"
          value="$25K+"
          subtitle="Prize money"
        />
      </div>

      {/* ================= ROLE BASED ================= */}
      {role === "user" && <UserDashboard />}
      {role === "creator" && <CreatorDashboard />}
      {role === "admin" && <AdminDashboard />}

      {/* ================= MOTIVATION ================= */}
      <div className="bg-base-200 rounded-3xl p-8 text-center">
        <FaRocket className="text-5xl text-primary mx-auto mb-4" />
        <h3 className="text-3xl font-bold mb-3">
          Ready to level up? 🚀
        </h3>
        <p className="text-base-content/70 max-w-xl mx-auto">
          Participate in contests, showcase your skills, and climb the leaderboard.
          Every challenge is a step toward success.
        </p>
      </div>
    </div>
  );
};

/* ================= USER ================= */
const UserDashboard = () => (
  <section>
    <h3 className="text-2xl font-bold mb-6">Your Activities</h3>
    <div className="grid md:grid-cols-3 gap-6">
      <ActionCard
        icon={<FaClipboardList />}
        title="Participated Contests"
        text="View all contests you joined"
      />
      <ActionCard
        icon={<FaTrophy />}
        title="My Wins"
        text="Celebrate your achievements"
      />
      <ActionCard
        icon={<FaUsers />}
        title="Community"
        text="Compete with talented people"
      />
    </div>
  </section>
);

/* ================= CREATOR ================= */
const CreatorDashboard = () => (
  <section>
    <h3 className="text-2xl font-bold mb-6">Creator Panel</h3>
    <div className="grid md:grid-cols-3 gap-6">
      <ActionCard
        icon={<FaClipboardList />}
        title="My Contests"
        text="Manage contests you created"
      />
      <ActionCard
        icon={<FaUsers />}
        title="Submissions"
        text="Review participant entries"
      />
      <ActionCard
        icon={<FaTrophy />}
        title="Declare Winners"
        text="Reward the best talent"
      />
    </div>
  </section>
);

/* ================= ADMIN ================= */
const AdminDashboard = () => (
  <section>
    <h3 className="text-2xl font-bold mb-6">Admin Overview</h3>
    <div className="grid md:grid-cols-3 gap-6">
      <ActionCard
        icon={<FaShieldAlt />}
        title="Admin Control"
        text="Full system access"
      />
      <ActionCard
        icon={<FaUsers />}
        title="Manage Users"
        text="Control user roles"
      />
      <ActionCard
        icon={<FaClipboardList />}
        title="Manage Contests"
        text="Approve or reject contests"
      />
    </div>
  </section>
);

/* ================= COMPONENTS ================= */
const StatCard = ({ icon, title, value, subtitle }) => (
  <div className="bg-base-100 rounded-2xl p-6 shadow-lg
  hover:shadow-2xl hover:-translate-y-1 transition">
    <div className="text-3xl text-primary mb-2">{icon}</div>
    <h4 className="text-xl font-bold">{title}</h4>
    <p className="text-3xl font-extrabold my-1">{value}</p>
    <p className="text-sm opacity-60">{subtitle}</p>
  </div>
);

const ActionCard = ({ icon, title, text }) => (
  <div className="bg-base-100 rounded-2xl p-6 shadow-xl
  hover:-translate-y-1 hover:shadow-2xl transition">
    <div className="text-4xl text-primary mb-3">{icon}</div>
    <h4 className="text-xl font-bold mb-1">{title}</h4>
    <p className="text-base-content/70">{text}</p>
  </div>
);

export default DashboardHome;
