import { configureStore } from '@reduxjs/toolkit';
import { notificationReducer } from './reducers/notificationReducer';
import { authReducer } from './reducers/authReducer';
import { filesReducer } from './reducers/fileReducer';
export const store = configureStore({
  reducer: {
    authReducer,
    notificationReducer,
    filesReducer
  },
});
