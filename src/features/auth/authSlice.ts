import { UserType } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: UserType | null;
}

// initial state
const initialState: AuthState = {
  user: null,
};

// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn(state, action) {
      state.user = action.payload;
    },
    loggedOut(state) {
      state.user = null;
    },
  },
});

// export
export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
