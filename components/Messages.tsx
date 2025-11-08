"use client";

import { Message } from "@/types/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { UserCircle } from "lucide-react";

const Messages = ({
  messages,
  chatbotName,
}: {
  messages: Message[];
  chatbotName: string;
}) => {
  const path = usePathname();
  const isReviewsPage = path.includes("review-sessions");
  const [mounted, setMounted] = useState(false);

  // ✅ Ensures timestamps only render after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="flex-1 overflow-y-auto space-y-10 py-10 px-5 bg-white rounded-lg"
      suppressHydrationWarning
    >
      {messages.map((message) => {
        const isSender = message.sender !== "user";
        const timestamp = mounted
          ? new Date(message.created_at).toLocaleString()
          : ""; // avoid mismatch before hydration

        return (
          <div
            key={message.id}
            className={`chat ${isSender ? "chat-start" : "chat-end"}`}
          >
            {/* Avatar */}
            <div className="chat-image avatar">
              <div className="avatar h-14 w-14">
                {isSender ? (
                  <div className="w-full h-full rounded-full bg-white border-2 border-[#2991EE] overflow-hidden flex items-center justify-center">
                    <Avatar
                      seed={chatbotName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <UserCircle className="h-8 w-8 text-[#2991EE]" />
                  </div>
                )}
              </div>
            </div>

            {/* Message bubble */}
            <div
              className={`chat-bubble text-sm md:text-base leading-relaxed ${
                isSender
                  ? "chat-bubble-primary bg-[#4d7dfb] text-white"
                  : "chat-bubble-secondary bg-gray-200 text-black"
              }`}
            >
              {message.content || "Empty message"}
            </div>

            {/* Timestamp (only on review page) */}
            {isReviewsPage && mounted && (
              <div className="chat-footer text-[10px] text-gray-500 mt-1">
                {isSender ? "AI • " : "You • "}
                {timestamp}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
