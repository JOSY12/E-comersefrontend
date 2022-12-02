import React from "react";

import { Link } from "react-router-dom";

function CartPaymentsfail() {
  return (
    <div>
      <div
        className="hero   min-h-screen"
        style={{
          backgroundImage: `url("https://fondosmil.com/fondo/17538.jpg")`,
        }}
      >
        <div className="   bg-opacity-60"></div>
        <div className="hero-content   text-center text-neutral-content">
          <div className="max-w-md  ">
            <h1 className="    font-bold">
              <img
                className=" mr-4  inline  "
                alt="malpago"
                src="https://www.globalsign.com/application/files/9516/0389/3750/What_Is_an_SSL_Common_Name_Mismatch_Error_-_Blog_Image.jpg"
              ></img>
            </h1>
            <p className="mb-5 text-black text-bold font-bold">
              Hubo un error en el pago intentelo denuevo o mas tarde.
            </p>
            <Link to={"/Cart"}>
              <button className="btn btn-info">Ver Carrito</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPaymentsfail;
