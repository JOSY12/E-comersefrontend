import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { byOrderProductsBaner } from "../../redux/actions/index";
import SearchProductBaner from "./SearchProductBaner";
import RestoreProduct from "./RestoreProduct";

const FilterProducts = () => {
  const dispatch = useDispatch();

  const handleByOrder = (e) => {
    e.preventDefault();
    dispatch(byOrderProductsBaner(e.target.value));
  };

  return (
    <>
      <div className="flex flex-row justify-around content-evenly items-center bg-white mb-3">
        <div>
          <SearchProductBaner />
        </div>
        <div>
          <RestoreProduct />
        </div>
        <div>
          <select
            className="select min-w-0 btn-ghost"
            onChange={(e) => handleByOrder(e)}
          >
            <option disabled selected>
              Orden
            </option>
            <option value="Asc">A-Z</option>
            <option value="Desc">Z-A</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default FilterProducts;
