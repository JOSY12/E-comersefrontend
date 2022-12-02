/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import logo from "../../images/HCoutureLogo.png";

import UserCart from "../Cart/UserCart";
const Nav = () => {
  const [loged, setloged] = useState(false);
  const { isAuthenticated, logout, loginWithPopup, user } = useAuth0();

  return (
    <>
      <div className="navbar  bg-white" style={{ width: "100%" }}>
        <div style={{ width: "fit-content" }}>
          <Link to={"/"} style={{ width: "fit-content" }}>
            <img
              className="ml-4"
              style={{
                width: "14em",
                height: "fit-content",
                objectFit: "cover",
              }}
              src="/assets/images/HCoutureLogo.png"
              alt=""
            />
          </Link>
        </div>

        {!loged && (
          <div className=" flex-1">
            <Link to="/addproduct">
              <button className="btn btn-ghost normal-case   text-black  ml-8 text-base">
                Crear Producto
              </button>
            </Link>
          </div>
        )}

        {!isAuthenticated && (
          <div>
            <Link to={"/registerUser"}>
              <span className="btn btn-ghost normal-case   text-white  text-base m-2  bg-stone-400 hover:bg-stone-500">
                Regístrate
              </span>
            </Link>

            <span
              className="btn btn-ghost normal-case text-base   text-white  bg-stone-400 hover:bg-stone-500"
              onClick={loginWithPopup}
            >
              Iniciar Sesión
            </span>
          </div>
        )}
        {isAuthenticated && <UserCart />}
        {isAuthenticated && (
          <div className="flex-none mr-8 m-2 ">
            <div className="dropdown dropdown-end   ">
              <label
                tabIndex={0}
                className="  btn btn-ghost btn-circle  avatar"
              >
                {user ? (
                  <div className="w-10 rounded-full">
                    <img src={user.picture} alt="profilepicture" />
                  </div>
                ) : (
                  <div className="w-10 rounded-full">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUemgh2Unk-2K8MrXuSRmawDNdccYPxRcCCQ&usqp=CAU"
                      alt="profilepicture"
                    />
                  </div>
                )}

                <span className="justify-between text-black">
                  {user.name ? user.name : user.nickname}
                </span>
              </label>
              {/* active mediante log in o inactivemediante log out */}
              <ul className="menu    menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <Link to={"/Profile"}>
                  <li>
                    <span className="justify-between text-xl  ">Perfil</span>
                  </li>
                </Link>

                <Link to={"/favorites"}>
                  <li>
                    <span className="justify-between text-xl  ">
                      Mis favoritos
                    </span>
                  </li>
                </Link>

                <Link to={"/Items"}>
                  <li>
                    <span className="justify-between text-xl  ">
                      Mis compras
                    </span>
                  </li>
                </Link>
                <Link to={"/Settings"}>
                  <li>
                    <span className="justify-between text-xl  ">
                      Editar perfil
                    </span>
                  </li>
                </Link>
                <li>
                  <button className="text-xl" onClick={logout}>
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
