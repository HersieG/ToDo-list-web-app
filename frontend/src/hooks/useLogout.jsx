import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";
const useLogout = () => {
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    try {
      console.log("Attempting to log out...");
      await logoutApi();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { handleLogout };
};

export default useLogout;
