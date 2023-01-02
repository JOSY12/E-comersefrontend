/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getCurrentUser } from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";
//import logo from "../../images/HCoutureLogo.png";
import Chatbot from "../chat/Chatbot";

import UserCart from "../Cart/UserCart";

const Nav = () =>
{
  const { isAuthenticated, logout, loginWithPopup, user } = useAuth0();
  const { loggedUser } = useSelector((state) => state.user);

  // const navigate = useNavigate()
  // if(loggedUser.phoneNumber ===null || loggedUser.cityOfOrigin ===null){
  //   navigate("/completeSignUp")
  // }

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        className="navbar flex justify-between bg-white"
        style={{ width: "100%" }}
      >
        <div style={{ width: "fit-content" }}>
          <Link to={"/home"} style={{ width: "fit-content" }}>
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

        <div className="w-full justify-end mr-5 mt-2">
          {!isAuthenticated && (
            <span
              className="btn btn-ghost normal-case text-base text-white  bg-stone-400 hover:bg-stone-500"
              onClick={loginWithPopup}
            >
              Iniciar Sesión
            </span>
          )}
        </div>

        {isAuthenticated && (
          <div className="flex-1 mr-5">
            <div className="mr-6">
              {/* <button className="btn w-full">Chatbot</button> */}
              <Chatbot />
            </div>
            {loggedUser && loggedUser.isAdmin && (
              <div className="flex-1 mr-5">
                <Link to="/dashboard">
                  <button className="btn btn-ghost normal-case text-black text-base mr-8 w-full">
                    Panel de Admin
                  </button>
                </Link>
              </div>
            )}
            <div className="mr-10">
              <UserCart />
            </div>
            {loggedUser ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="  btn btn-ghost btn-circle  avatar"
                >
                  {loggedUser.photo ? (
                    <div className="w-10 rounded-full">
                      <img src={loggedUser.photo.url} alt="profilepicture" />
                    </div>
                  ) : (
                    <div className="w-10 rounded-full">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUemgh2Unk-2K8MrXuSRmawDNdccYPxRcCCQ&usqp=CAU"
                        alt="profilepicture"
                      />
                    </div>
                  )}
                  <span className="justify-between text-black ">
                    {loggedUser.username}
                  </span>
                </label>
                {/* active mediante log in o inactivemediante log out */}
                <ul className="menu    menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                  <Link to={`/user/${loggedUser.id}`}>
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

                  <Link to={"/Historial"}>
                    <li>
                      <span className="justify-between text-xl  ">
                        Mis compras
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
            ) : null}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Nav;
