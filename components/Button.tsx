"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export function LoginButtonGoogle() {
  const handleGoogleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      await signIn("google"); // Initiates GitHub authentication
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="bg-[#B5CFF8] w-full rounded-full py-[10px] text-xs font-semibold  hover-opacity relative"
    >
      <Image
        src={"/socialmedia/google.svg"}
        alt=""
        width={18}
        height={18}
        className=" absolute z-20 left-3 "
      />
      <span>Google</span>
    </button>
  );
}

export function LoginButtonGithub() {
  const handleGithubSignIn = async (e: any) => {
    e.preventDefault();
    try {
      await signIn("github"); // Initiates GitHub authentication
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };
  return (
    <button
      onClick={handleGithubSignIn}
      className="bg-[#B5CFF8] w-full rounded-full py-[10px] text-xs font-semibold  hover-opacity relative"
    >
      <Image
        src={"/socialmedia/github.svg"}
        alt=""
        width={19}
        height={19}
        className=" absolute z-20 left-3  top-2"
      />
      <span>Github</span>
    </button>
  );
}

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className=" bg-[#b93232 text-white font text-xs sm:hover:bg-[#2a2a2a]  rounded sm:w-8 sm:h-8 flex justify-center items-center hover-opacity"
    >
      <Image
        src={"/icon/logout.svg"}
        alt=""
        width={16}
        height={16}
        className=""
      />
    </button>
  );
}

export function Unfriend({ user1Email, user2Email }: any) {
  const router = useRouter();

  const unfriend = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/friend", {
        method: "DELETE",
        body: JSON.stringify({
          user1Email: user1Email,
          user2Email: user2Email,
        }),
      });
      router.push("/chat");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={unfriend}
      className="hover-opacity pt-2 pb-3 px-4 bg-[#262626] text-red-400 rounded-b-lg hover-opacity"
    >
      Unfriend
    </button>
  );
}
export function Unfriend2({ user1Email, user2Email }: any) {
  const router = useRouter();

  const unfriend = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/friend", {
        method: "DELETE",
        body: JSON.stringify({
          user1Email: user1Email,
          user2Email: user2Email,
        }),
      });
      router.push("/chat");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={unfriend}
      className="hover-opacity bg-[#373737] px-4 py-4 rounded-lg flex flex-col items-center"
    >
      <Image
        src={"/icon/unfriend.svg"}
        alt=""
        width={25}
        height={25}
        className="mb-1"
      />
      <span className="text-[#E85656]">Unfriend</span>
    </button>
  );
}
