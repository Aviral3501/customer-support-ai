"use client";
import React, { use, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Message } from "@/types/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import startNewChat from "@/lib/server/startNewChat";

const ChatbotPage = ({ params: { id } }: { params: { id: string } }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [chatId, setChatId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

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

      



    </div>
  );
};

export default ChatbotPage;
