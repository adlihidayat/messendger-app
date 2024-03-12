import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Nunito } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FriendListContainer from "@/components/chat/LeftSideBar";
import LeftSideBar from "@/components/chat/LeftSideBar";

const nunito = Nunito({ subsets: ["latin"] });

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex h-screen flex-col items-center relative lg:flex-row">
      {session ? (
        <>
          <div className=" h-screen flex-col items-center w-full flex lg:w-[400px] bg-slate-70 border-r border-gray-700 top-0">
            <LeftSideBar session={session} />
          </div>
          <div className="hidden lg:flex flex-col items-center justify-center text-gray-500 text-sm relative h-screen w-full lg:w-auto lg:flex-1  ">
            <p>click any friend and start chatting now</p>
          </div>
        </>
      ) : (
        <section className=" text-white px-14 text-center h-screen w-full flex flex-col items-center justify-center">
          <div></div>
          <h1
            className={`${nunito.className} clear-start text-2xl font-semibold leading-6 mb-3`}
          >
            Ooopps i think u havent login yet
          </h1>
          <p className=" text-gray-400 mb-5">
            please login to continue using the app
          </p>
          <Link
            href={"/"}
            className=" text-black bg-[#B5CFF8] py-[6px] hover-opacity rounded-xl w-40 text-sm"
          >
            Login
          </Link>
        </section>
      )}
    </main>
  );
}
