"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Unfriend, Unfriend2 } from "../Button";

const ChatHeader = ({ user, session, latestOnline }: any) => {
  const [isActive, setIsActive] = useState(false);
  const [isShowProfile, setIsShowProfile] = useState(false);

  function extractFormattedDate(timestamp: any) {
    if (!timestamp) {
      return false;
    }
    const date = new Date(timestamp);
    const date2 = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (day === date2.getDate()) {
      return `${hour}.${minute} `;
    } else if (date2.getDate() - day <= 365) {
      return `${day}/${month}`;
    }
    return `${day}/${month}/${year}`;
  }

  const handleMore = () => {
    setIsShowProfile(false);
    setIsActive(!isActive);
  };

  const handleMessage = () => {
    setIsShowProfile(false);
    setIsActive(false);
  };

  return (
    <section className="bg-[#1b1b1b] top-0 w-full relative px-8 flex justify-between items-center bg-slate-70 pt-10 pb-5">
      <div className="flex items-center space-x-3">
        <Link href={"/chat"}>
          <Image
            src={"/icon/back.svg"}
            alt=""
            width={25}
            height={25}
            className="lg:hidden"
          />
        </Link>
        <div className="w-64 flex items-center space-x-3">
          <div className="w-[57px] h-[43px]  bg-gray-500 rounded-full overflow-hidden">
            <Image
              src={user.image}
              alt=""
              width={100}
              height={100}
              className=""
            />
          </div>
          <div className=" w-full flex flex-col justify-between">
            <span className=" text-white font-semibold w-[187px] truncate">
              {user.name}
            </span>
            {latestOnline.length !== 0 && (
              <span className=" text-xs text-gray-300">
                Last seen at {extractFormattedDate(latestOnline[0].timestamp)}
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={handleMore}
        className=" space-y-1 duration-300 sm:hover:bg-[#222222] px-5 py-3 rounded-full"
      >
        <div className="w-[3px] h-[3px] bg-gray-300 rounded-full"></div>
        <div className="w-[3px] h-[3px] bg-gray-300 rounded-full"></div>
        <div className="w-[3px] h-[3px] bg-gray-300 rounded-full"></div>
      </button>
      {isActive && (
        <div className=" fixed right-12 top-24 flex flex-col text-xs text-white bg-[#262626] rounded-lg overflow-hidden">
          {isShowProfile ? (
            <div className="  text-center flex flex-col items-center px-7 pt-10 pb-7 relative">
              <div className=" bg-[#B5CFF8] w-full h-[85px] absolute z-0 top-0"></div>
              <div className=" w-20 h-20 bg-slate-400 rounded-full mb-5 z-20 overflow-hidden">
                <Image
                  src={user.image}
                  alt=""
                  width={100}
                  height={100}
                  className=""
                />
              </div>
              <span className=" text-base font-semibold z-20">{user.name}</span>
              <span className=" z-20">{user.email}</span>
              {latestOnline.length !== 0 && (
                <span className=" text-[#b0b0b0] mb-5 z-20">
                  Last seen at {extractFormattedDate(latestOnline[0].timestamp)}
                </span>
              )}
              <div className=" space-x-2  flex">
                <button
                  onClick={handleMessage}
                  className="hover-opacity bg-[#373737] text-[#C8C8C8] px-4 py-4 rounded-lg flex flex-col items-center"
                >
                  <Image
                    src={"/icon/message.svg"}
                    alt=""
                    width={25}
                    height={25}
                    className="mb-[2px]"
                  />
                  <span>Message</span>
                </button>
                <Unfriend2
                  user1Email={session.user.email}
                  user2Email={user.email}
                />
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => setIsShowProfile(true)}
                className=" pb-2 pt-3 px-4  text-white rounded-t-lg hover-opacity"
              >
                View profile
              </button>
              <Unfriend
                user1Email={session.user.email}
                user2Email={user.email}
              />
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default ChatHeader;
