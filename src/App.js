/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./views/Home";
import { getCurrentUser } from "./redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import CreateProduct from "./components/dashboard/CreateProduct";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import AdminRoutes from "./AdminRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Nav from "./components/Nav/Nav";
import Favorites from "./components/Favorites/Favorites";
import CompleteSignUp from "./views/CompleteSignUp";
import { useDispatch, useSelector } from "react-redux";
import CartPayments from "./components/Cart/CartPayments";
import Cart from "./components/Cart/Cart";
import CartPaymentspending from "./components/Cart/CartPaymentspending";
import CartPaymentsfail from "./components/Cart/CartPaymentsfail";
import ItemPayments from "./components/Cart/ItemPayments";

function App() {
  const dispatch = useDispatch();
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  console.log("USER IN APP.JS:", user);

  const { loggedUser } = useSelector((state) => state.user);
  //   useEffect(() => {

  //     if (isAuthenticated) {
  //         dispatch(getCurrentUser(getAccessTokenSilently, user));
  //     }
  // }, [isAuthenticated, getAccessTokenSilently, user]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentUser(user));
    }
    console.log("Usuario: " + loggedUser);
    //     dispatch(getCart())
    //     dispatch(getProducts())
    //     dispatch(getCategories())
    //     dispatch(getColors())
    //     dispatch(getBrands())
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="/" element={<Home />} />
          <Route path="/addproduct" element={<CreateProduct />} />
          <Route path="/Products/:id" element={<ProductDetail />} />
          <Route path="/completeSignUp" element={<CompleteSignUp />} />{" "}
          <Route path="/payments/:id" element={<CartPayments />} />
          <Route path="/ipayments/:id" element={<ItemPayments />} />
          <Route path="/paymentsfail" element={<CartPaymentsfail />} />
          <Route path="/paymentspending" element={<CartPaymentspending />} />
          <Route path="/completeSignUp" element={<CompleteSignUp />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
