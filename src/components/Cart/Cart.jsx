/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleancart } from "../../redux/actions";
import Cartitem from "./Cartitem";
import { comprartodo, clearlink } from "../../redux/actions";
import { Outlet } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();

  const { Cartitems } = useSelector((state) => state.Cart);
  const { loggedUser } = useSelector((state) => state.user);
  const { total } = useSelector((state) => state.Cart);

  const { pagarcarrito } = useSelector((state) => state.Cart);
  const userid = loggedUser?.id;

  function limpiarcart() {
    dispatch(cleancart(userid));
    dispatch(clearlink());
  }
  useEffect(() => {
    dispatch(comprartodo(userid));
  }, [Cartitems, total]);

  return (
    <>
      {Cartitems.length ? (
        <div className="overflow-x-auto w-full    mt-10 font-bold">
          <table className="table w-full   ">
            <thead>
              <tr className="text-center ">
                <th className="bg-stone-800  w-10  text-center text-white rounded-none ">
                  Producto
                </th>
                <th className="bg-stone-800 text-white">Precio</th>
                <th className="bg-stone-800 text-white "> </th>
                <th className="bg-stone-800 text-white ">Cantidad </th>
                <th className="bg-stone-800 text-white ">Total</th>
                <th className="bg-stone-800 text-white ">Disponibles</th>
                <th className="bg-stone-800 text-white text-center rounded-none">
                  Comprar
                </th>
              </tr>
            </thead>
            {Cartitems.length
              ? Cartitems.map((e, i) => {
                  return (
                    <Cartitem
                      quantity={e.quantity}
                      key={i}
                      name={e.name}
                      id={e.id}
                      image={e.photos[0].url}
                      stock={e.stock}
                      unitPrice={e.unitPrice}
                    />
                  );
                })
              : ""}
            <tfoot>
              <tr className="text-center ">
                <th className="bg-stone-800 text-center text-white rounded-none ">
                  Producto
                </th>
                <th className="bg-stone-800 text-white ">Precio</th>
                <th className="bg-stone-800 text-white "> </th>
                <th className="bg-stone-800 text-white ">Cantidad </th>
                <th className="bg-stone-800 text-white ">Total</th>
                <th className="bg-stone-800 text-white  ">Disponibles</th>
                <th className=" bg-sky-600 text-white  rounded-none  text-center">
                  Total a pagar ${total}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="alert alert-info mt-60  rounded-none justify-center shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current  flex-shrink-0 w-20  h-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="text-white text-center content-center   font-bold">
              Tu carrito de compras esta vacio, ve y agrega algo.
            </span>
          </div>
        </div>
      )}

      {Cartitems.length && (
        <>
          <div className=" bg-sky-600  flex  text-white   ">
            <a
              href={pagarcarrito}
              className="btn w-full rounded-none  text-center bg-green-500 border-none hover:bg-green-600 text-white  font-bold   "
            >
              Comprar todo
            </a>
          </div>
          <div className="bg-red-600 text-white flex    ">
            <button
              onClick={limpiarcart}
              className="btn w-full rounded-none  text-center hover:red-600  bg-red-500 border-none   text-white  font-bold      "
            >
              Limpiar Carrito
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
