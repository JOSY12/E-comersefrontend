/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { comprartodo, removeritem } from "../../redux/actions";
import { buyproduct } from "../../redux/actions";
import { alltopay } from "../../redux/actions";
import { useEffect } from "react";

function Cartitem({ name, url, stock, id, unitPrice, quantity }) {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.user);
  // const { paymenturl } = useSelector((state) => state.products);
  const [amoutstock, setbuy] = useState(1);
  const userid = loggedUser.data?.id;
  const { Cartitems } = useSelector((state) => state.Cart);
  // function getvalue(e) {
  //   const value = parseInt(e.target.value);
  //   setbuy(value);
  //   dispatch(buyproduct(value, id));
  //   dispatch(comprartodo(userid));
  // }
  var totals = 0;
  function borrar() {
    dispatch(alltopay(totals));
    dispatch(removeritem(id, userid));
  }

  useEffect(() => {
    totals = 0;
    for (let e of Cartitems) {
      totals = totals + e.quantity * e.unitPrice;
      dispatch(alltopay(totals));
    }
  }, [Cartitems]);

  return (
    <tbody>
      <tr>
        <td>
          <div className="  items-center   content-center align-middle space-x-3">
            <div className="avatar  content-center  align-middle  ">
              <div className="   w-20 h-20">
                <img src={url} alt="Avatar Tailwind CSS Component" />
              </div>
              <label>
                <p>{name}</p>
              </label>
            </div>
          </div>
        </td>

        <td>${unitPrice}</td>

        <th>
          <span className=" text-center  font-bold text-2xl "></span>
          <div className="relative p-5">
            {/* <input
              name="quantity"
              min={1}
              onChange={getvalue}
              value={amoutstock}
              max={stock}
              className="rounded border text-center title-font text-slate-700   appearance-none border-gray-400 py-2  text-base   "
              type={"number"}
            ></input> */}
          </div>
        </th>
        <th>
          <span className=" text-center   font-bold   ">
            ${unitPrice * amoutstock}
          </span>
        </th>
        <th>
          <span className=" text-center   font-bold   ">
            {stock} disponibles
          </span>
        </th>
        <th className="text-center">
          {/* <a
            href={paymenturl}
            target={"_blank"}
            className="btn  bg-lime-500  text-white  rounded-none hover:bg-lime-600 font-bold     btn-xs"
          >
            Comprar
          </a> */}
          <span className=""> </span>
          <button
            onClick={borrar}
            className="btn  font-bold bg-red-500  rounded-none text-white hover:bg-red-600    btn-xs"
          >
            Borrar
          </button>
        </th>
      </tr>
    </tbody>
  );
}

export default Cartitem;
