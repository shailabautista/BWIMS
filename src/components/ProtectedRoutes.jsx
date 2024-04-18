import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error("You need to select your barangay before you log-in to make any transactions online...")
      navigate('/');
    }
  }, [navigate]);

  return (
    <>{children}</>
  );
};

export default ProtectedRoutes;
