import React from "react";
import { Link, Outlet } from "react-router";
import Logo from "../components/Logo";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex bg-base-100 text-base-content">
      
      {/* Left Section (Form) */}
      <div className="flex-1 flex flex-col px-6 sm:px-12 lg:px-20 xl:px-28">
        
        {/* Logo */}
        <div className="pt-10">
          <Link to="/">
             <Logo />
          </Link>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[420px]">
            
            {/* Card */}
            <div className="bg-base-100 rounded-2xl shadow-lg p-8 border border-base-300">
              <Outlet />
            </div>

          </div>
        </div>
      </div>

      {/* Right Section (Illustration) */}
      <div className="relative flex-1 hidden md:flex items-center justify-center overflow-hidden bg-base-200">
        
        {/* Soft gradients (theme-safe) */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>

        {/* Image */}
        <img
          src={authImg}
          alt="Authentication Illustration"
          className="relative w-[75%] max-w-md drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
