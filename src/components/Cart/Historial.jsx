/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Itemscomprados from "./itemsComprados";
import {
  alldatapagos,
  getuserpaymets,
  datadecompra,
  getdataadmin,
} from "../../redux/actions";
function Historial() {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.user);
  const userId = loggedUser?.id;
  const { Comprados } = useSelector((state) => state.Cart);
  const { info } = useSelector((state) => state.Cart);

  for (let e of info) {
    dispatch(alldatapagos(e.collectionid));
  }

  useEffect(() => {

    dispatch(getdataadmin())
    if (userId) {
      dispatch(getuserpaymets(userId));
    }
  }, [userId]);

  return (
    <>
      <div className="overflow-x-auto w-full    mt-10 font-bold">
        <table className="table w-full   ">
          <thead>
            <tr className="text-center ">
              <th className="bg-stone-800    border-4 border-stone-800  border-l-stone-800 w-10  text-center text-white rounded-none">
                id compra
              </th>
              <th className="bg-stone-800    border-4 border-stone-800   w-10  text-center text-white rounded-none ">
                Producto
              </th>
              <th className="bg-stone-800    border-4 border-stone-800  text-white  "></th>
              <th className="bg-stone-800    border-4 border-stone-800   text-white ">
                Cantidad
              </th>
            </tr>
          </thead>
          {Comprados.length
            ? Comprados.map((e, i) => {
                return (
                  <Itemscomprados
                    cantidad={e.quantity}
                    indice={i}
                    compraid={e.idcompra}
                    key={i}
                    name={e.title}
                    id={e.id}
                    image={e.picture_url}
                  />
                );
              })
            : "no hay items aun"}
          <tfoot>
            <tr className="text-center ">
              <th className="bg-stone-800    border-4 border-stone-800  border-l-stone-800 w-10  text-center text-white rounded-none">
                id compra
              </th>
              <th className="bg-stone-800 text-center  border-4 border-stone-800    text-white rounded-none ">
                Producto
              </th>
              <th className="bg-stone-800 text-white   border-4 border-stone-800    "></th>
              <th className="bg-stone-800 text-white    border-4 border-stone-800   ">
                Cantidad
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default Historial;
