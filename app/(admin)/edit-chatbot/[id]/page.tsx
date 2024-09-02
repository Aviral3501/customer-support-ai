"use client";
import { PhoneCall } from 'lucide-react';
import React from 'react';

const EditChatbot = ({params:{id}}:{params:{id:string}}) => {
  console.log(id);
  return (
    <div className='px-0 md:p-10'>
        <div className='md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991EE]'>
          <h2 className='text-white text-sm font-bold'>Link to Chat</h2>
          <p className='text-sm italic text-white'>
            Share this link with your customers to start conversations with your chatbot
          </p>
          
        </div>
    </div>
  )
}

export default EditChatbot;
