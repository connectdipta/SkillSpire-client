import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosPublic from "../../../api/axiosPublic";
import Swal from "sweetalert2";

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // 🔹 Load contest data
  useEffect(() => {
    axiosPublic.get(`/contests/${id}`).then(res => {
      const contest = res.data;

      // ❌ Prevent edit if not pending
      if (contest.status !== "pending") {
        Swal.fire("Not allowed", "Contest already reviewed", "warning");
        navigate("/dashboard/my-contests");
        return;
      }

      reset(contest);
      setDeadline(new Date(contest.deadline));
      setLoading(false);
    });
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      await axiosPublic.put(`/contests/${id}`, {
        ...data,
        deadline,
      });

      Swal.fire("Updated ✅", "Contest updated successfully", "success");
      navigate("/dashboard/my-contests");
    } catch {
      Swal.fire("Error ❌", "Update failed", "error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold mb-6">Edit Contest</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">

        <input
          {...register("name")}
          className="input input-bordered"
          placeholder="Contest Name"
        />

        <input
          {...register("image")}
          className="input input-bordered"
          placeholder="Image URL"
        />

        <textarea
          {...register("description")}
          className="textarea textarea-bordered"
          rows={4}
          placeholder="Description"
        />

        <textarea
          {...register("taskInstruction")}
          className="textarea textarea-bordered"
          rows={4}
          placeholder="Task Instructions"
        />

        <select {...register("type")} className="select select-bordered">
          <option>Coding</option>
          <option>Design</option>
          <option>Writing</option>
          <option>Photography</option>
          <option>Quiz</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            {...register("price")}
            type="number"
            className="input input-bordered"
            placeholder="Price"
          />
          <input
            {...register("prize")}
            type="number"
            className="input input-bordered"
            placeholder="Prize"
          />
        </div>

        <DatePicker
          selected={deadline}
          onChange={(date) => setDeadline(date)}
          className="input input-bordered"
        />

        <button className="btn btn-primary">
          Update Contest
        </button>
      </form>
    </div>
  );
};

export default EditContest;
