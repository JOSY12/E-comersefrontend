/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../images/HCoutureLogo.png";

const Nav = () =>
{
  const [loged, setloged] = useState(false);
  const { isAuthenticated, logout, loginWithPopup, user } = useAuth0();

  return (
    <>
      <div className="navbar  bg-white    ">
        <div>
          <Link to={"/"}>
            <img className="w-72 ml-4" src={logo} alt=""></img>
          </Link>
        </div>
        {loged && <div className="flex-1 "></div>}
        {!loged && (
          <div className=" flex-1">
            <a
              href="/ref"
              className="btn btn-ghost normal-case   text-black  ml-8 text-base"
            >
              About us
            </a>
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
        {isAuthenticated && (
          <div className="flex-none mr-8 m-2">
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
                <span className="badge badge-sm indicator-item bg-white   ">
                  {"items"}
                </span>
              </label>
              <div className=" mt-3 card card-compact  dropdown-content w-50 bg-base-100 shadow">
                <div className="card-body ">
                  <span className="font-bold text-lg">{"caritems"}</span>
                  <span className="text-info">
                    {"$/valoresamostrar/dinero$"}
                  </span>
                  <div className="card-actions">
                    <button className="btn btn-primary  btn-block">
                      Ver Carrito
                    </button>
                    <Link to={"/favorites"}>
                      <button className="btn btn-primary  btn-block">
                        Ver Favoritos
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="dropdown dropdown-end   ">
              {/* foto perfil */}
              <label
                tabIndex={0}
                className="  btn btn-ghost btn-circle  avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUemgh2Unk-2K8MrXuSRmawDNdccYPxRcCCQ&usqp=CAU"
                    alt="profilepicture"
                  />
                </div>
                <span className="justify-between text-white">{user.name}</span>
              </label>
              {/* active mediante log in o inactivemediante log out */}
              <ul className="menu    menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <Link to={"/Profile"}>
                  <li>
                    <span className="justify-between text-xl  ">Profile</span>
                  </li>
                </Link>

                <Link to={"/Items"}>
                  <li>
                    <span className="justify-between text-xl  ">My items</span>
                  </li>
                </Link>
                <Link to={"/Settings"}>
                  <li>
                    <span className="justify-between text-xl  ">Setting</span>
                  </li>
                </Link>
                <li>
                  <button className="text-xl" onClick={logout}>
                    Logout
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
