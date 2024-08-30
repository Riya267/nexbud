import { scrollToBottom } from "@/lib/helper";
import { MessageProp, MessagesProps } from "@/types";
import React, { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

const Message: React.FC<MessageProp> = ({ text, sender }) => {
  const isUser = sender === "user";
  return (
    <div
      className={`p-3 ${
        isUser
          ? "bg-slate-500 text-white rounded-tr-none"
          : "bg-gray-300 text-black rounded-tl-none"
      } rounded-lg w-fit max-w-[70%]`}
    >
      <p className="break-words">{text}</p>
    </div>
  );
};

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  useEffect(() => {
   if(messages.length > 0) scrollToBottom("messages-container")
  },[messages])
  return (
    <div id="messages-container" className="p-8 rounded-t-lg h-full max-h-[90%] scrollbar-thumb-slate-800 scrollbar-track-slate-900 scrollbar-thin overflow-y-auto mt-[6rem] w-full">
      <ul className="flex flex-wrap space-x-2 justify-center items-center">
        {messages.map((msg, index) => (
          <li
            key={index}
            className={`mb-3 lg:mb-2 w-full flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Message key={index} text={msg.text} sender={msg.sender} />
          </li>
        ))}
        {messages[messages.length - 1].sender === "user" && (
          <li className="w-full flex justify-start">
            <ThreeDots
              visible={true}
              height="50"
              width="50"
              color="#313042"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Messages;
