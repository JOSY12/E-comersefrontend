import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchUsers } from "../../redux/actions";

function SearchUser() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const handleSearch = (e) => {
    setUsername(e.target.value);
    dispatch(searchUsers(e.target.value));
  };

  return (
    <div>
      <div className="form-control pr-1">
        <input
          onChange={(e) => handleSearch(e)}
          value={username}
          type="text"
          placeholder="Search"
          className="input input-bordered"
        />
      </div>
    </div>
  );
}

export default SearchUser;
