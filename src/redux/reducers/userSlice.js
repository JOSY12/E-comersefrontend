import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userStates",
  initialState: {
    isAuthenticated: false,
    loggedUser: {},
    favorites: [],
    users: [],
    filterUser: [],
    banerUser: [],
    userAddress:[],
    filterbanerUser: [],
  },
  reducers: {
    loggedUser: (state, action) => {
      state.isAuthenticated = true;
      state.loggedUser = action.payload;
    },
    getFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    getCountries: (state, action) => {
      state.countries = action.payload;
    },
    allUser: (state, action) => {
      state.users = action.payload;
      state.filterUser = action.payload;
    },
    deleteUser(state, action) {
      const delUser = state.filterUser.filter((e) => e.id !== action.payload);
      state.users = delUser;
    },
    searchByUser(state, action) {
      let filtUser = state.filterUser.filter((us) =>
        us.username.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.users = filtUser;
    },
    sortUser: (state, action) => {
      const orderFullname =
        action.payload === "Asc"
          ? state.users.sort((a, b) => (a.email > b.email ? 1 : -1))
          : state.users.sort((a, b) => (a.email > b.email ? -1 : 1));
      state.users = [...orderFullname];
    },
    sortUserBaner: (state, action) => {
      const orderFullname =
        action.payload === "Asc"
          ? state.banerUser.sort((a, b) => (a.email > b.email ? 1 : -1))
          : state.banerUser.sort((a, b) => (a.email > b.email ? -1 : 1));
      state.banerUser = [...orderFullname];
    },
    baneoUser(state, action) {
      const banUser = state.filterUser.filter((e) => e.id !== action.payload);
      state.users = banUser;
    },
    restoreBanUser(state, action) {
      const objAction = state.filterUser.filter((e) => e);
      state.users = objAction;
    },
    getBanUser(state, action) {
      state.banerUser = action.payload;
      state.filterbanerUser = action.payload;
    },
    searchByUserBaner(state, action) {
      let filtBanUser = state.filterbanerUser.filter((usb) =>
        usb.username.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.banerUser = filtBanUser;
    },
    createUserAddress(state, action) {
      state.userAddress = action.payload;
    },
    deleteUserAddress(state, action) {
      state.userAddress = action.payload;
    },
    updateUser(state, action) {
      state.loggedUser = action.payload;
    },
    createUserAddress(state, action) {
      state.userAddress = action.payload;
    },
    deleteUserAddress(state, action) {
      state.userAddress = action.payload;
    },
    updateUser(state, action) {
      state.loggedUser = action.payload;
    },
    deleteRestoreUser(state, action) {
      const delRes = state.banerUser.filter((e) => e.id !== action.payload);
      state.banerUser = delRes;
    },
  },
});

export const {
  loggedUser,
  getFavorites,
  getCountries,
  allUser,
  deleteUser,
  searchByUser,
  sortUser,
  baneoUser,
  restoreBanUser,
  getBanerUser,
  updateUser,
  createUserAddress,
  deleteUserAddress,
  getBanUser,
  deleteRestoreUser,
  searchByUserBaner,
  sortUserBaner,
} = userSlice.actions;
export default userSlice.reducer;
