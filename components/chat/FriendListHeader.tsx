import Link from "next/link";
import React from "react";
import { LogoutButton } from "../Button";
import Image from "next/image";

const FriendListHeader = () => {
  return (
    <section className=" relative w-full max-w-lg flex items-center justify-between pt-10 pb-2 lg:pt-14 px-8">
      <Link href={""} className=" text-white text-xl font-medium">
        Messendger
      </Link>
      <div className="flex items-center space-x-5 sm:space-x-2">
        <Link
          href={"/addFriend"}
          className="  hover-opacity flex justify-center items-center sm:w-8 sm:h-8 rounded sm:hover:bg-[#2a2a2a]"
        >
          <Image
            src={"/icon/addFriend.svg"}
            alt=""
            width={20}
            height={20}
            className=""
          />
        </Link>
        <LogoutButton />
      </div>
    </section>
  );
};

export default FriendListHeader;
