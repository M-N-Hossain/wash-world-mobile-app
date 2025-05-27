import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { AppDispatch, RootState } from '../store/store';

type DecodedToken = {
  exp: number;
};

/**
 * A hook to check if the token is expired and handle token expiration
 * Can be used in components that need to verify token validity
 */
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
      
      const decoded: DecodedToken = jwtDecode(stored);
      const now = Math.floor(Date.now() / 1000); // current time in seconds
      
      return decoded.exp <= now;
    } catch (err) {
      console.error('Error checking token expiration:', err);
      return true;
    }
  };
  
  // Handle expired token by logging out
  const handleExpiredToken = async () => {
    if (await isTokenExpired()) {
      console.log('Token is expired, logging out');
      await SecureStore.deleteItemAsync('jwt');
      dispatch(logout());
      return true;
    }
    return false;
  };
  
  // On mount, check token expiration
  useEffect(() => {
    handleExpiredToken();
  }, []);
  
  return {
    isTokenExpired,
    handleExpiredToken,
    // Convenience method to check before any sensitive operation
    checkTokenBeforeAction: async (callback: () => void) => {
      const expired = await handleExpiredToken();
      if (!expired && callback) {
        callback();
      }
    }
  };
}; 