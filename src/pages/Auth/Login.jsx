import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import GoogleLogin from './GoogleLogin';
import Swal from 'sweetalert2';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    // 🔄 Loading alert
    Swal.fire({
      title: "Logging in...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    signInUser(data.email, data.password)
      .then((result) => {
        Swal.close();

        // ✅ Success alert
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back ${result.user.displayName || ""}`,
          timer: 1800,
          showConfirmButton: false,
        });

        navigate(location?.state || '/');
      })
      .catch((error) => {
        Swal.close();

        // ❌ Error alert
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Invalid email or password",
        });
      });
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <h2 className="text-4xl font-extrabold mb-2 text-secondary">
        Welcome Back
      </h2>
      <p className="text-gray-600 mb-8">
        Login with <span className="font-semibold">SkillSpire</span>
      </p>

      {/* Login Form */}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input 
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3
            text-gray-700 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary/40
            focus:border-primary transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              Email is required
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10
              text-gray-700 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-primary/40
              focus:border-primary transition"
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

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              Password is required
            </p>
          )}
        </div>

        {/* Forget Password */}
        <div className="flex justify-end">
          <a
            href="#"
            className="text-primary text-sm font-medium hover:underline"
          >
            Forget Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:brightness-95
          text-secondary font-bold py-3 rounded-lg
          transition duration-200"
        >
          Login
        </button>
      </form>

      {/* Register Link */}
      <p className="mt-4 text-gray-600 text-sm">
        Don't have any account?
        <Link
          state={location.state}
          to="/register"
          className="ml-1 text-primary font-bold hover:underline"
        >
          Register
        </Link>
      </p>

      {/* Divider */}
      <div className="relative flex py-6 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="mx-4 text-gray-400 text-sm">Or</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Google Login */}
      <GoogleLogin label="Login with Google" />
    </div>
  );
};

export default Login;
