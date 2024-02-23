import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = null;
    },
    checkUserSession: (state) => {
      const userProfile = localStorage.getItem("user");
      if (userProfile) {
        const parsed = JSON.parse(userProfile);
        state.userData = parsed;
      }
    },
  },
});

export const { login, logout, checkUserSession } = userSlice.actions;

export default userSlice.reducer;
