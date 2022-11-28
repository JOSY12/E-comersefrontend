import { configureStore } from "@reduxjs/toolkit";
import products from "./reducers/getProductsSlice";
import categories from "./reducers/getProductsSlice";
import brands from "./reducers/getProductsSlice";
import page from "./reducers/getProductsSlice";

export const store = configureStore({
  reducer: {
    products,
    categories,
    brands,
    page,
  },
});
