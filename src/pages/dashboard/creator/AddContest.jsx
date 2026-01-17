import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosPublic from "../../../api/axiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const AddContest = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      /* ================= IMAGE UPLOAD ================= */
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgHost}`,
        formData
      );

      const imageUrl = imgRes.data.data.url;

      /* ================= CONTEST DATA ================= */
      const contestData = {
        name: data.name,
        image: imageUrl,
        description: data.description,
        taskInstruction: data.taskInstruction,
        type: data.type,
        price: Number(data.price),
        prize: Number(data.prize),
        deadline: deadline.toISOString(), // ✅ IMPORTANT
        creatorEmail: user.email,
      };

      /* ================= SAVE TO DB ================= */
      await axiosPublic.post("/contests", contestData);

      Swal.fire("Success 🎉", "Contest submitted for approval", "success");

      reset();
      setDeadline(new Date());
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error ❌",
        error?.response?.data?.message || "Failed to add contest",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-secondary">
          Create New Contest
        </h2>
        <p className="text-base-content/70 mt-1">
          Fill in the details carefully before submitting
        </p>
      </div>

      {/* Form */}
      <div className="bg-base-100 shadow-xl rounded-3xl p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">

          {/* Name */}
          <div>
            <label className="font-semibold">Contest Name</label>
            <input
              {...register("name", { required: true })}
              className="input input-bordered w-full mt-1"
              placeholder="Frontend Coding Challenge"
            />
          </div>

          {/* Image */}
          <div>
            <label className="font-semibold">Contest Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">
              Description (100+ words)
            </label>
            <textarea
              {...register("description", { required: true })}
              rows={5}
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Write a detailed contest description..."
            />
          </div>

          {/* Task Instruction */}
          <div>
            <label className="font-semibold">
              Task Instructions (100+ words)
            </label>
            <textarea
              {...register("taskInstruction", { required: true })}
              rows={5}
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Explain exactly what participants must submit..."
            />
          </div>

          {/* Type */}
          <div>
            <label className="font-semibold">Contest Type</label>
            <select
              {...register("type", { required: true })}
              className="select select-bordered w-full mt-1"
            >
              <option value="">Select Type</option>
              <option>Coding</option>
              <option>Design</option>
              <option>Writing</option>
              <option>Photography</option>
              <option>Quiz</option>
            </select>
          </div>

          {/* Price & Prize */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">Entry Price ($)</label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">Prize Money ($)</label>
              <input
                type="number"
                {...register("prize", { required: true })}
                className="input input-bordered w-full mt-1"
              />
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="font-semibold">Deadline</label>
            <DatePicker
              selected={deadline}
              onChange={setDeadline}
              className="input input-bordered w-full mt-1"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="btn btn-primary w-full text-lg rounded-full mt-4"
          >
            {loading ? "Submitting..." : "Submit Contest"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContest;
