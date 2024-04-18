import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useBarangayData = () => {
  const [barangayData, setBarangayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const barangay = Cookies.get("barangay");
  const token = Cookies.get("token");

  const filteredBarangayData = barangayData && barangayData.filter((barangays) => barangays.name === barangay);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/`
        );
        setBarangayData(response.data);
      } catch (error) {
        console.log("Error fetching data!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, barangay, barangayData, filteredBarangayData]);

  

  return { barangay, barangayData, loading, filteredBarangayData };
};

export default useBarangayData;
