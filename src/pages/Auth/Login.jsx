import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "./GoogleLogin";
import axiosPublic from "../../api/axiosPublic";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Logging in...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const result = await signInUser(data.email, data.password);

      // ✅ Save / sync user in MongoDB
      await axiosPublic.post("/users", {
        email: result.user.email,
        name: result.user.displayName || "",
        photo: result.user.photoURL || "",
      });

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(location.state || "/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-4xl font-extrabold mb-2 text-secondary">
        Welcome Back
      </h2>
      <p className="text-gray-600 mb-8">Login to SkillSpire</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email required</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: true })}
            className="input input-bordered w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">Password required</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don’t have an account?
        <Link to="/register" className="ml-1 text-primary font-bold">
          Register
        </Link>
      </p>

      <div className="divider">OR</div>

      <GoogleLogin label="Login with Google" />
    </div>
  );
};

export default Login;
