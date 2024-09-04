"use client";
import Avatar from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BASE_URL } from '@/graphql/apolloClient';
import { GET_CHATBOT_BY_ID } from '@/graphql/queries/queries';
import { GetChatbotByIdResponse,GetChatbotByIdVariables } from '@/types/types';
import { useQuery } from '@apollo/client';
import { Copy } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const EditChatbot = ({params:{id}}:{params:{id:string}}) => {
  const [url,setUrl] = useState<string>("");
  const [chatbotName,setChatbotName] = useState<string>("");
  const [newCharacteristic,setNewCharacteristic]=useState<string>("");

    // query 
    const {data,loading,error} = useQuery<GetChatbotByIdResponse,GetChatbotByIdVariables>(
      GET_CHATBOT_BY_ID,{
        variables:{id}
    })

    useEffect(()=>{
      if(data){
        setChatbotName(data.chatbots.name);
      }

    },[data])

  useEffect(()=>{
    const url = `${BASE_URL}/chatbot/${id}`;
    setUrl(url);
  },[id])



  console.log(id);
  return (
    <div className='px-0 md:p-10'>
        <div className='md:sticky md:top-0 z-50 sm:max-w-sm  ml-auto space-y-2 md:border p-5 rounded-b-lg shadow-2xl md:rounded-lg bg-[#4ca2ee]'>
          <h2 className='text-white text-sm font-bold'>Link to Chat</h2>
          <p className='text-sm italic text-white'>
            Share this link with your customers to start conversations with your chatbot
          </p>
          <div className='flex gap-x-2 items-center justify-center'>
            <Link href={url} target='_blank' className='w-full cursor-pointer hover:opacity-50'>
            <Input value={url} readOnly className='cursor-pointer'/>
            </Link>
            <Button
            size={"sm"}
            className='px-3'
            onClick={()=>{
              navigator.clipboard.writeText(url);
              toast.success("Copied to clipboard");
            }}
            >
              <span className='sr-only'>Copy</span>
              <Copy className="h-4 w-4"/>
            </Button>
          </div>
        </div>
        <section className=' relative mt-5 bg-white p-5 md:p-10 rounded-lg mb-5  '>
          <Button
          variant={"destructive"}
          className='absolute top-2 right-2 h-8 w-2'
          // onClick = {()=>handleDelete(id)} 
          >
            X
          </Button>
        <div className='flex space-x-4 mt-5'>
        <Avatar seed={chatbotName} className='h-[90px] w-[90px]'/>
          <form
          // onSubmit={handleUpdateChatbot}
          className='flex flex-1 space-x-2 items-center'
          >
            <Input placeholder={chatbotName} value={chatbotName} onChange={(e)=>setChatbotName(e.target.value)} className='w-full border-none bg-transparent text-xl font-bold'/>
            <Button type="submit" disabled={!chatbotName} className=''>
              Update
            </Button>
          </form>
        </div>

        <h2 className='text-xl font-bold mt-10'>
          {"Here's what your AI knows..."}
          </h2>
          <p className='text-lg'>
            Your chatbot is equipped with the following information to assist you in
            your conversations with your customers & users.
          </p>

          <div>
            <form className='mt-2 flex flex-1 justify-center gap-x-2'>
              <Input
              type='text'
              placeholder='Example: Customer ask for prices, provide pricing: www.example.com/pricing' 
              value={newCharacteristic}
              onChange={(e)=>setNewCharacteristic(e.target.value)}
              className=''/>
              <Button 
              type='submit'
               disabled={!newCharacteristic}
               className=''
               >Add
               </Button>

            </form>
          </div>
        </section>
       
    </div>
  )
}

export default EditChatbot;
