/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import React from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addcomprado } from "../../redux/actions";

function ItemPayments()
{
  const dispatch = useDispatch();

  const { loggedUser } = useSelector((state) => state.user);

  const userId = loggedUser?.id;
  const [searchParams, setSearchParams] = useSearchParams();

  const preference_id = searchParams.get("preference_id");
  const status = searchParams.get("status");
  const collection_id = searchParams.get("collection_id");
  const collection_status = searchParams.get("collection_status");
  const payment_type = searchParams.get("payment_type");
  const merchant_order_id = searchParams.get("merchant_order_id");

  const datapay = {
    preference_id: preference_id,
    status: status,
    collection_id: collection_id,
    collection_status: collection_status,
    payment_type: payment_type,
    merchant_order_id: merchant_order_id,
  };

  useEffect(() =>
  {
    if (userId !== undefined && datapay)
    {
      dispatch(addcomprado(userId, datapay));
    }
  }, [userId]);

  return (
    <div>
      {datapay && (
        <div
          className="hero   min-h-screen"
          style={{
            backgroundImage: `url("https://fondosmil.com/fondo/17538.jpg")`,
          }}
        >
          <div className="   bg-opacity-60"></div>
          <div className="hero-content   text-center text-neutral-content">
            <div className="max-w-md  ">
              <h1 className="    font-bold">
                <img
                  className=" mr-4  inline  "
                  alt="malpago"
                  src="https://www.ispmalaga.es/wp-content/uploads/2019/11/success.png"
                ></img>
              </h1>
              <p className="mb-5 text-black text-bold font-bold  break-normal">
                Pago realizado correctamente disfute de su producto. informacion
                de pago:
                <ul className="list-disc text-start break-normal">
                  <li>ID Compra: {datapay.collection_id}</li>
                  <li>Estado de compra: {datapay.collection_status}</li>
                  <li>Forma de pago: {datapay.payment_type}</li>
                  <li>Referencia de compra: {datapay.preference_id}</li>
                  <li>Id mercader: {datapay.merchant_order_id}</li>
                  <li>Estado General: {datapay.status}</li>
                </ul>
              </p>

              <Link to={"/home"}>
                <button className="btn btn-accent">Ir a comprar</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemPayments;
