import { configureStore } from "@reduxjs/toolkit";
import products from "./reducers/getProductsSlice";
import categories from "./reducers/getProductsSlice";
import brands from "./reducers/getProductsSlice";
import page from "./reducers/getProductsSlice";
import filteredProducts from "./reducers/getProductsSlice";
import user from "./reducers/userSlice";
import Cart from "./reducers/Cart";

export const store = configureStore({
  reducer: {
    products,
    categories,
    brands,
    page,
    filteredProducts,
    user,
    Cart,
  },
});
