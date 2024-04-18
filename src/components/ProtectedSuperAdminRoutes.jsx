import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedSuperAdminRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = Cookies.get('role');

    if (role !== "admin") {
      toast.error("Only admins can access this page!")
      navigate('/e-services/announcements');
    }
  }, [navigate]);

  return (
    <>{children}</>
  );
};

export default ProtectedSuperAdminRoutes;
