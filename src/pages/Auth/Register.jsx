import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import GoogleLogin from './GoogleLogin';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const photoFile = watch("photo");

  const onSubmit = async (data) => {
    // 🔄 Loading alert
    Swal.fire({
      title: "Creating account...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Upload image
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgHost}`;
      const response = await axios.post(imageAPI, formData);
      const imageUrl = response.data.data.url;

      // Create user
      await registerUser(data.email, data.password);

      // Update profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: imageUrl,
      });

      Swal.close();

      // ✅ Success alert
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to SkillSpire 🎉",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location?.state || '/');
    } catch (error) {
      Swal.close();

      // ❌ Error alert
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong. Please try again.",
      });

      console.error("Registration error:", error);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-4xl font-extrabold mb-2 text-secondary">
        Create an Account
      </h2>
      <p className="text-gray-600 mb-8">
        Register with <span className="font-semibold">SkillSpire</span>
      </p>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Profile Photo
          </label>

          {photoFile && photoFile.length > 0 && (
            <img
              src={URL.createObjectURL(photoFile[0])}
              alt="Preview"
              className="mt-3 w-24 h-24 object-cover rounded-full border mb-3"
            />
          )}

          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700
            focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm mt-1">Photo is required</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700
            focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">Name is required</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700
            focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700
              focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center
              text-gray-500 hover:text-secondary transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm mt-1">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm mt-1">Minimum 6 characters</p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:brightness-95
          text-secondary font-bold py-3 rounded-lg transition"
        >
          Register
        </button>
      </form>

      {/* Already have account */}
      <p className="mt-4 text-gray-600 text-sm">
        Already have an account?
        <Link
          state={location.state}
          to="/login"
          className="ml-1 text-primary font-bold hover:underline"
        >
          Login
        </Link>
      </p>

      {/* Divider */}
      <div className="relative flex py-6 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="mx-4 text-gray-400 text-sm">Or</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Google Button */}
      <GoogleLogin label="Register with Google" />
    </div>
  );
};

export default Register;
