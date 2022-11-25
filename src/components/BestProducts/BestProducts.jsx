/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import product from "../../hooks/dbLocal";
import { useEffect } from "react";
export default function BestProducts() {
  //  const { products } = useSelector((state) => state.products);

  const bestproduts = product.filter((e) => e.rating.rate >= 4);

  useEffect(() => {}, []);

  return (
    <div>
      <div className="max-w-full  breadcrumbs    ">
        <ul>
          {bestproduts
            ? bestproduts.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="artboard artboard-horizontal pr-10    "
                  >
                    <div className="card card-side bg-base-300    ">
                      <figure>
                        <img
                          src={e.image}
                          alt="product"
                          className=" h-40 w-96    "
                        />
                      </figure>
                      <div className="card-body  p-4   ">
                        <h2 className="  text-white card-title  whitespace-pre-line ">
                          {e.name}
                        </h2>

                        <div className="card-actions  justify-end">
                          <span className="badge  text-white bg-blue-500  ">
                            {e.rating.rate}⭐
                          </span>

                          <button className="badge  fw-bold  w-20  bg-blue-500 text-white hover:bg-blue-600  ">
                            buy
                          </button>
                          <button className="badge fw-bold w-20 text-white bg-violet-500 hover:bg-green-500">
                            add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : "No Items rated"}
        </ul>
      </div>
    </div>
  );
}
