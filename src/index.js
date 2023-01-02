import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Auth0Provider } from "@auth0/auth0-react";
import axios from "axios";
import "@tremor/react/dist/esm/tremor.css";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_BASE_URL}` : `${process.env.REACT_APP_LOCAL_BASE_URL}`

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    audience={
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_AUDIENCE
        : process.env.REACT_APP_LOCAL_AUDIENCE
    }
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);
