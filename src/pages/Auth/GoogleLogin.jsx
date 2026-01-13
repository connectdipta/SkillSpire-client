import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import axiosPublic from "../../api/axiosPublic";
import { useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";

const GoogleLogin = () => {
  const { signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInGoogle();

      await axiosPublic.post("/users", {
        email: result.user.email,
        name: result.user.displayName,
        photo: result.user.photoURL,
      });

      Swal.fire("Success", "Logged in", "success");
      navigate(location.state || "/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="btn w-full">
      <FcGoogle /> Login with Google
    </button>
  );
};

export default GoogleLogin;
