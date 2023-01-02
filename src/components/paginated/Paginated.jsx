import React from "react";

const Paginated = ({ productsByPage, products, paginated }) => {
  const numPages = [];

  for (let i = 1; i <= Math.ceil(products / productsByPage); i++) {
    numPages.push(i);
  }

  return (
    <>
      <nav className="btn-group">
        <ul className="">
          {numPages &&
            numPages.map((num) => (
              <li key={num} className="btn btn-sm px-1">
                <a
                  className="w-7 p-0 hover:bg-teal-400 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-400 text-xl "
                  href="/home/#"
                  onClick={() => paginated(num)}
                >
                  {num}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default Paginated;
