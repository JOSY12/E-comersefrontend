import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import
  {
    getProducts,
    Clearproduct,
    currentPagePaginated,
  } from "../redux/actions";
import Card from "../components/card/Card";
import FilterContainer from "../components/filter/FilterContainer";
import Paginated from "../components/paginated/Paginated";
import BestProducts from "../components/BestProducts/BestProducts";

const Home = () =>
{
  const dispatch = useDispatch();
  const { filteredProducts: products } = useSelector((state) => state.products);
  const { page } = useSelector((state) => state.page);

  const [currentPage, setCurrentPage] = useState(page);
  const [productsByPage, setProductsByPage] = useState(8);

  const indexLastProduct = currentPage * productsByPage;
  const indexFirstProduct = indexLastProduct - productsByPage;
  const productCurrent =
    currentPage === 1
      ? products.slice(indexFirstProduct, indexLastProduct)
      : products.slice(indexFirstProduct, indexLastProduct);

  const paginated = (numPage) =>
  {
    dispatch(currentPagePaginated(numPage));
    setCurrentPage(numPage);
  };

  useEffect(() =>
  {
    dispatch(Clearproduct());
    dispatch(getProducts());

    //dispatch(currentPagePaginated());
  }, [dispatch]);

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
            ? productCurrent.map((e, i) =>
            {
              return (
                <div key={i} className="w-400 h-250">
                  <Card
                    id={e.id}
                    image={e.photos[0].url}
                    brand={e.brand.name}
                    name={e.name}
                    unitPrice={e.unitPrice}
                    description={e.description}
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
