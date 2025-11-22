




import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserinfo(state, action) {
      state.user = action.payload;
    },
    clearUserinfo(state) {
      state.user = null;
    },
  },
});

export const { setUserinfo, clearUserinfo } = userSlice.actions;
export default userSlice.reducer;