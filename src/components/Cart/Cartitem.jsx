/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeritem, addtocart } from "../../redux/actions";
import { buyproduct } from "../../redux/actions";
import { alltopay } from "../../redux/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Cartitem({ name, image, stock, id, unitPrice, quantity }) {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.user);
  const userid = loggedUser?.id;
  const { Cartitems } = useSelector((state) => state.Cart);

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
        <Link to={`/products/${id}`}>
          <td>
            <div className="  items-center   content-center align-middle space-x-3">
              <div className="avatar text-center  content-center  align-middle  ">
                <td className="text-center ">
                  <div className="   w-20 h-20">
                    <img src={image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </td>
              </div>
            </div>
          </td>
          <td>
            <div className="  items-center   content-center align-middle space-x-3">
              <td className="text-center ">
                <p className="text-center">{name}</p>
              </td>
            </div>
          </td>
        </Link>

        <td className="text-center ">${unitPrice}</td>
        <th>
          <span className=" text-center  font-bold text-2xl "></span>
          <div className="relative p-5">
            {/* <input
              name="quantity"
              min={1}
              onChange={addcantidad}
              value={cantidad}
              max={stock}
              className="rounded border text-center title-font text-slate-700   appearance-none border-gray-400 py-2  text-base   "
              type={"number"}
            ></input> */}
          </div>
        </th>
        <th className="text-center  ">
          <span className="    font-bold   "> {quantity}</span>
        </th>
        <th className="text-center ">
          <span className=" text-center   font-bold   ">
            ${unitPrice * quantity}
          </span>
        </th>
        <th className="text-center ">
          <span className="    font-bold   ">{stock} disponibles</span>
        </th>
        <th className="text-center">
          {/* <a
            href={paymenturl}
            target={"_blank"}
            className="btn  bg-lime-500  text-white  rounded-none hover:bg-lime-600 font-bold     btn-xs"
          >
            Comprar
          </a> */}

          <button>
            <svg
              onClick={borrar}
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-shopping-cart-x"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ff2825"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="6" cy="19" r="2" />
              <circle cx="17" cy="19" r="2" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l7.999 .571m5.43 4.43l-.429 2.999h-13" />
              <path d="M17 3l4 4" />
              <path d="M21 3l-4 4" />
            </svg>
          </button>
        </th>
      </tr>
    </tbody>
  );
}

export default Cartitem;
