import React from "react";
import ReactDOM from "react-dom";
import styles from "./BlockPopup.module.css";

export default function BlockPopUp() {

    return ReactDOM.createPortal(
    <>
        <div className={styles.overlay} />
        <div className={styles.popup}>
            <div className={styles.i}>
                <img src="/assets/images/HCoutureLogo.png" alt="Company Logo" />
            </div>
            <div className={styles.title}>
                User Blocked 😓
            </div>
        </div>
    </>,
    document.getElementById("portal")
    )
}