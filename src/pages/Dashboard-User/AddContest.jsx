import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosPublic from "../../api/axiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddContest = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [deadline, setDeadline] = useState(new Date());

  const onSubmit = async (data) => {
    const contestData = {
      ...data,
      deadline,
      participants: 0,
      status: "pending",
      creatorEmail: user.email,
    };

    try {
      await axiosPublic.post("/contests", contestData);
      Swal.fire("Success", "Contest submitted for approval", "success");
      reset();
    } catch {
      Swal.fire("Error", "Failed to add contest", "error");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Add New Contest</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 max-w-3xl">

        <input {...register("name", { required: true })}
          placeholder="Contest Name"
          className="input input-bordered w-full" />

        <input {...register("image", { required: true })}
          placeholder="Image URL"
          className="input input-bordered w-full" />

        <textarea {...register("description", { required: true })}
          placeholder="Contest Description (70+ words)"
          className="textarea textarea-bordered w-full"
          rows={4} />

        <textarea {...register("taskInstruction", { required: true })}
          placeholder="Task Instruction"
          className="textarea textarea-bordered w-full"
          rows={4} />

        <select {...register("type", { required: true })}
          className="select select-bordered w-full">
          <option value="">Select Contest Type</option>
          <option>Coding</option>
          <option>Design</option>
          <option>Writing</option>
          <option>Photography</option>
          <option>Quiz</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input {...register("price", { required: true })}
            type="number"
            placeholder="Entry Price"
            className="input input-bordered w-full" />

          <input {...register("prize", { required: true })}
            type="number"
            placeholder="Prize Money"
            className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="input input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full">
          Submit Contest
        </button>
      </form>
    </div>
  );
};

export default AddContest;
