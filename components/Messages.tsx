"use client";

import { Message } from "@/types/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
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

  // ✅ Ensure timestamps render only after hydration
  useEffect(() => setMounted(true), []);

  // ✅ Auto-scroll to bottom when messages update
  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto space-y-10 py-10 px-5 bg-white rounded-lg"
      suppressHydrationWarning
    >
      {console.log(messages)as any}
      {messages.map((message) => {
        const isSender = message.sender !== "user";
        const timestamp = mounted
          ? new Date(message.created_at).toLocaleString()
          : "";

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

            {/* Message Bubble */}
            <div
              className={`chat-bubble text-sm md:text-base leading-relaxed  whitespace-pre-wrap break-words ${
                isSender
                  ? "chat-bubble-primary bg-[#4d7dfb] text-white"
                  : "chat-bubble-secondary bg-gray-200 text-black"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                // ✅ FIX: Explicit typing for code component props
                components={{
                  p: ({ node, ...props }) => (
                    <p
                      {...props}
                      className={`break-words whitespace-pre-wrap leading-relaxed mb-3 ${
                        message.content === "Thinking..." && "animate-pulse"
                      } ${isSender ? "text-white" : "text-black"}`}
                    />
                  ),

                  code: (props: any) => {
                    const { inline, className, children, ...rest } = props;
                    return !inline ? (
                      <pre className="overflow-x-auto bg-gray-800 text-gray-100 p-3 rounded-md mb-3 max-w-full">
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code
                        {...rest}
                        className={`bg-gray-100 px-1 py-0.5 rounded ${
                          isSender ? "text-white bg-[#4d7dfb]/30" : "text-black"
                        }`}
                      >
                        {children}
                      </code>
                    );
                  },

                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto mb-3">
                      <table
                        {...props}
                        className="table-auto min-w-full border border-gray-300"
                      />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      {...props}
                      className="px-3 py-2 font-semibold text-left underline border-b"
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      {...props}
                      className="px-3 py-2 text-gray-700 border-b"
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold break-words underline hover:text-blue-400"
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

      {/* Auto-scroll anchor */}
      <div ref={ref}></div>
    </div>
  );
};

export default Messages;
