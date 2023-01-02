import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { banerUserId, restoreBanerUserId } from "../../redux/actions";

const BanUser = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);

  const handleRestore = () => {
    swal({
      title: "Esta seguro?",
      text: "Una vez restaurado, ¡El usuario podra acceder a su cuenta! ¡☠!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        dispatch(restoreBanerUserId(id));
        document.getElementById("restore").value = "";
        swal("¡🙈🙉🙊! ¡El Usuario ha sido restaurado con exito!", {
          icon: "success",
        });
      } else {
        swal("¡😅! ¡El Usuario seguira bloqueado!");
      }
    });
  };
  const handleChange = (e) => {
    setId(e.target.value);
  };

  return (
    <div className="flex flex-row justify-center mb-3">
      <h1 className="w-full">Restaurar Usuario</h1>
      <input
        id="restore"
        className="input input-bordered input-xs w-full max-w-xs mr-2"
        onChange={handleChange}
        type="input"
        placeholder="Id de Usuario"
      />
      <button onClick={handleRestore} className="btn btn-xs ml-2">
        Restaurar
      </button>
    </div>
  );
};

export default BanUser;
