import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosPublic from "../../../api/axiosPublic";
import Swal from "sweetalert2";
import axios from "axios";

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");

  /* ---------- LOAD CONTEST ---------- */
  useEffect(() => {
    axiosPublic.get(`/contests/${id}`).then((res) => {
      const contest = res.data;

      // ❌ Block editing if already reviewed
      if (contest.status !== "pending") {
        Swal.fire("Not Allowed", "Contest already reviewed", "warning");
        navigate("/dashboard/my-contests");
        return;
      }

      reset(contest);
      setDeadline(new Date(contest.deadline));
      setImagePreview(contest.image);
      setLoading(false);
    });
  }, [id, reset, navigate]);

  /* ---------- SUBMIT ---------- */
  const onSubmit = async (data) => {
    try {
      let imageUrl = imagePreview;

      // 🔹 If new image selected → upload to imgbb
      if (data.image?.length) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
          formData
        );

        imageUrl = imgRes.data.data.url;
      }

      await axiosPublic.put(`/contests/${id}`, {
        ...data,
        image: imageUrl,
        deadline,
      });

      Swal.fire("Updated ✅", "Contest updated successfully", "success");
      navigate("/dashboard/my-contests");
    } catch (err) {
      Swal.fire("Error ❌", "Update failed", "error");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 font-semibold">
        Loading contest...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-secondary">
          Edit Contest
        </h2>
        <p className="text-base-content/70 mt-1">
          You can edit contest details before admin approval
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-base-100 shadow-xl rounded-3xl p-8">

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">

          {/* Contest Name */}
          <div>
            <label className="font-semibold">Contest Name</label>
            <input
              {...register("name")}
              className="input input-bordered w-full mt-1"
            />
          </div>

          {/* Image */}
          <div>
            <label className="font-semibold">Contest Image</label>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-52 object-cover rounded-xl mt-2 mb-3"
              />
            )}

            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="file-input file-input-bordered w-full"
            />
            <p className="text-sm text-base-content/60 mt-1">
              Leave empty to keep existing image
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="textarea textarea-bordered w-full mt-1"
            />
          </div>

          {/* Task Instruction */}
          <div>
            <label className="font-semibold">Task Instructions</label>
            <textarea
              {...register("taskInstruction")}
              rows={4}
              className="textarea textarea-bordered w-full mt-1"
            />
          </div>

          {/* Type */}
          <div>
            <label className="font-semibold">Contest Type</label>
            <select
              {...register("type")}
              className="select select-bordered w-full mt-1"
            >
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
                {...register("price")}
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">Prize Money ($)</label>
              <input
                type="number"
                {...register("prize")}
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
          <button className="btn btn-primary w-full text-lg rounded-full mt-4">
            Update Contest
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditContest;
