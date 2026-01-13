import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import axiosPublic from "../../api/axiosPublic";
import GoogleLogin from "./GoogleLogin";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const photo = watch("photo");

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Creating account...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      /* 🔹 Upload image to imgbb */
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgHost}`,
        formData
      );

      const photoURL = imgRes.data.data.url;

      /* 🔹 Firebase register */
      await registerUser(data.email, data.password);

      /* 🔹 Update Firebase profile */
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      /* 🔹 Save user in MongoDB */
      await axiosPublic.post("/users", {
        email: data.email,
        name: data.name,
        photo: photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created 🎉",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong",
      });
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-4xl font-extrabold mb-2 text-secondary">
        Create Account
      </h2>
      <p className="text-gray-600 mb-8">Join SkillSpire</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Photo */}
        <div>
          {photo && photo.length > 0 && (
            <img
              src={URL.createObjectURL(photo[0])}
              alt="preview"
              className="w-24 h-24 rounded-full mb-3 border"
            />
          )}
          <input
            type="file"
            {...register("photo", { required: "Photo is required" })}
            className="file-input file-input-bordered w-full"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.photo.message}
            </p>
          )}
        </div>

        {/* Name */}
        <input
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="input input-bordered w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="input input-bordered w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="input input-bordered w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message}
          </p>
        )}

        <button className="btn btn-primary w-full">
          Register
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?
        <Link to="/login" className="ml-1 text-primary font-bold">
          Login
        </Link>
      </p>

      <div className="divider">OR</div>

      <GoogleLogin label="Register with Google" />
    </div>
  );
};

export default Register;
