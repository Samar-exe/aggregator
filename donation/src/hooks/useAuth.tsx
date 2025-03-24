import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userRole = localStorage.getItem('userRole');
    const masterToken = localStorage.getItem('masterToken');
    if (userToken) {
      setIsAuthenticated(true);
      if (userRole === "admin") {
        setIsAdmin(true);
      }
    } else if (masterToken) {
      setIsAuthenticated(true);
      setIsMaster(true);
    } else {
      setIsAuthenticated(false);
      navigate('/');
    }
  }, [navigate]);

  return { isAuthenticated, isAdmin, isMaster };
};

export default useAuth;