import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    Cartitems: [],
    paymenturl: "",
    pagarcarrito: "",
    total: 0,
    info: {},
  },
  reducers: {
    getusercart(state, action) {
      state.Cartitems = action.payload;
    },

    agregaracart(state, action) {
      state.Cartitems = [...state.Cartitems, action.payload];
    },
    limpiarcart(state) {
      state.Cartitems = [];
    },
    quitaritem(state, action) {
      state.Cartitems = [
        ...state.Cartitems.filter((e) => e.id !== action.payload),
      ];
    },
    urlcarpayment(state, action) {
      state.paymenturl = action.payload;
    },
    totalapagar(state, action) {
      state.total = action.payload;
    },
    comprartodolink(state, action) {
      state.pagarcarrito = action.payload;
    },
    clearlinks(state) {
      state.pagarcarrito = "";
    },
    info(state, action) {
      state.info = action.payload;
    },
  },
});

export const {
  getusercart,
  agregaracart,
  limpiarcart,
  quitaritem,
  urlcarpayment,
  totalapagar,
  comprartodolink,
  clearlinks,
  info,
} = CartSlice.actions;
export default CartSlice.reducer;
