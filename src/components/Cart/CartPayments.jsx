/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleancart, clearlink } from "../../redux/actions";

function CartPayments() {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.user);
  const userid = loggedUser?.id;

  function clearcart() {
    if (userid) {
      dispatch(cleancart(userid));
      dispatch(clearlink());
    }
  }

  useEffect(() => {
    dispatch(cleancart(userid));
    dispatch(clearlink());
  }, []);

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
                src="https://www.ispmalaga.es/wp-content/uploads/2019/11/success.png"
              ></img>
            </h1>
            <p className="mb-5 text-black text-bold font-bold">
              Pago realizado correctamente disfute de sus productos.
            </p>
            <Link to={"/"}>
              <button onClick={clearcart} className="btn btn-accent">
                Ir a comprar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPayments;
