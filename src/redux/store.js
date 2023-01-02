import { configureStore } from "@reduxjs/toolkit";
import products from "./reducers/getProductsSlice";
import product from "./reducers/getProductsSlice";
import categories from "./reducers/getProductsSlice";
import brands from "./reducers/getProductsSlice";
import page from "./reducers/getProductsSlice";
import filteredProducts from "./reducers/getProductsSlice";
import user from "./reducers/userSlice";
import Cart from "./reducers/Cart";
import users from "./reducers/userSlice";
import filteredUsers from "./reducers/userSlice";
import banerUser from "./reducers/userSlice";
import banerProd from "./reducers/getProductsSlice";
import loggedUser from "./reducers/userSlice";
import Comprasgenerales from "./reducers/Cart";

export const store = configureStore({
  reducer: {
    products,
    categories,
    brands,
    page,
    filteredProducts,
    user,
    Cart,
    users,
    filteredUsers,
    product,
    banerUser,
    banerProd,
    loggedUser,
    Comprasgenerales,
  },
});
