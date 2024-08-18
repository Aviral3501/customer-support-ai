"use client";

import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateChatBot = () => {
  return (
    <div className="flex flex-col items-center justify-center md:flow-row md:space-x-10 bg-white p-8 rounded-md shadow-md m-8">
      <Avatar seed="create-chatbot"/>
      <div>
        <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
        <h2 className="text-black">Create a new chatbot to assist in your conversations with your customers.</h2>
        <form className="flex flex-col gap-4 md:flex-row">
            <Input placeholder="Chatbot Name..."
            className="max-w-lg mt-2"
            required
            type="text"/>
            <Button className="md:mt-2">Create Chatbot</Button>
        </form>
      </div>
    </div>
  )
}

export default CreateChatBot
