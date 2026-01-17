import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../api/axiosPublic";
import userProfile from "../../../assets/userProfile.png";

const MyProfile = () => {
  const { user } = useAuth();

  const [participated, setParticipated] = useState(0);
  const [wins, setWins] = useState(0);
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const loadStats = async () => {
      try {
        const [pRes, wRes] = await Promise.all([
          axiosPublic.get(`/users/participated/${user.email}`),
          axiosPublic.get(`/users/won/${user.email}`),
        ]);

        setParticipated(pRes.data.length);
        setWins(wRes.data.length);
      } catch (err) {
        console.error(err);
      }
    };

    loadStats();
  }, [user?.email]);

  const winPercentage =
    participated === 0
      ? 0
      : Math.round((wins / participated) * 100);

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      <div className="card bg-base-100 shadow-xl p-6 rounded-2xl space-y-6">

        {/* USER INFO */}
        <div className="flex items-center gap-5">
          <img
            src={user?.photoURL || userProfile}
            alt="User"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div>
            <p className="text-xl font-bold">
              {user?.displayName || "User"}
            </p>
            <p className="text-sm text-base-content/60">
              {user?.email}
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Participated" value={participated} />
          <StatCard label="Wins" value={wins} />
        </div>

        {/* WIN RATE */}
        <div>
          <p className="font-semibold mb-1">
            Win Percentage
          </p>
          <progress
            className="progress progress-success w-full"
            value={winPercentage}
            max="100"
          />
          <p className="text-sm mt-1">{winPercentage}%</p>
        </div>

        {/* EXTRA FIELD: BIO */}
        <div>
          <label className="font-semibold text-sm">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Write something about yourself…"
            className="textarea textarea-bordered w-full mt-1"
          />
        </div>

        {/* EXTRA FIELD: ADDRESS */}
        <div>
          <label className="font-semibold text-sm">
            Address
          </label>
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Your address"
            className="input input-bordered w-full mt-1"
          />
        </div>

        {/* SAVE BUTTON (optional backend later) */}
        <button className="btn btn-primary w-full">
          Update Profile
        </button>
      </div>
    </div>
  );
};

/* ================= REUSABLE ================= */
const StatCard = ({ label, value }) => (
  <div className="bg-base-200 rounded-xl p-4 text-center">
    <p className="text-sm opacity-60">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default MyProfile;
