/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  Clearproduct,
  currentPagePaginated,
} from "../redux/actions";
import Card from "../components/card/Card";
import FilterContainer from "../components/filter/FilterContainer";
import Paginated from "../components/paginated/Paginated";

const Home = () => {
  const dispatch = useDispatch();
  const { filteredProducts: products } = useSelector((state) => state.products);
  const { page } = useSelector((state) => state.page);
  const { loggedUser, isAuthenticated } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(page);
  const [productsByPage, setProductsByPage] = useState(8);

  const indexLastProduct = currentPage * productsByPage;
  const indexFirstProduct = indexLastProduct - productsByPage;
  const productCurrent =
    currentPage === 1
      ? products.slice(indexFirstProduct, indexLastProduct)
      : products.slice(indexFirstProduct, indexLastProduct);

  const paginated = (numPage) => {
    dispatch(currentPagePaginated(numPage));
    setCurrentPage(numPage);
  };

  useEffect(() => {
    dispatch(Clearproduct());
    console.log({ isAuthenticated });
    console.log({ loggedUser });
    if (isAuthenticated) dispatch(getProducts(loggedUser.id));
    else dispatch(getProducts());
  }, [isAuthenticated]);
  return (
    <>
      <div>
        {/* <div>
          <BestProducts />
        </div> */}
        <div className="flex justify-center mt-5 mb-5">
          <Paginated
            productsByPage={productsByPage}
            products={products.length}
            paginated={paginated}
          />
        </div>
        <div>
          <FilterContainer />
        </div>
        <div className="bg-base-300 flex flex-wrap justify-evenly items-start content-around ">
          {productCurrent.length > 0
            ? productCurrent.map((e, i) => {
                return (
                  <div key={i} className="w-400 h-250">
                    <Card
                      id={e.id}
                      view={"home"}
                      image={e.photos[0].url}
                      brand={e.brand.name}
                      name={e.name}
                      quantity={e.quantity}
                      unitPrice={e.unitPrice}
                      description={e.description}
                      stock={e.stock}
                      isFavorite={isAuthenticated ? e.isFavorite : null}
                    />
                  </div>
                );
              })
            : "No Products"}
        </div>
        <div>
          <p>Footer</p>
        </div>
      </div>
    </>
  );
};

export default Home;
