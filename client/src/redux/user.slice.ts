import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  email: string;
  userType: string;
  userId?: number;
}

const initialState: UserState = {
  username: "",
  email: "",
  userType: "",
  userId: undefined,
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
    },
    logoutUser(state) {
      state = initialState;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
