import { configureStore } from '@reduxjs/toolkit';
import { notificationReducer } from './reducers/notificationReducer';
import { authReducer } from './reducers/authReducer';
export const store = configureStore({
  reducer: {
    authReducer,
    notificationReducer
  },
});
