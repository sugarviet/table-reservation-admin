import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = (hasToken) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasToken) {
    navigate('/')
    } 
  }, [hasToken, navigate]);

  return null; 
};

export default useAuth;
