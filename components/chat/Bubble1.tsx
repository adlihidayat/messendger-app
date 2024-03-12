import React from "react";

const Bubble1 = ({ data }: any) => {
  function extractFormattedDate(timestamp: any) {
    if (!timestamp) {
      return null;
    }
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour}.${minute}`;
  }

  return (
    <div className="  bg-[#B5CFF8] max-w-[300px] lg:max-w-[400px] px-5 py-[10px] rounded-3xl flex items-end space-x-3">
      <p className=" text-sm text-black">{data.content}</p>
      <span className=" text-[10px] text-gray-600 ">
        {extractFormattedDate(data.timestamp)}
      </span>
    </div>
  );
};

export default Bubble1;
