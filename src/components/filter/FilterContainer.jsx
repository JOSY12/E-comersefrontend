/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
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
    <div className="navbar bg-base-100 ml-10">
      <div className="flex-1">
        <select
          onChange={(e) => handleByCategory(e)}
          className="select min-w-0 btn-ghost"
        >
          <option disabled selected>
            Categories
          </option>
          <option value="All">All</option>
          {category.map((el) => (
            <option value={el}>{el}</option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <select
          onChange={(e) => handleByBrand(e)}
          className="select min-w-0 btn-ghost"
        >
          <option disabled selected>
            Brand
          </option>
          <option value="All">All</option>
          {brand.map((el) => (
            <option value={el}>{el}</option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <select
          className="select min-w-0 btn-ghost"
          onChange={(e) => handleByOrderPrice(e)}
        >
          <option disabled selected>
            Price
          </option>
          <option value="MaxPrice">Max</option>
          <option value="MinPrice">Min</option>
        </select>
      </div>
      <div className="flex-1">
        <select
          className="select min-w-0 btn-ghost"
          onChange={(e) => handleByOrder(e)}
        >
          <option disabled selected>
            Order
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default FilterContainer;
