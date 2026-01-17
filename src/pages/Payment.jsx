import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosPublic from "../api/axiosPublic";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { FaCreditCard, FaLock } from "react-icons/fa";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    axiosPublic.get(`/contests/${id}`).then((res) => {
      setContest(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-semibold">
        Loading payment details...
      </div>
    );
  }

  const handlePayment = async () => {
    setProcessing(true);

    Swal.fire({
      title: "Processing Payment...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await axiosPublic.post("/payments", {
        contestId: id,
        email: user.email,
        amount: contest.price,
      });

      Swal.fire({
        icon: "success",
        title: "Payment Successful 🎉",
        text: "You are registered for the contest",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(`/contests/${id}`);
    } catch (error) {
      Swal.fire(
        "Payment Failed ❌",
        error?.response?.data?.message || "Please try again",
        "error"
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-base-100 rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-extrabold text-secondary mb-2">
          Secure Payment
        </h2>
        <p className="text-base-content/60 mb-6">
          Complete payment to join the contest
        </p>

        <div className="bg-base-200 rounded-2xl p-5 mb-6 space-y-2">
          <p className="font-semibold">
            Contest: <span className="font-normal">{contest.name}</span>
          </p>
          <p className="font-semibold">
            Entry Fee: <span className="text-primary">${contest.price}</span>
          </p>
          <p className="text-sm opacity-70">
            Logged in as {user.email}
          </p>
        </div>

        {/* Fake Card UI */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <FaCreditCard className="absolute left-4 top-4 opacity-40" />
            <input
              disabled
              placeholder="4242 4242 4242 4242"
              className="input input-bordered w-full pl-12"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input disabled placeholder="MM / YY" className="input input-bordered" />
            <input disabled placeholder="CVC" className="input input-bordered" />
          </div>

          <input
            disabled
            placeholder="Cardholder Name"
            className="input input-bordered w-full"
          />
        </div>

        <button
          onClick={handlePayment}
          disabled={processing}
          className="btn btn-primary w-full text-lg rounded-full flex items-center justify-center gap-2"
        >
          <FaLock />
          {processing ? "Processing..." : `Pay $${contest.price}`}
        </button>

        <p className="text-xs text-center opacity-60 mt-4">
          🔒 Demo payment system (no real money charged)
        </p>
      </div>
    </div>
  );
};

export default Payment;
