import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Nunito } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AddFriendForm } from "@/components/Form";

const nunito = Nunito({ subsets: ["latin"] });

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex h-screen flex-col items-center justify-center relative ">
      <div className=" w-full h-[50%] bg-[#B5CFF8] absolute top-0 z-0"></div>
      <Link
        href={"/chat"}
        className="fixed top-8 left-[50px] bg-white p-2 rounded-full hover-opacity"
      >
        <Image
          src={"/icon/backBlack.svg"}
          alt=""
          width={20}
          height={20}
          className=""
        />
      </Link>
      <div className=" z-10  bg-white px-5 lg:px-10 py-10 rounded-2xl text-center flex flex-col items-center">
        <h1 className=" text-xl font-semibold">Find friend</h1>
        <p className=" w-52 leading-4 text-[13px] text-gray-500 mb-7">
          Create a new journey with your friend
        </p>
        <div className=" w-40 h-40 lg:w-60 lg:h-60 mb-7 flex items-center">
          <Image
            src={"/illustration/addFriend.webp"}
            alt=""
            width={250}
            height={250}
            className=""
          />
        </div>
        <p className=" text-xs mb-2">Input friend&apos;s email</p>
        <AddFriendForm session={session} />
      </div>
    </main>
  );
}
