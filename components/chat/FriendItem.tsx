import Image from "next/image";
import Link from "next/link";
import React from "react";

const FriendItem = ({ data }: any) => {
  function extractFormattedDate(timestamp: any) {
    if (!timestamp) {
      return null;
    }
    const date = new Date(timestamp);
    const date2 = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (day === date2.getDate()) {
      return `${hour}.${minute}`;
    } else if (date2.getDate() - day <= 365) {
      return `${day}/${month}`;
    }
    return `${day}/${month}/${year}`;
  }

  return (
    <Link
      href={`/chat/${data.user.id}`}
      className="flex items-center space-x-4  py-3"
    >
      <div className=" w-[54px] h-[54px] sm:w-[48px] sm:h-[48px]  rounded-full bg-gray-200 overflow-hidden">
        <Image
          src={data.user.image}
          alt=""
          width={100}
          height={100}
          className=""
        />
      </div>
      <div className=" flex-1 ">
        <div className=" w-full flex justify-between">
          <span className=" text-white font-semibold">{data.user.name}</span>
          <span className=" text-xs">
            {extractFormattedDate(data.lastMessageAt)}
          </span>
        </div>
        <p className=" text-sm max-w-52 truncate h-5">{data.lastMessage}</p>
      </div>
    </Link>
  );
};

export default FriendItem;
