// DEPRECATED - This file has been moved to store/slices/userSlice.ts
// Please update your imports to use:
// import { ... } from './store/slices/userSlice';

import userSliceReducer, {
  getUser,
  login,
  logout,
  reloadJwtFromStorage,
  signup,
  updateUserProfile
} from '../store/slices/userSlice';

export {
  getUser, login,
  logout, reloadJwtFromStorage, signup, updateUserProfile
};

export default userSliceReducer;
