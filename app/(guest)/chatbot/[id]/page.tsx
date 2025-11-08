"use client";
import React, { use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GetChatbotByIdResponse, GetChatbotByIdVariables, Message, MessagesByChatSessionIdResponse, MessagesByChatSessionIdVariables } from "@/types/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import startNewChat from "@/lib/server/startNewChat";
import Avatar from "@/components/Avatar";
import { useQuery } from "@apollo/client";
import { GET_CHATBOT_BY_ID, GET_MESSAGES_BY_CHAT_SESSION_ID } from "@/graphql/queries/queries";
import { Variable } from "lucide-react";
import Messages from "@/components/Messages";

const ChatbotPage = ({ params: { id } }: { params: { id: string } }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [chatId, setChatId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);


//   get the chatbot data
  const {data:chatbotData} = useQuery<GetChatbotByIdResponse,GetChatbotByIdVariables>(
    GET_CHATBOT_BY_ID,{
        variables:{id}
    }
  )

//   get the messages by chatbot_sessiosn_id

const {
    loading:loadingQuery,
    error,
    data,
} = useQuery<MessagesByChatSessionIdResponse,MessagesByChatSessionIdVariables>(
    GET_MESSAGES_BY_CHAT_SESSION_ID,{
        variables:{
            chat_session_id:chatId
        },
        skip:!chatId,
    }
)


useEffect(()=>{
    if(data){
        setMessages(data.chat_sessions.messages)
    }


},[data])



  const handleInformatoinSubmit = async(e:React.FormEvent) =>{
    e.preventDefault();
    setLoading(true);
    // console.log(1);
    const chatId = await startNewChat(name,email,Number(id));
    // console.log("2")
    setChatId(chatId);
    setLoading(false);
    setIsOpen(false);
  }



  return (
    <div className="w-full flex bg-gray-100">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[350px] sm:min-w-[425px]">
          <form  onSubmit={handleInformatoinSubmit}>
            <DialogHeader className="font-bold w-full items-center justify-center">
              Lets help you out!
            </DialogHeader>
            <DialogDescription className="text-center">
              I just need a few details to get started
            </DialogDescription>

            <div className=" grid gap-4 p-8 rounded-lg">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@gmail.com"
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
                <Button type="submit" disabled={!name||!email||loading}>
                    {!loading?"Continue":"Loading..."}
                </Button>
            </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>

      {/* the chatbot ui here  */}

      <div className="flex flex-col w-full max-w-3xl mx-auto bg-white md:rounded-l-lg shadow-2xl md:mt-10">
        <div className="pb-4 border-b sticky top-0 z-50 bg-[#4D7DFB] py-5 px-10 text-white md:rounded-t-lg flex  items-center space-x-4">
            <Avatar
            seed={chatbotData?.chatbots.name as string}
            className="h-12 w-12 bg-white rounded-full border-2 border-white"/>

            <div>
                <h1 className="truncate text-lg">{chatbotData?.chatbots.name}</h1>
                <p className="text-sm text-gray-300">
                    Typically Replies Instantly
                </p>
            </div>
        </div>


        {/* All the messages  */}

        <Messages
            messages={messages}
            chatbotName={chatbotData?.chatbots.name!}
            />


      </div>
    </div>
  );
};

export default ChatbotPage;
