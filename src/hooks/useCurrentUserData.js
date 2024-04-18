import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useCurrentUserData = () => {
  const token =  Cookies.get('token');
  const userId = Cookies.get('userId');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BWIMS_API_KEY}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchCurrentUserData();
    
  }, [userData, userId, token]);

  return { userData, loading };
};

export default useCurrentUserData;
