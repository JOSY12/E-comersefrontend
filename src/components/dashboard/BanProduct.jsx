import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { banerProductId } from "../../redux/actions";

const BanProduct = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);

  const handleBan = () => {
    swal({
      title: "Esta seguro?",
      text: "Una vez baneado, ¡El producto no estara disponible para los clientes! ¡☠!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        dispatch(banerProductId(id));
        document.getElementById("baner").value = "";
        swal("¡🙈🙉🙊! ¡El Producto ha sido baneado!", {
          icon: "success",
        });
      } else {
        swal("¡😅! ¡El Producto seguira visible para los clientes!");
      }
    });
  };

  const handleChange = (e) => {
    setId(e.target.value);
  };

  return (
    <div className="flex flex-row justify-center mb-3">
      <h1>Banear Producto</h1>
      <input
        id="baner"
        className="mx-2 input input-bordered input-xs w-full max-w-xs"
        onChange={handleChange}
        type="input"
        placeholder="Id del Producto"
      />
      <button onClick={handleBan} className="btn btn-xs">
        Banear
      </button>
    </div>
  );
};

export default BanProduct;
