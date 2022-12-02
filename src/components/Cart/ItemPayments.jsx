import React from "react";

import { Link } from "react-router-dom";

function ItemPayments() {
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
              Pago realizado correctamente disfute de su producto.
            </p>
            <Link to={"/"}>
              <button className="btn btn-accent">Ir a comprar</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPayments;
