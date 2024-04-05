import React from "react";
import ChatHeader from "./ChatHeader";
import ChatBubbleContainer from "./ChatBubbleContainer";
import { getConversation, getMessages } from "@/lib/msg-utils";
// import { getLatestOnline } from "@/lib/user-utils";
import ChatForm from "../Form";
import { getOppositeUserByConversationId } from "@/lib/user-utils";

const ChatContainer = async ({ session, id }: any) => {
  const message = await getMessages(id);
  const oppositeUser = await getOppositeUserByConversationId(
    id,
    session.user.email
  );
  const conversation = await getConversation(id);

  return (
    <div className="group flex flex-col items-center relative h-screen w-full lg:w-auto lg:flex-1  ">
      <ChatHeader
        user={oppositeUser}
        session={session}
        conversation={conversation}
      />
      <ChatBubbleContainer message={message} session={session} id={id} />
      <ChatForm session={session} id={id} />
    </div>
  );
};

export default ChatContainer;
