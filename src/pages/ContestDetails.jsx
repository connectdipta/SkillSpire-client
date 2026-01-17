import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosPublic from "../api/axiosPublic";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submissionText, setSubmissionText] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  /* ================= FETCH CONTEST ================= */
  useEffect(() => {
    axiosPublic.get(`/contests/${id}`).then(res => {
      setContest(res.data);
      setLoading(false);
    });
  }, [id]);

  /* ================= CHECK REGISTRATION ================= */
  useEffect(() => {
    if (!user?.email) return;

    axiosPublic
      .get(`/users/participated/${user.email}`)
      .then(res => {
        if (res.data.includes(id)) {
          setIsRegistered(true);
        }
      });
  }, [id, user]);

  /* ================= COUNTDOWN ================= */
  useEffect(() => {
    if (!contest?.deadline) return;

    const interval = setInterval(() => {
      const diff = new Date(contest.deadline) - new Date();

      if (diff <= 0) {
        setTimeLeft("Contest Ended");
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);

      setTimeLeft(`${d}d ${h}h ${m}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center font-semibold">
        Loading contest details...
      </div>
    );
  }

  const deadlinePassed = new Date(contest.deadline) < new Date();

  /* ================= PAY ================= */
  const handlePay = () => {
    navigate(`/payment/${id}`);
  };

  /* ================= SUBMIT ================= */
  const handleSubmitTask = async () => {
    if (!submissionText.trim()) return;

    try {
      await axiosPublic.post("/submissions", {
        contestId: id,
        userEmail: user.email,
        content: submissionText,
      });

      Swal.fire("Submitted!", "Your task has been submitted.", "success");
      setShowModal(false);
      setSubmissionText("");
    } catch {
      Swal.fire("Error", "Submission failed", "error");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">

      {/* HERO */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl">
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-[420px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-8">
          <h1 className="text-5xl font-extrabold text-white">
            {contest.name}
          </h1>
        </div>
      </div>

      {/* INFO */}
      <div className="grid sm:grid-cols-3 gap-6 mt-10">
        <InfoCard label="Participants" value={contest.participants} />
        <InfoCard label="Prize Money" value={`$${contest.prize}`} />
        <InfoCard
          label="Deadline"
          value={deadlinePassed ? "Contest Ended" : timeLeft}
        />
      </div>

      {/* DESCRIPTION */}
      <div className="mt-12 space-y-6">
        <Section title="📘 Contest Description">
          {contest.description}
        </Section>

        <Section title="📝 Task Instructions">
          {contest.taskInstruction}
        </Section>
      </div>

      {/* ACTIONS */}
      <div className="mt-10 flex gap-4">
        <button
          disabled={deadlinePassed || isRegistered}
          onClick={handlePay}
          className="btn btn-primary rounded-full"
        >
          {isRegistered ? "Registered" : "Register / Pay"}
        </button>

        {isRegistered && !deadlinePassed && (
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-outline rounded-full"
          >
            Submit Task
          </button>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-base-100 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Submit Your Task</h3>

              <textarea
                rows="5"
                value={submissionText}
                onChange={e => setSubmissionText(e.target.value)}
                className="textarea textarea-bordered w-full"
              />

              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button
                  onClick={handleSubmitTask}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ================= REUSABLE ================= */
const InfoCard = ({ label, value }) => (
  <div className="bg-base-200 rounded-xl p-6 text-center">
    <p className="text-sm opacity-60">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="opacity-80">{children}</p>
  </div>
);

export default ContestDetails;
