import React from "react";
import FriendItem from "./FriendItem";

const FriendItemContainer = ({ data }: any) => {
  return (
    <section className=" w-full max-w-lg flex-1 overflow-y-scroll px-8 mt-2  text-[#9A9EAE] custom-scroll">
      {Object.keys(data).length > 0 ? ( // Check if object is not empty
        <>
          {data?.data?.map((friendData: any, index: any) => (
            <FriendItem key={index} data={friendData} />
          ))}
        </>
      ) : (
        <p className=" text-center text-sm mt-20">No friend found</p>
      )}
    </section>
  );
};

export default FriendItemContainer;
