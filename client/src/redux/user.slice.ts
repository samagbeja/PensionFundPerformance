import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  email: string;
  userType: string;
  userId?: number;
  token?: string;
}

const initialState: UserState = {
  username: "",
  email: "",
  userType: "",
  userId: undefined,
  token: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload?.email;
      state.username = action.payload?.username;
      state.userId = action.payload?.userId;
      state.userType = action.payload?.userType;
      // state.token = action.payload?.token;
      if (action.payload?.token)
        localStorage.setItem("token", action.payload?.token);
    },
    logoutUser(state) {
      state.username = "";
      state.email = "";
      state.userType = "";
      state.userId = undefined;
      // state.token = undefined;
      localStorage.removeItem("token");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
