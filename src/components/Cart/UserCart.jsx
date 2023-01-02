import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserCart = () =>
{
  const { Cartitems } = useSelector((state) => state.Cart);

  return (
    <div className="dropdown dropdown-end  ">
      <label tabIndex={0} className="btn  btn-ghost btn-circle w-30">
        <div className="indicator ">
          {Cartitems.length ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
              <circle cx="6" cy="19" r="2" />

              <path d="M17 17a2 2 0 1 0 2 2" />
              <path d="M17 17h-11v-11" />
              <path d="M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7" />
              <path d="M3 3l18 18" />
            </svg>
          )}
        </div>
        <span className="badge badge-sm indicator-item bg-black   ">
          {Cartitems.length}
        </span>
      </label>
      <div className=" mt-3 card card-compact  dropdown-content w-50 bg-base-100 shadow">
        <div className="card-body    ">
          <span className="font-bold text-lg">
            <div className="h-96 carousel carousel-vertical   text-center align-center rounded-box">
              {Cartitems.length ? (
                Cartitems.map((e, i) =>
                {
                  return (
                    <ul key={i} className="    align-center">
                      <li className="   align-center">
                        <div className="carousel-item   h-full">
                          <div className="max-w-xs      text-sm align-center breadcrumbs">
                            <figure>
                              <img
                                alt="Item carrito"
                                src={e.photos[0].url}
                                className="h-20 w-30  "
                              ></img>
                            </figure>
                            {e.name}
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                })
              ) : (
                <div className="alert alert-info text-center text-white  justify-center  content-center shadow-lg">
                  <div className="text-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-current flex-shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>Vacio</span>
                  </div>
                </div>
              )}
            </div>
          </span>

          <div className="card-body ">
            <Link className="content-center" to={"/Cart"}>
              <button className="btn ml-2 w-30  text-white text-base  bg-stone-400 hover:bg-stone-500 border-0 focus:outline-none rounded">
                Ver Carrito
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
