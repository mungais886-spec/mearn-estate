import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStarts: (state) => {
      state.loading = true;
      state.error = null;
    },
    siginInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signinInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  siginInSuccess,
  signinInFailure,
  signInStarts,
} = userSlice.actions;

export default userSlice.reducer;