import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  byOrderProducts,
  byOrderPrice,
  byCategory,
  getCategories,
  getBrand,
  byBrand,
} from "../../redux/actions";
import Searchbar from "../Searchbar/Searchbar";

const FilterContainer = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrand());
  }, [dispatch]);

  const category = [...new Set(categories.map((el) => el.name))];
  const brand = [...new Set(brands.map((el) => el.name))];

  const handleByOrder = (e) => {
    e.preventDefault();
    dispatch(byOrderProducts(e.target.value));
  };

  const handleByOrderPrice = (e) => {
    e.preventDefault();
    dispatch(byOrderPrice(e.target.value));
  };

  const handleByCategory = (e) => {
    e.preventDefault();
    dispatch(byCategory(e.target.value));
  };

  const handleByBrand = (e) => {
    e.preventDefault();
    dispatch(byBrand(e.target.value));
  };

  return (
    <div className="navbar bg-base-100 md:ml-10 w-full">
      <div className="md:flex-1 md:flex">
        <select
          onChange={(e) => handleByCategory(e)}
          className="select md:w-fit w-full btn-ghost"
        >
          <option disabled selected>
            Categorías
          </option>
          <option value="All">All</option>
          {category.map((el, i) => (
            <option key={i} value={el}>{el}</option>
          ))}
        </select>
      </div>
      <div className="md:flex-1 md:flex">
        <select
          onChange={(e) => handleByBrand(e)}
          className="select md:w-fit w-full btn-ghost"
        >
          <option disabled selected>
            Marcas
          </option>
          <option value="All">All</option>
          {brand.map((el, i) => (
            <option key={i} value={el}>{el}</option>
          ))}
        </select>
      </div>
      <div className="md:flex-1">
        <select
          className="select md:w-fit md:flex  btn-ghost"
          onChange={(e) => handleByOrderPrice(e)}
        >
          <option disabled selected>
            Precio
          </option>
          <option value="MaxPrice">Max</option>
          <option value="MinPrice">Min</option>
        </select>
      </div>
      <div className="md:flex-1">
        <select
          className="select md:w-fit md:flex hidden btn-ghost"
          onChange={(e) => handleByOrder(e)}
        >
          <option disabled selected >
            Orden
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>
      <div className="md:mb-2 w-1/5 mr-2 md:w-fit md:flex ">
        <Searchbar />
      </div>
    </div>
  );
};

export default FilterContainer;
