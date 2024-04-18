import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedAdminRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = Cookies.get('role');

    if (role !== "chairman" && role !== "secretary") {
      toast.error("Only chairmans and secretaries can access this page!")
      navigate('/e-services/announcements');
    }
  }, [navigate]);

  return (
    <>{children}</>
  );
};

export default ProtectedAdminRoutes;
