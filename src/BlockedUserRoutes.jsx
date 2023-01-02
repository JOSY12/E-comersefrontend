import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {useSelector } from "react-redux";
// import { getCurrentUser} from "./redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import BlockPopUp from "./components/BlockPopup/BlockPopup";


function BlockedUserRoutes() {
  const { isAuthenticated, isLoading } = useAuth0();
  const {loggedUser} = useSelector(state => state.user)

  //HAY QUE VERIFICAR QUE SU EMAIL ESTÉ VERIFICADO Y 
  // QUE TENGA TODOS LOS CAMPOS NECESARIOS LLENOS
  return (
    
    !isAuthenticated ?  (
    <Outlet />
    ) : isLoading ? 
    ( <div
      style={{
        marginTop: "10rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      >
      <ClipLoader color="#ef8354" size={70} margin={10} />
      </div>
    ) 
    :isAuthenticated && loggedUser.isBan ?
    (
    <BlockPopUp />
    ): <Outlet />
  )
}

export default BlockedUserRoutes;
