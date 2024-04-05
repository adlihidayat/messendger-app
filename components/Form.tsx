"use client";

import Image from "next/image";
import { useState } from "react";

export function AddFriendForm({ session }: any) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [status, setStatus] = useState(0);

  const handleAdd = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/friend", {
        method: "POST",
        body: JSON.stringify({
          user1Email: session?.user?.email,
          user2Email: input,
        }),
      });
      const json = await response.json();
      setStatus(response.status);
      setOutput(json.message);
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      <form
        action=""
        onSubmit={handleAdd}
        className="  bg-[#eeeeee] rounded-full flex items-center space-x-2 pl-5 pr-[6px] py-[5px]"
      >
        <input
          type="text"
          onChange={(e: any) => setInput(e.target.value)}
          className=" bg-transparent outline-none w-[180px] lg:w-[230px] text-sm"
          placeholder="email@gmail.com "
        />
        <button
          type="submit"
          className="bg-[#B5CFF8] rounded-full text-xs px-6 py-[5px] lg:py-[6px] hover-opacity"
        >
          Add
        </button>
      </form>
      {isClicked && (
        <span
          className={`${
            status > 299 ? " text-red-500" : " text-blue-500"
          } absolute top-32  bg-white text-black text-xs px-3 py-1 rounded-full`}
        >
          {output}
        </span>
      )}
    </div>
  );
}
const ChatForm = ({ session, id }: any) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          conversationId: id,
          sender: session?.user?.email,
          content: input,
        }),
      });
      const json = await response.json();
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      action=""
      onSubmit={sendMessage}
      className="bg-[#1b1b1b] w-full flex px-8 space-x-3 pt-5 pb-10 bg-slate-00"
    >
      <input
        type="text"
        value={input}
        onChange={(e: any) => setInput(e.target.value)}
        placeholder=" Search friend"
        className=" px-5 flex-1 rounded-full text-sm outline-none bg-[#2b2b2b] text-white"
      />
      <button
        title="send chat Button"
        disabled={input === ""}
        type="submit"
        className=" bg-[#B5CFF8] p-[9px] rounded-full disabled:opacity-25 hover-opacity"
      >
        <Image
          src={"/icon/send.svg"}
          alt=""
          width={23}
          height={23}
          className=""
        />
      </button>
    </form>
  );
};

export default ChatForm;
