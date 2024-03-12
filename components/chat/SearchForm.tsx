import Image from "next/image";
import React, { useState } from "react";

const SearchForm = ({ setSearchName }: any) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchName(search);
  };

  return (
    <form
      onSubmit={handleSearch}
      action=""
      className=" w-full max-w-lg flex px-8 space-x-3 py-5 "
    >
      <input
        type="text"
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        placeholder=" Search Friend Email"
        className=" px-5 flex-1 rounded-full text-sm outline-none"
      />
      <button
        type="submit"
        className=" bg-[#B5CFF8] p-3 rounded-full hover-opacity"
      >
        <Image
          src={"/icon/search.svg"}
          alt=""
          width={15}
          height={15}
          className=""
        />
      </button>
    </form>
  );
};

export default SearchForm;
