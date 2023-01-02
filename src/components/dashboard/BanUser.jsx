import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { banerUserId } from "../../redux/actions";

const BanUser = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);

  const handleBan = () => {
    swal({
      title: "Esta seguro?",
      text: "Una vez baneado, ¡El usuario no podra acceder a su cuenta! ¡☠!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        dispatch(banerUserId(id));
        document.getElementById("baner").value = "";
        swal("¡🙈🙉🙊! ¡El Usuario ha sido baneado!", {
          icon: "success",
        });
      } else {
        swal("¡😅! ¡El Usuario seguira teniendo acceso a su cuenta!");
      }
    });
  };
  const handleChange = (e) => {
    setId(e.target.value);
  };

  return (
    <div className="flex flex-row justify-center mb-3">
      <h1 className="w-full">Banear Usuario</h1>
      <input
        id="baner"
        className="input input-bordered input-xs w-full max-w-xs mr-2"
        onChange={handleChange}
        type="input"
        placeholder="Id de Usuario"
      />
      <button onClick={handleBan} className="btn btn-xs">
        Banear
      </button>
    </div>
  );
};

export default BanUser;
