"use client";

import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CREATE_CHATBOT } from "@/graphql/mutations/mutations";
import { useMutation } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CreateChatBot = () => {
  const {user} = useUser();  //get user info  
  const [name,setName] =useState("");
  const router = useRouter();

  const [createChatbot,{data,loading,error}] = useMutation(CREATE_CHATBOT,{
    variables:{
      clerk_user_id:user?.id,
      name:name,
      created_at: new Date().toISOString(),
    }
  });

  const handleSubmit=async(e:FormEvent)=>{
    e.preventDefault();
    try {
      const data = await createChatbot();
      setName("");
      router.push(`/edit-chatbot/${data.data.insertChatbots.id}`);
    } catch (error) {
      console.error(error);
      console.log("Error while creating chatbot -----> ");
      // toast.error("Error while creating chatbot");
    }
  };
  if(!user){
    return null;
  }


  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white p-8 rounded-md shadow-md m-8">
      <Avatar seed="create-chatbot"/>
      <div>
        <h1 className="text-xl lg:text-3xl font-semibold pb-1">Create</h1>
        <h2 className="text-black">Create a new chatbot to assist in your conversations with your customers.</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row">
            <Input placeholder="Chatbot Name..."
            className="max-w-lg mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"/>
            <Button type="submit" className="md:mt-2" disabled={loading || !name}>
              {loading ? "Creating Chatbot...":"Create Chatbot"}
              </Button>
        </form>

        <p className="text-gray-400 mt-5">Example: Customer Support Chatbot</p>
      </div>
    </div>
  )
}

export default CreateChatBot
