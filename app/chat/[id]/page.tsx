import ChatContainer from "@/components/chat/ChatContainer";
import LeftSideBar from "@/components/chat/LeftSideBar";
import { authOptions } from "@/lib/auth";
import { getUserData } from "@/lib/user-utils";
import { getServerSession } from "next-auth";
import { Nunito } from "next/font/google";
import Link from "next/link";
import React from "react";

const nunito = Nunito({ subsets: ["latin"] });

export default async function Home({ params }: any) {
  const session = await getServerSession(authOptions);
  // const user = await getUserData(params.id);

  return (
    <main className="flex h-screen flex-col items-center relative lg:flex-row">
      {session ? (
        <>
          <div className=" h-screen flex-col items-center w-full hidden lg:flex lg:w-[400px] bg-slate-70 border-r border-gray-700 top-0">
            <LeftSideBar session={session} />
          </div>
          <ChatContainer session={session} id={params.id} />
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
