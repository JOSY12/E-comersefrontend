/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleancart } from "../../redux/actions";
import Cartitem from "./Cartitem";
import { comprartodo, clearlink } from "../../redux/actions";
function Cart() {
  const dispatch = useDispatch();
  const { Cartitems } = useSelector((state) => state.Cart);
  const { loggedUser } = useSelector((state) => state.user);
  const { total } = useSelector((state) => state.Cart);
  const { pagarcarrito } = useSelector((state) => state.Cart);
  const userid = loggedUser.data?.id;

  function limpiarcart() {
    dispatch(cleancart(userid));
    dispatch(clearlink());
  }
  console.log(Cartitems);
  useEffect(() => {
    dispatch(comprartodo(userid));
  }, [Cartitems, total]);

  return (
    <div className="overflow-x-auto w-full   mt-5 font-bold">
      <table className="table w-full  ">
        <thead>
          <tr>
            <th className="bg-stone-800 text-white ">Producto</th>
            <th className="bg-stone-800 text-white">Precio</th>
            <th className="bg-stone-800 text-white "> </th>
            <th className="bg-stone-800 text-white ">Total</th>
            <th className="bg-stone-800 text-white ">Disponibles</th>
            <th className="bg-stone-800 text-white text-center">Comprar</th>
            <th className="bg-stone-800 text-white "></th>
            <th className="bg-stone-800 text-white "></th>
          </tr>
        </thead>

        {Cartitems &&
          Cartitems.map((e, i) => {
            return (
              <Cartitem
                quantity={e.quantity}
                key={i}
                name={e.name}
                id={e.id}
                url={e.photos[0].url}
                stock={e.stock}
                unitPrice={e.unitPrice}
              />
            );
          })}

        <tfoot>
          <tr>
            <th className="bg-stone-800 text-white ">Producto</th>
            <th className="bg-stone-800 text-white ">Precio</th>
            <th className="bg-stone-800 text-white "> </th>
            <th className="bg-stone-800 text-white ">Total</th>
            <th className="bg-stone-800 text-white ">Disponibles</th>
            <th className=" bg-stone-800  text-white  text-center">{total}</th>
            <th className="bg-stone-800 text-white ">
              {Cartitems.length ? (
                <a
                  href={pagarcarrito}
                  target={"_blank"}
                  className="btn w-full rounded-none  bg-sky-600 border-none hover:bg-sky-600 text-white  font-bold      "
                >
                  Comprar todo
                </a>
              ) : (
                "no hay nada en el carrito"
              )}
            </th>
            <th className=" bg-stone-800  text-white ">
              {Cartitems.length ? (
                <button
                  onClick={limpiarcart}
                  className="btn w-full rounded-none  bg-red-600 border-none hover:bg-red-600 text-white  font-bold      "
                >
                  Limpiar Carrito
                </button>
              ) : (
                "no hay nada en el carrito"
              )}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Cart;
