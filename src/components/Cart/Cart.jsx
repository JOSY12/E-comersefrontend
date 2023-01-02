/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleancart } from "../../redux/actions";
import Cartitem from "./Cartitem";
import { comprartodo, clearlink } from "../../redux/actions";
import { useState } from "react";
import { Pais } from "./data";

function Cart() {
  const dispatch = useDispatch();
  const { Cartitems } = useSelector((state) => state.Cart);
  const { loggedUser } = useSelector((state) => state.user);
  const { total } = useSelector((state) => state.Cart);
  const { pagarcarrito } = useSelector((state) => state.Cart);
  const userId = loggedUser?.id;
  const [inputs, setinputs] = useState({
    Apellido: loggedUser.lastName ? loggedUser.lastName : "",

    Nombre: loggedUser.firstName ? loggedUser.firstName : "",
  });
  const [Errors, setErrors] = useState({});

  function limpiarcart() {
    dispatch(cleancart(userId));
    dispatch(clearlink());
  }

  function Pagartodo() {
    dispatch(comprartodo(Cartitems, userId, inputs));
  }

  function validate(input) {
    let Errors = {};

    ///nombre
    if (!input.Nombre) {
      Errors.Nombre = "se requiere nombre";
    }
    if (/\d|\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.Nombre)) {
      Errors.Nombre = "nombre es invalido";
    } else if (input.Nombre.length <= 2) {
      Errors.Nombre = "Nombre muy corto";
    } else if (input.Nombre.length >= 20) {
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
    } else if (input.Apellido.length >= 20) {
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
    if (/\\w|[~!@#$%{^&*()_:.=';[}|"`?>><]/gm.test(input.tipoCalle)) {
      Errors.tipoCalle = "tipoCalle es invalido";
    } else if (input.tipoCalle.length <= 10) {
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
    } else if (input.calle1.length < 1) {
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
    } else if (input.calle2.length < 1) {
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

  useEffect(() => {
    if (!pagarcarrito) {
      setErrors({ Nombre: "se requiere informacion" });
    }
  }, [Cartitems]);

  return (
    <>
      {Cartitems.length ? (
        <div className="overflow-x-auto w-full    mt-10 font-bold">
          <table className="table w-full   ">
            <thead>
              <tr className="text-center ">
                <th className="bg-stone-800   border-4 border-stone-800  border-l-stone-800        w-10  text-center text-white rounded-none ">
                  Producto
                </th>
                <th className="bg-stone-800 text-white border-4 border-stone-800   ">
                  Precio
                </th>
                <th className="bg-stone-800 text-white border-4 border-stone-800  "></th>
                <th className="bg-stone-800 text-white border-4 border-stone-800   ">
                  Cantidad
                </th>
                <th className="bg-stone-800 text-white border-4 border-stone-800  ">
                  Total
                </th>
                <th className="bg-stone-800 text-white border-4 border-stone-800  ">
                  Disponibles
                </th>
                <th className="bg-stone-800 text-white border-4 border-stone-800 border-r-stone-800  w-10    text-center  rounded-none">
                  Comprar
                </th>
              </tr>
            </thead>
            {Cartitems.length
              ? Cartitems.map((e, i) => {
                  return (
                    <Cartitem
                      quantity={e.quantity}
                      key={i}
                      name={e.name}
                      id={e.id}
                      image={e.photos[0].url}
                      stock={e.stock}
                      unitPrice={e.unitPrice}
                    />
                  );
                })
              : ""}
            <tfoot>
              <tr className="text-center ">
                <th className="bg-stone-800    border-4 border-stone-800  border-l-stone-800   w-10  text-center text-white rounded-none ">
                  Producto
                </th>
                <th className="bg-stone-800 text-white  border-4 border-stone-800">
                  Precio
                </th>
                <th className="bg-stone-800 text-white  border-4 border-stone-800"></th>
                <th className="bg-stone-800 text-white  border-4 border-stone-800">
                  Cantidad
                </th>
                <th className="bg-sky-600 text-white   border-4 border-sky-800">
                  ${total}
                </th>
                <th className="bg-stone-800 text-white  border-4 border-stone-800">
                  Disponibles
                </th>
                <th className="bg-stone-800  border-r-8 border-4 border-stone-800 border-l-stone-800    w-10    text-center text-white rounded-none">
                  Comprar
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="alert alert-info mt-60  rounded-none justify-center shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current  flex-shrink-0 w-20  h-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="text-white text-center content-center   font-bold">
              Tu carrito de compras esta vacio, ve y agrega algo para poder
              comprar.
            </span>
          </div>
        </div>
      )}

      {Cartitems.length && (
        <>
          <div className=" bg-sky-600  flex  text-white   ">
            <label
              htmlFor="Pagartodo"
              className="btn w-full rounded-none  text-center bg-green-500 border-none hover:bg-green-600 text-white  font-bold   "
            >
              Comprar todo
            </label>
          </div>
          <div className="bg-red-600 text-white flex    ">
            <button
              onClick={limpiarcart}
              className="btn w-full rounded-none  text-center hover:red-600  bg-red-500 border-none   text-white  font-bold      "
            >
              Limpiar Carrito
            </button>
          </div>
        </>
      )}

      <input type="checkbox" id="Pagartodo" className="modal-toggle " />
      <div className="modal  ">
        <div className="modal-box    ">
          <h3 className="font-bold text-lg">
            <div className="alert   shadow-lg">
              <div>
                <span className="py-4 text-black font-bold  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-10 w-"
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
                  Detalles de envio
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

                      <p className="text-gray-600 text-sm italic  text-red-500">
                        Asegurate de que todos los datos esten correctos.
                      </p>
                    </div>
                  </form>
                </span>
              </div>
            </div>
          </h3>

          {/* {pagarcarrito && loggedUser.phoneNumber && loggedUser.firstName  && loggedUser.city && loggedUser.lastname && loggedUser.street && loggedUser.zipcode  && loggedUser.country ?      */}
          {pagarcarrito && (
            <>
              <div className="modal-action ">
                <a
                  href={pagarcarrito}
                  htmlFor="Pagartodo"
                  className="btn bg-green-500 text-white font-bold  hover:bg-green-600 flex-1  "
                >
                  ir a Pagar!
                </a>
              </div>
              <a
                href={`/user/${userId}`}
                htmlFor="Pagartodo"
                className="btn bg-green-500 text-white font-bold  hover:bg-green-600 flex   "
              >
                Cambiar datos de envio
              </a>
            </>
          )}

          {Object.entries(Errors).length === 0 && !pagarcarrito ? (
            <a
              onClick={Pagartodo}
              htmlFor="Pagartodo"
              className="btn  e  bg-sky-500 text-white font-bold hover:bg-sky-600 content-center  flex   "
            >
              Generar pago.
            </a>
          ) : (
            ""
          )}

          <label
            htmlFor="Pagartodo"
            className="btn bg-red-500 text-white  font-bold  hover:bg-red-600 flex  "
          >
            Cerrar
          </label>
        </div>
      </div>
    </>
  );
}

export default Cart;
