import React from "react";
import ChatHeader from "./ChatHeader";
import ChatBubbleContainer from "./ChatBubbleContainer";
import { getMessage } from "@/lib/msg-utils";
import { getLatestOnline } from "@/lib/user-utils";
import ChatForm from "../Form";

const ChatContainer = async ({ session, user }: any) => {
  const message = await getMessage(session.user.email, user.email);
  const latestOnline = await getLatestOnline(user.email);

  return (
    <div className="group flex flex-col items-center relative h-screen w-full lg:w-auto lg:flex-1  ">
      <ChatHeader user={user} session={session} latestOnline={latestOnline} />
      <ChatBubbleContainer
        message={message}
        session={session}
        userId={user.id}
      />
      <ChatForm session={session} user={user} />
    </div>
  );
};

export default ChatContainer;
