"use client";

import { Message } from "@/types/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import { UserCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

  const ref = useRef<HTMLDivElement>(null);

  // ✅ Ensures timestamps only render after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

//   auto scroll to the botton as the user types 
  useEffect(()=>{
    if(ref.current){
        ref.current.scrollIntoView({behavior:"smooth"})
    }

  },[messages])

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
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Paragraphs
                  p: ({ node, ...props }) => (
                    <p
                      {...props}
                      className={`break-words whitespace-break-spaces leading-relaxed mb-5 ${message.content ==="Thinking..." && "animate-pulse"} ${isSender?"text-white":"text-black"}`}
                    />
                  ),

                  // Headings
                  h1: ({ node, ...props }) => (
                    <h1
                      {...props}
                      className="text-2xl font-bold mb-5 text-gray-900"
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      {...props}
                      className="text-xl font-semibold mb-5 text-gray-900"
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      {...props}
                      className="text-lg font-semibold mb-5 text-gray-900"
                    />
                  ),

                  // Lists
                  ul: ({ node, ...props }) => (
                    <ul
                      {...props}
                      className="list-disc break-words list-inside ml-5 mb-5 space-y-1"
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      {...props}
                      className="list-decimal break-words list-inside ml-5 mb-5 space-y-1"
                    />
                  ),

                  // Links
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="font-bold break-words underline hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),

                  // Tables
                  table: ({ node, ...props }) => (
                    <table
                      {...props}
                      className="table-auto border-separate border-spacing-4 border-2 border-gray-300 mb-5 w-full"
                    />
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      {...props}
                      className="px-3 py-2 bg-gray-100 font-semibold text-left underline"
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      {...props}
                      className="px-3 py-2 text-gray-700"
                    />
                  ),
                }}
              >
                {message.content || "Empty message"}
              </ReactMarkdown>
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

      <div ref={ref}></div>
    </div>
  );
};

export default Messages;
