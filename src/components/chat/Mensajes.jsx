import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getMessagesMesas,
  getSalasChat,
  newMesaChat,
} from "../../redux/actions/index";

const Mensajes = () => {
  const dispatch = useDispatch();
  const { chatMesas } = useSelector((state) => state.chatMesas);
  const { salas } = useSelector((state) => state.salas);
  const [idMesa, setNameMesa] = useState("");
  console.log(idMesa);

  useEffect(() => {
    dispatch(getSalasChat());
  }, [dispatch]);

  const handleChanse = (e) => {
    setNameMesa(e.target.value);
    dispatch(getMessagesMesas(e.target.value));
  };

  const handleMesa = (e) => {
    dispatch(newMesaChat(idMesa, e.target.value));
  };

  return (
    <div>
      <h1>Mensajes Clientes</h1>
      <div className="flex flex-row justify-around content-evenly items-end bg-white mb-3">
        <div>
          <h3>ID</h3>
        </div>
        <div>
          <h3>NOMBRE</h3>
        </div>
        <div>
          <h3>FECHA</h3>
        </div>
      </div>
      <div>
        {salas.map((e) => (
          <div className="collapse">
            <input value={e.id} type="checkbox" onChange={handleChanse} />
            <div className="collapse-title text-xl font-medium">
              <div className="flex flex-row justify-around content-evenly items-start bg-white mb-3">
                <div className="mr-4">{e.id}</div>
                <div className="mr-4">{e.name}</div>
                <div>{e.fecha}</div>
              </div>
            </div>
            <div className="collapse-content">
              {chatMesas &&
                chatMesas.map((m) => (
                  <div className="flex flex-row">
                    <h3 className="w-full mr-2">
                      {m.salaId === 34 ? "Admin: " : "Cliente: "}
                    </h3>
                    <h3 className="w-full">{m.message}</h3>
                    <button
                      value={e.name}
                      onClick={handleMesa}
                      className="btn btn-xs"
                    >
                      Chat
                    </button>
                    {/* <Link to="/chat">
                    </Link> */}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mensajes;
