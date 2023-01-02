/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import imag from "../../images/HCoutureLogo.png";
import stylesLanding from './LandingPage.module.css'

const LandingPage = () =>
{
    return (
        <div>
            <div className={stylesLanding.background}></div>
            <div className={stylesLanding.title}>

                <img src={imag} alt=""></img>
            </div>
            <Link to="/home/" className={stylesLanding.button}>
                Entrar
            </Link>
        </div>
    );
};

export default LandingPage;