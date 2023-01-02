/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeritem, updatecart } from "../../redux/actions";
import { buyproduct } from "../../redux/actions";
import { alltopay } from "../../redux/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Pais } from "./data";
function Cartitem({ name, image, stock, id, unitPrice, quantity }) {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.user);
  const userId = loggedUser?.id;
  const { Cartitems } = useSelector((state) => state.Cart);
  const [cantidad, setcantidad] = useState(quantity);
  const { paymenturl } = useSelector((state) => state.products);
  const [inputs, setinputs] = useState({});
  const [Errors, setErrors] = useState({});

  function Generarlink() {
    dispatch(buyproduct(cantidad, id, userId, inputs));
  }

  function borrar() {
    dispatch(removeritem(id, userId));
  }

  function add(e) {
    setcantidad(e.target.value);
    dispatch(updatecart(userId, id, e.target.value));
  }

  function validate(input) {
    let Errors = {};

    ///nombre
    if (!input.Nombre) {
      Errors.Nombre = "se requiere nombre";
    }
    if (/\d|\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.Nombre)) {
      Errors.Nombre = "nombre es invalido";
    } else if (input.Nombre.length <= 5) {
      Errors.Nombre = "Nombre muy corto";
    } else if (input.Nombre.length >= 29) {
      Errors.Nombre = "Nombre muy largo";
    }

    ///apellido
    if (!input.Apellido) {
      Errors.Apellido = "se requiere Apellido";
    }

    if (/\d|\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.Apellido)) {
      Errors.Apellido = "Apellido es invalido";
    } else if (input.Apellido.length <= 3) {
      Errors.Apellido = "Apellido es muy corto";
    } else if (input.Apellido.length >= 29) {
      Errors.Apellido = "Apellido es muy largo";
    }

    ///telefono
    if (!input.Telefono) {
      Errors.Telefono = "se requiere Telefono";
    }
    if (/\D|\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.Telefono)) {
      Errors.Telefono = "Telefono es invalido";
    } else if (input.Telefono.length <= 9) {
      Errors.Telefono = "Telefono es muy corto";
    } else if (input.Telefono.length >= 15) {
      Errors.Telefono = "Telefono es muy largo";
    }

    ///prefijo
    if (!input.Prefijo) {
      Errors.Prefijo = "se requiere Prefijo";
    }
    if (/\D|\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.Prefijo)) {
      Errors.Prefijo = "Prefijo es invalido";
    } else if (input.Prefijo.length <= 1) {
      Errors.Prefijo = "Prefijo es muy corto";
    } else if (input.Prefijo.length >= 4) {
      Errors.Prefijo = "Prefijo es muy largo";
    }

    //pais
    if (!input.Pais) {
      Errors.Pais = "se requiere Pais";
    }

    //Ciudad
    if (!input.Ciudad) {
      Errors.Ciudad = "se requiere Ciudad";
    }

    ///barrio
    if (!input.Barrio) {
      Errors.Barrio = "se requiere Barrio";
    }
    if (/\d|\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.Barrio)) {
      Errors.Barrio = "Barrio es invalido";
    } else if (input.Barrio.length <= 4) {
      Errors.Barrio = "Barrio es muy corto";
    } else if (input.Barrio.length >= 15) {
      Errors.Barrio = "Barrio es muy largo";
    }

    ///tipo de calle
    if (!input.tipoCalle) {
      Errors.tipoCalle = "se requiere tipoCalle";
    }
    if (/\d\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.tipoCalle)) {
      Errors.tipoCalle = "tipoCalle es invalido";
    } else if (input.tipoCalle.length <= 4) {
      Errors.tipoCalle = "tipoCalle es muy corto";
    } else if (input.tipoCalle.length >= 15) {
      Errors.tipoCalle = "tipoCalle es muy largo";
    }

    ///numero de calle

    if (!input.numerocalle) {
      Errors.numerocalle = "se requiere numerocalle";
    }
    if (/\D|\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.numerocalle)) {
      Errors.numerocalle = "numerocalle es invalido";
    } else if (input.numerocalle.length < 1) {
      Errors.numerocalle = "numerocalle es muy corto";
    } else if (input.numerocalle.length >= 4) {
      Errors.numerocalle = "numerocalle es muy largo";
    }

    ///Calle numero 1

    if (!input.calle1) {
      Errors.calle1 = "se requiere calle";
    }
    if (/\D|\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.calle1)) {
      Errors.calle1 = "calle es invalido";
    } else if (input.calle1.length <= 1) {
      Errors.calle1 = "calle es muy corto";
    } else if (input.calle1.length >= 4) {
      Errors.calle1 = "calle es muy largo";
    }

    ///Calle numero 2
    if (!input.calle2) {
      Errors.calle2 = "se requiere calle";
    }
    if (/\D|\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.calle2)) {
      Errors.calle2 = "calle es invalido";
    } else if (input.calle2.length <= 1) {
      Errors.calle2 = "calle es muy corto";
    } else if (input.calle2.length >= 4) {
      Errors.calle2 = "calle es muy largo";
    }

    ///Estado /departamento
    if (!input.Estado) {
      Errors.Estado = "se requiere Estado";
    }
    if (/\d|\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.Estado)) {
      Errors.Estado = "Estado es invalido";
    } else if (input.Estado.length <= 6) {
      Errors.Estado = "Estado es muy corto";
    } else if (input.Estado.length >= 15) {
      Errors.Estado = "Estado es muy largo";
    }

    ///codigo zip
    if (!input.zipcode) {
      Errors.zipcode = "se requiere zip";
    }
    if (/\D|\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.zipcode)) {
      Errors.zipcode = "zip es invalido";
    } else if (input.zipcode.length <= 1) {
      Errors.zip = "zip es muy corto";
    } else if (input.zipcode.length >= 10) {
      Errors.zipcode = "zip es muy largo";
    }

    return Errors;
  }

  function guardardireccion(e) {
    const property = e.target.name;
    const value = e.target.value;
    setinputs({ ...inputs, [property]: value });
    setErrors(validate({ ...inputs, [property]: value }));
  }
  var totals = 0;

  useEffect(() => {
    setcantidad(quantity);
    for (let e of Cartitems) {
      totals = totals + e.quantity * e.unitPrice;
      dispatch(alltopay(totals));
    }

    if (!paymenturl) {
      console.log(inputs.Nombre);
      setErrors({ Nombre: "se requiere informacion" });
    }
  }, [Cartitems]);

  return (
    <tbody>
      <tr className="border-4 border-black ">
        <Link to={`/products/${id}`}>
          <td>
            <div className="  items-center   content-center align-middle space-x-3">
              <div className="avatar text-center  content-center  align-middle  ">
                <td className="text-center ">
                  <div className="   w-20 h-20">
                    <img
                      src={image}
                      style={{
                        objectFit: "scale-down",
                        objectPosition: "center",
                        width: "10em",
                      }}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </td>
              </div>
            </div>
          </td>
          <td>
            <div className="  items-center   content-center align-middle space-x-3">
              <td className="text-center ">
                <p className="text-center">{name}</p>
              </td>
            </div>
          </td>
        </Link>

        <td className="text-center   ">${unitPrice}</td>
        <th className="text-center   ">
          <span className=" text-center   font-bold    text-2xl "></span>
        </th>
        <th className="text-center  ">
          <input
            name="quantity"
            min={1}
            onChange={add}
            value={cantidad}
            max={stock}
            className="rounded border text-center title-font text-slate-700   appearance-none border-gray-400 py-2  text-base   "
            type={"number"}
          ></input>
        </th>
        <th className="text-center ">
          <span className=" text-center   font-bold   ">
            ${unitPrice * cantidad}
          </span>
        </th>
        <th className="text-center ">
          <span className="    font-bold   ">{stock} disponibles</span>
        </th>
        <th className="text-center">
          <label htmlFor="Pagaritem" className="btn  btn-ghost  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </label>
          <span className=""></span>
          <label className="btn  btn-ghost  ">
            <svg
              onClick={borrar}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-red-600 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </label>
        </th>

        <input type="checkbox" id="Pagaritem" className="modal-toggle " />
        <div className="modal ">
          <div className="modal-box   ">
            <h3 className="font-bold  text-lg">
              <div className="alert   shadow-lg">
                <div>
                  <p className=" text-black py-4   font-bold  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Quieres comprar este producto?
                    <form className="w-full max-w-lg">
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                          >
                            Nombre
                          </label>
                          <input
                            name="Nombre"
                            onChange={guardardireccion}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder="juanito"
                          ></input>
                          {Errors.Nombre && (
                            <p className="text-gray-600 text-xs italic  text-red-500">
                              {Errors.Nombre}
                            </p>
                          )}
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name"
                          >
                            Apellido
                          </label>
                          <input
                            name="Apellido"
                            onChange={guardardireccion}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Peralta"
                          ></input>
                          {Errors.Apellido && (
                            <p className="text-gray-600 text-xs italic  text-red-500">
                              {Errors.Apellido}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                          >
                            Telefono:
                          </label>
                          <input
                            name="Telefono"
                            onChange={guardardireccion}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="number"
                            placeholder="33032021"
                          ></input>
                          {Errors.Telefono && (
                            <p className="text-gray-600 text-xs italic  text-red-500">
                              {Errors.Telefono}
                            </p>
                          )}
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name"
                          >
                            Prefijo
                          </label>
                          <input
                            name="Prefijo"
                            onChange={guardardireccion}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="number"
                            placeholder="+57"
                          ></input>
                          {Errors.Prefijo && (
                            <p className="text-gray-600 text-xs italic  text-red-500">
                              {Errors.Prefijo}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Pais
                          </label>

                          <select
                            onChange={guardardireccion}
                            name="Pais"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            <option disabled selected>
                              {" "}
                              --Pais--
                            </option>
                            {Pais.map((e) => {
                              return <option> {e.Pais}</option>;
                            })}
                          </select>
                          {Errors.Pais && (
                            <p className="text-gray-600 text-xs italic  text-red-500">
                              {Errors.Pais}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-city"
                          >
                            Ciudad
                          </label>
                          <select
                            onChange={guardardireccion}
                            name="Ciudad"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            <option disabled selected>
                              {" "}
                              -- Ciudad--
                            </option>

                            {Pais.map((e) =>
                              e.Pais === inputs.Pais
                                ? e.Ciudades.map((a) => {
                                    return <option>{a}</option>;
                                  })
                                : ""
                            )}
                          </select>
                          {Errors.Ciudad && (
                            <p className="text-gray-600 text-xs italic  text-red-500">
                              {Errors.Ciudad}
                            </p>
                          )}
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-city"
                          >
                            Barrio
                          </label>
                          <input
                            name="Barrio"
                            onChange={guardardireccion}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-city"
                            type="text"
                            placeholder="San bernardo"
                          ></input>
                          {Errors.Barrio && (
                            <p className="text-gray-600 text-xs italic  text-red-500">
                              {Errors.Barrio}
                            </p>
                          )}
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-city"
                          >
                            Calle/Carrera
                          </label>
                          <input
                            name="tipoCalle"
                            onChange={guardardireccion}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-city"
                            type="text"
                            placeholder="Avenida,carrera,calle"
                          ></input>
                          {Errors.tipoCalle && (
                            <p className="text-gray-600 text-xs italic  text-red-500">
                              {Errors.tipoCalle}
                            </p>
                          )}
                        </div>

                        <div className="w-full md:w-1/3 px-3  mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-city"
                          >
                            #
                          </label>
                          <input
                            name="numerocalle"
                            onChange={guardardireccion}
                            className="   appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-city"
                            type="number"
                            placeholder="21"
                          ></input>
                          {Errors.numerocalle && (
                            <p className="text-gray-600 text-xs italic  text-red-500">
                              {Errors.numerocalle}
                            </p>
                          )}
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-5">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-city"
                          >
                            Dirreccion
                          </label>

                          <input
                            name="calle1"
                            onChange={guardardireccion}
                            className="   appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-city"
                            type="number"
                            placeholder="21-"
                          ></input>
                          {Errors.calle1 && (
                            <p className="text-gray-600 text-xs italic  text-red-500">
                              {Errors.calle1}
                            </p>
                          )}

                          <input
                            name="calle2"
                            onChange={guardardireccion}
                            className="mt-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-city"
                            type="number"
                            placeholder="15"
                          ></input>
                          {Errors.calle2 && (
                            <p className="text-gray-600 text-xs italic  text-red-500">
                              {Errors.calle2}
                            </p>
                          )}
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-5">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-state"
                          >
                            Estado/Departamento.
                          </label>
                          <div className="relative">
                            <input
                              name="Estado"
                              onChange={guardardireccion}
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-city"
                              type="text"
                              placeholder="Cordoba"
                            ></input>

                            {Errors.Estado && (
                              <p className="text-gray-600 text-xs italic  text-red-500">
                                {Errors.Estado}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-5 ">
                          <label
                            className="block ml-4 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-zip"
                          >
                            codigo Zip
                          </label>
                          <input
                            name="zipcode"
                            onChange={guardardireccion}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-zip"
                            type="number"
                            placeholder="54321"
                          ></input>
                          {Errors.zipcode && (
                            <p className="text-gray-600 text-xs italic  text-red-500">
                              {Errors.zipcode}
                            </p>
                          )}
                        </div>

                        <p className=" text-gray-600 text-sm italic  text-red-500">
                          Asegurate de que todos los datos esten correctos.
                        </p>
                      </div>
                    </form>
                  </p>
                </div>
              </div>
            </h3>

            {paymenturl && (
              <div className="modal-action">
                <a
                  href={paymenturl}
                  htmlFor="Pagaritem"
                  className="btn bg-green-500 text-white hover:bg-green-600 flex-1 "
                >
                  ir a Pagar!
                </a>
                <a
                  href={`/user/${userId}`}
                  htmlFor="Pagartodo"
                  className="btn bg-green-500 text-white font-bold  hover:bg-green-600 flex   "
                >
                  Cambiar datos de envio
                </a>
              </div>
            )}

            {Object.entries(Errors).length === 0 && !paymenturl ? (
              <a
                onClick={Generarlink}
                htmlFor="Pagaritem"
                className="btn bg-green-500 text-white hover:bg-green-600 flex "
              >
                Generar pago.
              </a>
            ) : (
              " "
            )}

            <label
              htmlFor="Pagaritem"
              className="btn bg-red-500 text-white hover:bg-red-600 flex  "
            >
              Cerrar
            </label>
          </div>
        </div>
      </tr>
    </tbody>
  );
}

export default Cartitem;
