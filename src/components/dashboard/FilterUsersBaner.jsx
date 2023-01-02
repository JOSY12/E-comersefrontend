import React from "react";
import { useDispatch } from "react-redux";
import { byOrderUsersBaner } from "../../redux/actions/index";
import SearchUserBaner from "./SearchUserBaner";
import RestoreUser from "./RestoreUser";

const FilterUsers = () => {
  const dispatch = useDispatch();

  const handleByOrder = (e) => {
    e.preventDefault();
    dispatch(byOrderUsersBaner(e.target.value));
  };

  return (
    <>
      <div className="flex flex-row justify-around content-evenly items-center bg-white mb-3">
        <div>
          <SearchUserBaner />
        </div>
        <div>
          <RestoreUser />
        </div>
        <div>
          <select
            className="select min-w-0 btn-ghost"
            onChange={(e) => handleByOrder(e)}
          >
            <option>Orden</option>
            <option value="Asc">A-Z</option>
            <option value="Desc">Z-A</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default FilterUsers;
