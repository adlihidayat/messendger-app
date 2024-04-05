"use client";
import React, { useEffect, useRef, useState } from "react";
import Bubble2 from "./Bubble2";
import Bubble1 from "./Bubble1";
import ChatDate from "./ChatDate";
import { pusherClient } from "@/lib/pusher";

const ChatBubbleContainer = ({ message, session, id }: any) => {
  const section = useRef<HTMLElement>(null);
  const [realmessage, setRealMessage] = useState(message);

  function extractFormattedDate(timestamp: any) {
    if (!timestamp) {
      return null;
    }
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  }

  useEffect(() => {
    if (section.current) {
      section.current.scrollTop = section.current.scrollHeight;
    }
  }, [realmessage]);

  useEffect(() => {
    pusherClient.subscribe(id);

    const messageHandler = (message: any) => {
      setRealMessage((current: any) => {
        return [...current, message];
      });
    };
    pusherClient.bind("newMsg", messageHandler);

    return () => {
      pusherClient.unsubscribe(id);
      pusherClient.unbind("newMsg", messageHandler);
    };
  }, [id]);

  return (
    <section
      ref={section}
      className="custom-scroll flex-1 w-full bg-slate-20 text-white flex flex-col pt-2 pb-2 space-y-4 px-8 overflow-y-scroll"
    >
      {realmessage.map((data: any, index: any) => (
        <div key={index} className=" w-full">
          {index === 0 ? (
            <ChatDate message={data} />
          ) : (
            <>
              {extractFormattedDate(data.timestamp) !==
                extractFormattedDate(realmessage[index - 1].timestamp) && (
                <ChatDate message={data} />
              )}
            </>
          )}

          <div
            className={`flex ${
              data.sender === session.user.email
                ? " justify-end"
                : "justify-start"
            } w-full`}
          >
            {data.sender === session.user.email ? (
              <Bubble1 data={data} />
            ) : (
              <Bubble2 data={data} />
            )}
          </div>
        </div>
      ))}
      {realmessage.length === 0 && (
        <p className=" text-center mt-80 text-sm text-gray-500">
          start chatting with your friend
        </p>
      )}
    </section>
  );
};

export default ChatBubbleContainer;
