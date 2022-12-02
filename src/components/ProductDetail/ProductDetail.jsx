/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { comprartodo } from "../../redux/actions";
import { GetProductById, buyproduct, addtocart } from "../../redux/actions";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProductDetail = () => {
  const { isAuthenticated, loginWithPopup } = useAuth0();

  const { id } = useParams();
  const dispatch = useDispatch();
  const { Cartitems } = useSelector((state) => state.Cart);
  const { product } = useSelector((state) => state.products);
  const { paymenturl } = useSelector((state) => state.products);
  const { loggedUser } = useSelector((state) => state.user);

  const [amoutstock, setbuy] = useState(1);

  // const email = loggedUser.data?.email;
  const productid = product.id;
  const userid = loggedUser?.id;

  function agregarcarrito() {
    dispatch(addtocart(userid, productid, amoutstock, product));
    dispatch(comprartodo(Cartitems));
  }

  function getvalue(e) {
    const value = parseInt(e.target.value);
    setbuy(value);
    dispatch(buyproduct(value, id));
  }

  useEffect(() => {
    dispatch(buyproduct(amoutstock, id));
    dispatch(GetProductById(id));
  }, []);

  return (
    <section className="body-font overflow-hidden   bg-base-500   ">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap p-10 m-10">
          <div className="h-96 carousel carousel-vertical rounded-box">
            {product.photos
              ? product.photos.map((e, i) => {
                  return (
                    <div key={i} className="carousel-item h-full ">
                      <img alt="imagetext" src={e.url} />
                    </div>
                  );
                })
              : "no image found"}
          </div>

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm  text-slate-700 font-bold title-font  tracking-widest mb-2 ">
              {product.brand ? product.brand.name : "no product brand found"}
            </h2>
            <h2 className="text-sm  text-slate-700 title-font  tracking-widest mb-2">
              {product.categories
                ? product.categories.map((e, i) => {
                    return (
                      <h2
                        key={i}
                        className="badge  text-white bg-slate-400 border-0 ml-1 "
                      >
                        {e.name}
                      </h2>
                    );
                  })
                : "no product gender found"}
            </h2>
            <h1 className="text-slate-700  text-3xl title-font font-medium mb-1">
              {product ? product.name : "no product name found"}
            </h1>
            <div className="flex mb-4 mt-2">
              <span className="badge   text-white bg-slate-400 border-0  ">
                {product ? product.rating : "no product rate"}⭐
              </span>
              <span className="title-font text-base font-bold text-slate-700  ml-4 ">
                Stock: {product ? product.stock : "no stock found"}
              </span>
            </div>

            <p className="leading-relaxed text-slate-700 font-bold text-justify">
              {product ? product.description : "no Product description"}
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex ml-6 items-center">
                <span className="title-font text-slate-700 font-medium text-xl  ">
                  Un: ${product ? product.unitPrice : 0}
                </span>
                <div className="relative p-5">
                  <input
                    name="quantity"
                    min={1}
                    value={amoutstock}
                    onChange={getvalue}
                    max={product.stock}
                    className="rounded border text-center title-font text-slate-700   appearance-none border-gray-400 py-2  text-base   "
                    type={"number"}
                  ></input>
                </div>
                <span className="title-font text-slate-700 font-medium text-xl  ">
                  Total: ${amoutstock ? product.unitPrice * amoutstock : 0}
                </span>
              </div>
            </div>
            <div className=" flex  ">
              <div className="flex-1 "></div>
              <div className="flex-1 "></div>
              {isAuthenticated ? (
                <button
                  className="btn   ml-2 w-40 text-white text-base  bg-stone-400 hover:bg-stone-500 border-0   focus:outline-none rounded"
                  onClick={agregarcarrito}
                >
                  agregar al carrito
                </button>
              ) : (
                <button
                  onClick={loginWithPopup}
                  className="btn-wide   ml-2 w-40 text-white text-base  bg-stone-400 hover:bg-stone-500 border-0 py-2 px-2 focus:outline-none rounded"
                >
                  Agregar al carrito
                </button>
              )}

              {isAuthenticated ? (
                <div>
                  <a
                    href={paymenturl}
                    className="btn   ml-2 w-40 text-white text-base  bg-stone-400 hover:bg-green-500 border-0 py-2 px-2 focus:outline-none rounded"
                  >
                    Comprar ahora
                  </a>
                </div>
              ) : (
                <div>
                  <a
                    onClick={loginWithPopup}
                    className="btn   ml-2 w-40 text-white text-base  bg-stone-400 hover:bg-green-500 border-0 py-2 px-2 focus:outline-none rounded"
                  >
                    Comprar ahora
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
