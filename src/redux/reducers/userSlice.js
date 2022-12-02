import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userStates",
  initialState: {
    isAuthenticated: false,
    loggedUser: {},
    favorites: [],
    countries: [],
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
    },
    getCountries: (state, action) =>
    {
      state.countries = action.payload;
    }
  }
});

export const {
  loggedUser,
  getFavorites,
  getCountries
} = userSlice.actions;
export default userSlice.reducer;
