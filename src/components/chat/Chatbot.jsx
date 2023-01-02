import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatBot from "react-simple-chatbot";
import { getCurrentUser } from "../../redux/actions/index";

const Chatbot = () => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <label htmlFor="my-modal-3" className="btn">
          Chatbot
        </label>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <div className="">
              <ChatBot
                steps={[
                  {
                    id: "1",
                    message: `Hola ${loggedUser.username}, ¡encantado de conocerte bienvenido a H-couture!`,
                    trigger: "2",
                  },
                  {
                    id: "2",
                    message: "Escoge una de las siguientes opciones",
                    trigger: "3",
                  },
                  {
                    id: "3",
                    options: [
                      { value: 1, label: "Consulta especifica?", trigger: "4" },
                      {
                        value: 2,
                        label: "Consulta telefonica?",
                        trigger: "8",
                      },
                      { value: 3, label: "Salir?", trigger: "12" },
                    ],
                  },
                  {
                    id: "4",
                    message: "Cual es tu consulta, cuentanos claramente?",
                    trigger: "5",
                  },
                  {
                    id: "5",
                    user: true,
                    trigger: "6",
                  },
                  {
                    id: "6",
                    message:
                      "Tu pregunta quedo registrada con exito, por que medio nos comunicamos contigo?",
                    trigger: "7",
                  },
                  {
                    id: "7",
                    options: [
                      { value: 1, label: "Via Telefono", trigger: "8" },
                      {
                        value: 2,
                        label: "Correo electronico",
                        trigger: "13",
                      },
                    ],
                  },
                  {
                    id: "8",
                    options: [
                      {
                        value: 1,
                        label: `${
                          loggedUser.phoneNumber
                            ? `El numero que nos registra es ${loggedUser.phoneNumber}, aceptar?`
                            : `No hay numero registrado`
                        }`,
                        trigger: "9",
                      },
                      {
                        value: 2,
                        label: "Ingresa un numero telefonico",
                        trigger: "10",
                      },
                    ],
                  },
                  {
                    id: "9",
                    message: `${
                      loggedUser.phoneNumber
                        ? ` Tu numero ${loggedUser.phoneNumber} quedo confirmado exitosamente, gracias hasta pronto¡`
                        : `No se registro numero telefonico, lo sentimos no podremos comunicarnos`
                    } `,
                    end: true,
                  },
                  {
                    id: "10",
                    user: true,
                    trigger: "11",
                  },
                  {
                    id: "11",
                    message:
                      "Tu numero de telefono {previousValue} quedo registrado exitosamente, nos comunicaremos contigo gracias hasta pronto¡",
                    end: true,
                  },
                  {
                    id: "12",
                    message:
                      "Gracias por comunicarse con H-couture, esperamos haber podido solucionar tu inquietud, hasta pronto",
                    end: true,
                  },
                  {
                    id: "13",
                    message: `Nos pondremos en contacto contigo por el correo registrado ${loggedUser.email}, hasta pronto`,
                    end: true,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
