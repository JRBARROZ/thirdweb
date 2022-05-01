import { SearchIcon } from "@heroicons/react/solid";
import React from "react";

function SearchBar() {
  return (
    <div className="flex max-w-sm w-full transition-all items-center">
      <input
        className="w-full outline-none rounded-l-md py-2 px-4 bg-white bg-opacity-5 focus:bg-opacity-10 transition-all"
        placeholder="Search Pokemon.."
      ></input>
      <div className="flex flex-grow bg-white bg-opacity-10 h-full px-5 rounded-r-lg">
        <SearchIcon className="w-6" />
      </div>
    </div>
  );
}

export default SearchBar;
