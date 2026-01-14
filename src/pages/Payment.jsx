import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosPublic from "../api/axiosPublic";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get(`/contests/${id}`).then(res => {
      setContest(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p className="text-center py-20">Loading payment info...</p>;
  }

  const handlePayment = async () => {
    Swal.fire({
      title: "Processing Payment...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      // ✅ 1. Increase participants
      await axiosPublic.post(`/contests/${id}/register`);

      // ✅ 2. Save payment info (optional but good)
      await axiosPublic.post("/payments", {
        contestId: id,
        userEmail: user.email,
        amount: contest.price,
        paidAt: new Date(),
      });

      Swal.fire("Payment Successful 🎉", "You are registered!", "success");

      // ✅ Redirect back
      navigate(`/contests/${id}`);
    } catch {
      Swal.fire("Payment Failed", "Try again", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <div className="bg-base-100 shadow-xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold mb-4 text-secondary">
          Payment Details
        </h2>

        <div className="space-y-3 mb-6">
          <p><strong>Contest:</strong> {contest.name}</p>
          <p><strong>Entry Fee:</strong> ${contest.price}</p>
          <p><strong>User:</strong> {user.email}</p>
        </div>

        <button
          onClick={handlePayment}
          className="btn btn-primary w-full text-lg rounded-full"
        >
          Pay & Register
        </button>
      </div>
    </div>
  );
};

export default Payment;
