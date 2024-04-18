import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useUsersData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BWIMS_API_KEY}/api/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        alert('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [users, token]);

  return { users, loading };
};

export default useUsersData;
