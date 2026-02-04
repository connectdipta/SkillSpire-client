import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPublic from "../../../api/axiosPublic";
import axios from "axios";
import Swal from "sweetalert2";
import userProfile from "../../../assets/userProfile.png";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();

  const [participated, setParticipated] = useState(0);
  const [wins, setWins] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= LOAD USER DATA ================= */
  useEffect(() => {
    if (!user?.email) return;

    const loadProfile = async () => {
      const res = await axiosPublic.get("/users");
      const me = res.data.find(u => u.email === user.email);

      if (me) {
        setName(me.name || user.displayName || "");
        setBio(me.bio || "");
        setPhotoURL(me.photo || user.photoURL || "");
      }
    };

    loadProfile();
  }, [user?.email]);

  /* ================= LOAD STATS ================= */
  useEffect(() => {
    if (!user?.email) return;

    const loadStats = async () => {
      const [pRes, wRes] = await Promise.all([
        axiosPublic.get(`/users/participated/${user.email}`),
        axiosPublic.get(`/users/won/${user.email}`),
      ]);

      setParticipated(pRes.data.length);
      setWins(wRes.data.length);
    };

    loadStats();
  }, [user?.email]);

  const winPercentage =
    participated === 0 ? 0 : Math.round((wins / participated) * 100);

  /* ================= UPDATE PROFILE ================= */
  const handleUpdateProfile = async () => {
    setLoading(true);

    try {
      let updatedPhoto = photoURL;

      // upload image if changed
      if (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgHost}`,
          formData
        );

        updatedPhoto = imgRes.data.data.url;
      }

      // Firebase update
      await updateUserProfile({
        displayName: name,
        photoURL: updatedPhoto,
      });

      // MongoDB update
      await axiosPublic.patch(`/users/profile/${user.email}`, {
        name,
        photo: updatedPhoto,
        bio,
      });

      setPhotoURL(updatedPhoto);
      setShowModal(false);

      Swal.fire({
        icon: "success",
        title: "Profile Updated 🎉",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire("Error", "Profile update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      {/* PROFILE CARD */}
      <div className="card bg-base-100 shadow-xl p-6 rounded-2xl space-y-6">

        <div className="flex items-center gap-5">
          <img
            src={photoURL || userProfile}
            className="w-24 h-24 rounded-full border object-cover"
            alt="User"
          />

          <div>
            <p className="text-xl font-bold">{name}</p>
            <p className="text-sm opacity-60">{user?.email}</p>
            {bio && <p className="mt-2 text-sm opacity-80">{bio}</p>}
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Participated" value={participated} />
          <Stat label="Wins" value={wins} />
        </div>

        {/* WIN RATE */}
        <div>
          <p className="font-semibold mb-1">Win Percentage</p>
          <progress
            className="progress progress-success w-full"
            value={winPercentage}
            max="100"
          />
          <p className="text-sm mt-1">{winPercentage}%</p>
        </div>

        {/* UPDATE BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary w-full"
        >
          Update Profile
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-2xl p-6 w-full max-w-md">

            <h3 className="text-xl font-bold mb-4">Update Profile</h3>

            <div className="mb-3">
              <label className="text-sm font-semibold">Name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div className="mb-3">
              <label className="text-sm font-semibold">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => setPhotoFile(e.target.files[0])}
                className="file-input file-input-bordered w-full mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold">Bio</label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="textarea textarea-bordered w-full mt-1"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= REUSABLE ================= */
const Stat = ({ label, value }) => (
  <div className="bg-base-200 rounded-xl p-4 text-center">
    <p className="text-sm opacity-60">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default MyProfile;
