import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const GoogleLogin = ({ label = "Login with Google" }) => {
  const { signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    Swal.fire({
      title: "Signing in...",
      text: "Please wait while we log you in",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    signInGoogle()
      .then(async (result) => {
        // ✅ FIX: refresh Firebase user
        await result.user.reload();

        Swal.close();

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome ${result.user.displayName || "to SkillSpire"}`,
          timer: 1800,
          showConfirmButton: false,
        });

        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.close();

        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message || "Something went wrong. Please try again.",
        });

        console.error("Google login error:", error);
      });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-[#EAECEF] hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg 
                 flex items-center justify-center gap-2 transition duration-200"
    >
      <FcGoogle className="w-5 h-5" />
      {label}
    </button>
  );
};

export default GoogleLogin;
