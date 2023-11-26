import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error_notification: null,
  success_notification: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.error_notification = null;
      state.success_notification = null;
    },
  }
});

export const notificationReducer = notificationSlice.reducer;

export const notificationActions = notificationSlice.actions;

export const notificationSelector = (state) => state.notificationReducer;
