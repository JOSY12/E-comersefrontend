/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RelatedProduct } from "./relatedProduct";
import { useParams } from "react-router-dom";
import {
  GetProductById,
  buyproduct,
  addtocart,
  getProducts,
  getRelatedProducts,
} from "../../redux/actions";
import "./ProductDetail.css";
import { useAuth0 } from "@auth0/auth0-react";
import Comment from "../Comment/Comment";
import AddComment from "../Comment/AddComment";

const ProductDetail = () => {
  const { isAuthenticated, loginWithPopup } = useAuth0();


  const { id } = useParams()
  const dispatch = useDispatch()
  const { Comprados } = useSelector((state) => state.Cart)
  const { product, relatedProducts } = useSelector((state) => state.products)
  const [qty, setqty] = React.useState()
  const { paymenturl } = useSelector((state) => state.products)
  const { loggedUser, favorites } = useSelector((state) => state.user)
  const image = document.getElementById('productDetailImage')
  const [amoutstock, setbuy] = useState(1)
  const [isLiked, setIsLiked] = React.useState([])
  const [cordinates, setCordinates] = useState({
    x: '',
    y: ''
  })
  const { products } = useSelector(state => state.products)




  // const email = loggedUser.data?.email;
  const productid = product.id;
  const userId = loggedUser?.id;

  function agregarcarrito() {
    dispatch(addtocart(userId, productid, amoutstock, qty));
  }

  function getvalue(e) {
    const value = parseInt(e.target.value);
    setbuy(value);
    setqty({ ...product, quantity: amoutstock + 1 });
  }

  function mobileZoom(e) {
    setCordinates({
      x: "50",
      y: "50",
    });
    image.style.objectPosition = "center";
    image.style.transform = "scale(1.3)";
    image.style.top = `${cordinates.y - e.clientY / 7}%`;
    image.style.left =
      window.innerWidth < 700
        ? `${cordinates.x - e.clientX / 6}%`
        : `${cordinates.x - e.clientX / 12}%`;
  }

  function zoomOut(e) {
    image.style.top = "0px";
    image.style.left = "0px";
    image.style.transform = "scale(1.0)";
  }
  function Generarlink() {
    dispatch(buyproduct(amoutstock, id));
  }

 
  useEffect(() =>
  {
    dispatch(getRelatedProducts(product))
    if (productid !== id)
    {
      dispatch(GetProductById(id));
    }

    if (products.length === 0)
    {
      dispatch(getProducts())
    }

    if (products.length === 0) {
      dispatch(getProducts());
    }

  }, [amoutstock, id, userId, productid]);

  return (
    <section
      onLoad={() => setqty(product)}
      className="body-font overflow-hidden bg-base-500 lg:h-screen sm:h-fit"
    >
      <div
        className="sm:w-fill lg:w-4/5  flex-column  m-auto w-fit md:h-screen"
        style={{ float: "left", alignItems: "center" }}
      >
        <div className="w-full mx-auto flex flex-wrap px-5 py-10 justify-center">
          <div className="h-96 carousel carousel-vertical rounded-box">
            {product.photos
              ? product.photos.map((e, i) => {
                  return (
                    <div
                      onMouseMove={(e) => mobileZoom(e)}
                      onPointerLeave={(e) => zoomOut(e)}
                      key={i}
                      id="imageContainer"
                      className="carousel-item overflow-hidden "
                    >
                      <img
                        id="productDetailImage"
                        alt="imagetext"
                        src={e.url}
                      />
                    </div>
                  );
                })
              : "no image found"}
          </div>

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm  text-slate-700 font-bold title-font  tracking-widest mb-2 ">
              {product.brand ? product.brand.name : "no product brand found"}
            </h2>
            <h3 className="text-sm  text-slate-700 title-font  tracking-widest mb-2">
              {product.categories
                ? product.categories.map((e, i) => {
                    return (
                      <p
                        key={i}
                        className="badge  text-white bg-slate-400 border-0 ml-1 "
                      >
                        {e.name}
                      </p>
                    );
                  })
                : "no product gender found"}
            </h3>
            <h1 className="text-slate-700  text-3xl title-font font-medium mb-1">
              {product ? product.name : "no product name found"}
            </h1>
            <div className="flex mb-4 mt-2">
              {product.rating ? (
                <div>
                  <span className="badge   text-white bg-slate-400 border-0  ">
                    {product.rating}⭐
                  </span>
                  <span> ({product.reviewsNumber}) </span>
                </div>
              ) : (
                <span className="badge   text-white bg-slate-400 border-0  ">
                  Sin reviews
                </span>
              )}

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
                    onChange={(e) => getvalue(e)}
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
              <div className="flex-1 ">
                {Comprados?.some(productoComprado => productoComprado.id === product.id) ?
                  <div>
                    {product.reviews?.some(review => review.user.id === loggedUser?.id) ?
                      null
                      :
                      <a
                        href="#addReview"
                        className="btn ml-2 w-40 text-white text-base  bg-stone-400 hover:bg-stone-500 border-0 focus:outline-none rounded"
                      >
                        Agregar comentario
                      </a>
                    }
                  </div>
                  : null}
              </div>
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

              {/* {isAuthenticated ? (
                <div>
                  <label
                    onClick={Generarlink}
                    htmlFor="Pagartodo"
                    className="btn   ml-2 w-40 text-white text-base  bg-stone-400 hover:bg-stone-500 border-0 py-2 px-2 focus:outline-none rounded"
                  >
                    Comprar
                  </label>
                </div>
              ) : (
                <div>
                  <a
                    onClick={loginWithPopup}
                    className="btn   ml-2 w-40 text-white text-base  bg-stone-400 hover:bg-stone-500 border-0 py-2 px-2 focus:outline-none rounded"
                  >
                    Comprar ahora
                  </a>
                </div>
              )} */}
            </div>


            {/* <input type="checkbox" id="Pagartodo" className="modal-toggle " />

            <AddComment
              modalId="addReview"
              productId={product?.id}
              userId={loggedUser?.id}
            />

  

            <div className="modal ">
              <div className="modal-box   ">
                <h3 className="font-bold  text-lg">
                  <div className="alert   shadow-lg">
                    <div>
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

                      <p className=" text-black py-4   font-bold  ">
                        Quieres comprar x{amoutstock} {product.name}
                      </p>
                    </div>
                  </div>
                </h3>

                <div className="modal-action">
                  <a
                    href={paymenturl}
                    htmlFor="Pagartodo"
                    className="btn bg-green-500 text-white hover:bg-green-600 "
                  >
                    ir a Pagar!
                  </a>

                  <label
                    htmlFor="Pagartodo"
                    className="btn bg-red-500 text-white hover:bg-red-600 "
                  >
                    Cerrar
                  </label>
                </div>
              </div>
            </div> */}
          </div>
        </div>
 
        {product.reviews?.length ?
          <div>
            <span className="title-font text-slate-700 font-medium text-xl ml-28 ">Comentarios:</span>
            {product.reviews?.map((review, index) =>
              <Comment
                productId={product.id}
                rating={review.rating}
                description={review.description}
                username={review.user.username}
                userId={review.user.id}
                key={index}
              />
            )}
          </div> :
          null}
      </div>
      <div id='relatedProductsContainer'>

        {
          relatedProducts.slice(0, products.length / 2).map(p =>
          {
            return (
              <RelatedProduct key={p.id} product={p} componentId={id} />
            )
          })
        }
 
      </div>
    </section>
  );
};

export default ProductDetail;
