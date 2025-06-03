import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { AppDispatch, RootState } from '../store/store';

type DecodedToken = {
  exp: number;
};


export const useTokenExpiration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.user.token);
  
  // Check if token is expired
  const isTokenExpired = async (): Promise<boolean> => {
    try {
      const stored = await SecureStore.getItemAsync('jwt');
      
      if (!stored) {
        return true;
      }
      
      try {
        const decoded: DecodedToken = jwtDecode(stored);
        const now = Math.floor(Date.now() / 1000); 
        return decoded.exp <= now;
      } catch (decodeError) {
        return true;
      }
    } catch (err) {
      return true;
    }
  };
  
  // Handle expired token by logging out
  const handleExpiredToken = async () => {
    try {
      if (await isTokenExpired()) {
        await SecureStore.deleteItemAsync('jwt');
        dispatch(logout());
        return true;
      }
      return false;
    } catch (error) {
      dispatch(logout());
      return true;
    }
  };
  
  // On mount, check token expiration
  useEffect(() => {
    handleExpiredToken();
    
    // set up a regular check (every minute)
    const intervalId = setInterval(() => {
      handleExpiredToken();
    }, 60000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  return {
    isTokenExpired,
    handleExpiredToken,
    checkTokenBeforeAction: async (callback: () => void) => {
      const expired = await handleExpiredToken();
      if (!expired && callback) {
        callback();
      }
    }
  };
}; 