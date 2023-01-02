/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./views/Home";
import { getCurrentUser } from "./redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import CreateProduct from "./components/dashboard/CreateProduct";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProtectedRoutes from "./ProtectedRoutes";
import BlockedUserRoutes from "./BlockedUserRoutes";
import AdminRoutes from "./AdminRoutes";
import { AboutUsPage, Desarrollador } from "./views/aboutUs";
import { TermsAndConditions, PrivacyPolicy } from "./views/legal";
import UserProfile from "./views/UserProfile";
import Nav from "./components/Nav/Nav";
import Favorites from "./components/Favorites/Favorites";
import CompleteSignUp from "./views/CompleteSignUp";
import { useDispatch, useSelector } from "react-redux";
import CartPayments from "./components/Cart/CartPayments";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Nav/Footer";
import CartPaymentspending from "./components/Cart/CartPaymentspending";
import CartPaymentsfail from "./components/Cart/CartPaymentsfail";
import ItemPayments from "./components/Cart/ItemPayments";
import DashboardAdmin from "./views/DashboardAdmin";
import Historial from "./components/Cart/Historial";
import EditProduct from "./components/dashboard/EditProduct";
import LandingPage from "./components/LandingPage/LandingPage";

function App()
{
  const dispatch = useDispatch();
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [open, setOpen] = React.useState(false);

  const [footerHeight, setfooterHeigth] = React.useState(0);
  const { loggedUser } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const getWindowSize = () =>
  {
    return window.innerWidth;
  };
  const [width, setWidth] = React.useState(getWindowSize());
  //   useEffect(() => {

  //     if (isAuthenticated) {
  //         dispatch(getCurrentUser(getAccessTokenSilently, user));
  //     }
  // }, [isAuthenticated, getAccessTokenSilently, user]);

  useEffect(() =>
  {
    if (isAuthenticated)
    {
      dispatch(getCurrentUser(user));
    }

    function handleWindowreSize()
    {
      setWidth(getWindowSize());
      setfooterHeigth(
        document.getElementById("footerContainer")?.getClientRects()[0].height
      );
    }

    window.addEventListener("resize", handleWindowreSize);
    //     dispatch(getCart())
    //     dispatch(getProducts())
    //     dispatch(getCategories())
    //     dispatch(getColors())
    //     dispatch(getBrands())

    return () =>
    {
      window.removeEventListener("resize", handleWindowreSize);
    };
  }, [isAuthenticated, width]);

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <BrowserRouter>

        <Routes>
          <Route element={<BlockedUserRoutes />}>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/" element={<Nav />}>
              <Route path="/home" element={<Home />} />
              <Route path="/Products/:id" element={<ProductDetail />} />

              <Route
                path="/aboutUs"
                element={<AboutUsPage open={open} setOpen={setOpen} />}
              >
                <Route
                  path=":desarrollador"
                  element={<Desarrollador open={open} setOpen={setOpen} />}
                />
              </Route>

              <Route element={<ProtectedRoutes />}>
                <Route path="/completeSignUp" element={<CompleteSignUp />} />
                <Route path="/user/:id" element={<UserProfile />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/Historial" element={<Historial />} />
                <Route path="/CartPayments/:id" element={<CartPayments />} />
                <Route path="/ItemPayments/:id" element={<ItemPayments />} />
                <Route
                  path="/paymentsfail/:id"
                  element={<CartPaymentsfail />}
                />
                <Route
                  path="/paymentspending/:id"
                  element={<CartPaymentspending />}
                />
              </Route>

              <Route element={<AdminRoutes />}>
                <Route path="/CartPayments/:id" element={<CartPayments />} />
                <Route path="/ItemPayments/:id" element={<ItemPayments />} />
                <Route
                  path="/paymentsfail/:id"
                  element={<CartPaymentsfail />}
                />
                <Route
                  path="/paymentspending/:id"
                  element={<CartPaymentspending />}
                />
                <Route path="/dashboard" element={<DashboardAdmin />} />
                <Route path="/editproduct/:id" element={<EditProduct />} />
                <Route path="/addproduct" element={<CreateProduct />} />
              </Route>
            </Route>
            <Route
              path="/termsandconditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          </Route>
        </Routes>
        <div className="w-full h-fit relative bottom-0">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
