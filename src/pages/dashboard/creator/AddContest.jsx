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
      // 🔹 Upload image to imgbb
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );

      const imageUrl = imgRes.data.data.url;

      // 🔹 Contest payload
      const contestData = {
        name: data.name,
        image: imageUrl,
        description: data.description,
        taskInstruction: data.taskInstruction,
        type: data.type,
        price: Number(data.price),
        prize: Number(data.prize),
        deadline,
        participants: 0,
        status: "pending",
        creatorEmail: user.email,
      };

      await axiosPublic.post("/contests", contestData);

      Swal.fire("Success 🎉", "Contest submitted for approval", "success");
      reset();
    } catch (error) {
      Swal.fire("Error ❌", "Failed to add contest", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-secondary">
          Create New Contest
        </h2>
        <p className="text-base-content/70 mt-1">
          Fill in the details carefully before submitting
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-base-100 shadow-xl rounded-3xl p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">

          {/* Contest Name */}
          <div>
            <label className="font-semibold">Contest Name</label>
            <input
              {...register("name", { required: true })}
              placeholder="e.g. Frontend Coding Challenge"
              className="input input-bordered w-full mt-1"
            />
          </div>

          {/* Image Upload */}
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
            <label className="font-semibold">Description (70+ words)</label>
            <textarea
              {...register("description", { required: true })}
              rows={4}
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Describe the contest in detail..."
            />
          </div>

          {/* Task Instruction */}
          <div>
            <label className="font-semibold">Task Instructions</label>
            <textarea
              {...register("taskInstruction", { required: true })}
              rows={4}
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Explain what participants need to submit..."
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
              onChange={(date) => setDeadline(date)}
              className="input input-bordered w-full mt-1"
              dateFormat="dd/MM/yyyy"
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
