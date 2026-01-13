import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosPublic from "../api/axiosPublic";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const ContestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submissionText, setSubmissionText] = useState("");

  useEffect(() => {
    axiosPublic.get(`/contests/${id}`).then(res => {
      setContest(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-lg font-semibold">
        Loading contest details...
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-red-500">
        Contest not found
      </div>
    );
  }

  const deadlinePassed = new Date(contest.deadline) < new Date();

  const handleRegister = async () => {
    try {
      await axiosPublic.post(`/contests/${id}/register`);
      setIsRegistered(true);
      setContest(prev => ({
        ...prev,
        participants: prev.participants + 1,
      }));
      Swal.fire("Registered!", "You are successfully registered.", "success");
    } catch {
      Swal.fire("Error", "Registration failed", "error");
    }
  };

  const handleSubmitTask = async () => {
    if (!submissionText.trim()) return;

    await axiosPublic.post("/submissions", {
      contestId: id,
      userEmail: user.email,
      content: submissionText,
    });

    Swal.fire("Submitted!", "Your task has been submitted.", "success");
    setShowModal(false);
    setSubmissionText("");
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden shadow-xl"
      >
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-[420px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {contest.name}
          </h1>
        </div>
      </motion.div>

      {/* Info Cards */}
      <div className="grid sm:grid-cols-3 gap-6 mt-10">
        {[
          { label: "Participants", value: contest.participants, color: "text-primary" },
          { label: "Prize Money", value: `$${contest.prize}`, color: "text-secondary" },
          {
            label: "Deadline",
            value: deadlinePassed ? "Contest Ended" : new Date(contest.deadline).toLocaleDateString(),
            color: deadlinePassed ? "text-red-500" : "text-green-600",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-base-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg"
          >
            <p className="text-sm text-base-content/60">{item.label}</p>
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 space-y-6"
      >
        <div>
          <h2 className="text-2xl font-bold text-secondary mb-2">
            📘 Contest Description
          </h2>
          <p className="text-base-content/80 leading-relaxed">
            {contest.description}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-secondary mb-2">
            📝 Task Instructions
          </h2>
          <p className="text-base-content/70 leading-relaxed">
            {contest.taskInstruction}
          </p>
        </div>
      </motion.div>

      {/* Winner */}
      {contest.winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 bg-base-200 rounded-2xl p-6 flex items-center gap-4 shadow-md"
        >
          <img
            src={contest.winner.photo}
            className="w-14 h-14 rounded-full border-2 border-primary"
          />
          <div>
            <p className="text-sm text-base-content/60">Winner</p>
            <p className="font-bold text-secondary">🏆 {contest.winner.name}</p>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="mt-10 flex flex-wrap gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={deadlinePassed || isRegistered}
          onClick={handleRegister}
          className="px-8 py-3 rounded-full bg-primary text-secondary font-semibold
          disabled:opacity-50"
        >
          {isRegistered ? "Registered" : "Register / Pay"}
        </motion.button>

        {isRegistered && !deadlinePassed && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="px-8 py-3 rounded-full border border-primary
            text-primary font-semibold hover:bg-primary hover:text-secondary transition"
          >
            Submit Task
          </motion.button>
        )}
      </div>

      {/* Submit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-base-100 rounded-2xl p-6 w-full max-w-md shadow-xl"
            >
              <h3 className="text-xl font-bold mb-4">Submit Your Task</h3>

              <textarea
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                rows="5"
                placeholder="Paste GitHub repo / live link here..."
                className="w-full border border-base-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/40"
              />

              <div className="mt-5 flex justify-end gap-3">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button
                  onClick={handleSubmitTask}
                  className="bg-primary text-secondary px-5 py-2 rounded-full"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContestDetails;
