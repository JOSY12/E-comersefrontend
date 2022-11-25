/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { search } from "../../redux/actions";

function Searchbar()
{
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleSearch = (event) =>
  {
    setName(event.target.value);
    dispatch(search(event.target.value));
  }
  return (
    <div className="mr-20">
      <div className="form-control pr-1">
        <input
          onChange={handleSearch}
          value={name}
          type="text"
          placeholder="Search"
          className="input input-bordered"
        />
      </div>
      {/* <button
        onClick={search}
        className="btn  w-20 btn-primary border-0 bg-stone-400 hover:bg-stone-500 rounded text-white  text-lg  normal-case"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-search"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="10" cy="10" r="7" />
          <line x1="21" y1="21" x2="15" y2="15" />
        </svg>
      </button> */}
    </div>
  );
}

export default Searchbar;
