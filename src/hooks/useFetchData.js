import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetchData = (api) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [api, data, token]);

  return { data, loading };
};

export default useFetchData;
