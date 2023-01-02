import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { restoreBanerProductId } from "../../redux/actions";

const BanProduct = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);

  const handleRestore = () => {
    swal({
      title: "Esta seguro?",
      text: "Una vez restaurado, ¡El producto sera visible para todos los clientes! ¡☠!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        dispatch(restoreBanerProductId(id));
        document.getElementById("restore").value = "";
        swal("¡🙈🙉🙊! ¡El Producto ha sido restaurado con exito!", {
          icon: "success",
        });
      } else {
        swal("¡😅! ¡El Producto seguira bloqueado!");
      }
    });
  };
  const handleChange = (e) => {
    setId(e.target.value);
  };

  return (
    <div className="flex flex-row justify-center mb-3">
      <h1 className="w-full">Restaurar Producto</h1>
      <input
        id="restore"
        className="mx-2 input input-bordered input-xs w-full max-w-xs"
        onChange={handleChange}
        type="input"
        placeholder="Id del Producto"
      />
      <button onClick={handleRestore} className="btn btn-xs ml-2">
        Restaurar
      </button>
    </div>
  );
};

export default BanProduct;
