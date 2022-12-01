import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const UserCart = () => {
  const { Cartitems } = useSelector((state) => state.Cart);

  return (
    <div className="dropdown dropdown-end  ">
      <label tabIndex={0} className="btn  btn-ghost btn-circle mr-10">
        <div className="indicator ">
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
        </div>
        <span className="badge badge-sm indicator-item bg-black   ">
          {Cartitems.length}
        </span>
      </label>
      <div className=" mt-3 card card-compact  dropdown-content w-50 bg-base-100 shadow">
        <div className="card-body    ">
          <span className="font-bold text-lg">
            <div className="h-96 carousel carousel-vertical   text-center align-center rounded-box">
              {Cartitems
                ? Cartitems.map((e, i) => {
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
                : "no hay productos"}
            </div>
          </span>

          <div className="card-body ">
            <Link className="content-center" to={"/Cart"}>
              <button className="btn btn-primary   btn-block">
                Ver Carrito
              </button>
            </Link>
            <Link className="content-center" to={"/favorites"}>
              <button className="btn btn-primary    btn-block">
                Ver Favoritos
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
