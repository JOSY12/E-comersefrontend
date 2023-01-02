import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./LoginPopup.module.css";

function LoginPopup()
{
  const { loginWithPopup, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();



  const login = (e) =>
  {
    e.preventDefault();
    if (!isAuthenticated) loginWithPopup();
  };

  if (isAuthenticated) navigate("/home");
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} />
      <div className={styles.popup}>
        <div className={styles.i}>
          <img src="/assets/images/HCoutureLogo.png" alt="Company Logo" />
        </div>
        <div className={styles.title}>
          To acces this page you need to sign in
        </div>
        <div className={styles.buttons}>
          <button className={styles.butt} onClick={login}>
            Sign in
          </button>
          <button className={styles.butt} onClick={() => navigate("/home")}>
            Close
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default LoginPopup;