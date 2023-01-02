/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Itemscomprados({ name, image, compraid, indice, id, cantidad }) {
  const { Comprados } = useSelector((state) => state.Cart);

  useEffect(() => {}, [Comprados]);

  return (
    <tbody>
      <tr className="border-2 border-black ">
        <div
          tabIndex={0}
          className="collapse collapse-arrow mt-10   w-40 border border-base-300 bg-base-100 rounded-box"
        >
          <div className="collapse-title  text-xl   font-medium">
            ID {indice + 1}
          </div>
          <div className="collapse-content flex  justify-center ">
            <p className="flex  justify-center text-purple-600 ">{compraid}</p>
          </div>
        </div>

        <td>
          <Link
            className="  items-center   content-center align-middle space-x-3"
            to={`/products/${id}`}
          >
            <div className="  items-center   content-center align-middle space-x-3">
              <div className="avatar text-center  content-center  align-middle  ">
                <td className="text-center ">
                  <div className="   w-20 h-20">
                    <img
                      src={image}
                      style={{
                        objectFit: "scale-down",
                        objectPosition: "center",
                        width: "10em",
                      }}
                      alt="item comprado"
                    />
                  </div>
                </td>
              </div>
            </div>
          </Link>
        </td>
        <Link
          className="  items-center   content-center align-middle space-x-3"
          to={`/products/${id}`}
        >
          <td>
            <div className="  items-center   content-center align-middle space-x-3">
              <td className="text-center ">
                <p className="text-center">{name}</p>
              </td>
            </div>
          </td>
        </Link>
        <td>
          <div className="  items-center flex justify-center  content-center align-middle space-x-3">
            <td className="text-center ">
              <p className="text-center">{cantidad}</p>
            </td>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default Itemscomprados;
