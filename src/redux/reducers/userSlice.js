import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userStates",
  initialState: {
    isAuthenticated: false,
    loggedUser: {},
    favorites: []
  },
  reducers: {
    loggedUser: (state, action) =>
    {
      state.isAuthenticated = true;
      state.loggedUser = action.payload;
    },
    getFavorites: (state, action) =>
    {
      state.favorites = action.payload;
    }
  }
});

export const {
  loggedUser,
  getFavorites
} = userSlice.actions;
export default userSlice.reducer;
