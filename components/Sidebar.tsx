"use client";

import { BotMessageSquare, PencilLine, SearchIcon } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="bg-white text-gray-800 p-5">
      <ul className="flex gap-4 justify-around flex-row lg:flex-col">
        <li className="flex-1">
          <Link
            href={'/create-chatbot'}
            className=" bg-blue-500/80 hover:bg-blue-500 text-white text-center py-3 px-4 rounded-md flex gap-2 justify-center items-center"
          >
              <BotMessageSquare className="h-6 w-6 lg:h-8 lg:w-8"/>
              <div className=" md:flex md:flex-col items-start">
                <p className="text-lg md:text-xl">Create Chatbot</p>
                <p className="hidden md:inline text-sm ml-1"> New Chatbot</p>
            </div>
          </Link>
        
        </li>
        <li className="flex-1">
          <Link
            href={'/view-chatbots'}
            className=" bg-blue-500/80 hover:bg-blue-500 text-white text-center py-3 px-4 rounded-md flex justify-center items-center gap-2"
          >
            <PencilLine className="h-6 w-6 lg:h-8 lg:w-8"/>
           
            <div className="md:flex md:flex-col items-start ">
                <p className="text-lg md:text-xl"> View Chatbots</p>
                <p className="hidden md:inline text-sm ml-1">Edit Chatbots</p>
            </div>
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href={'/review-session'}
            className=" bg-blue-500/80 hover:bg-blue-500 text-white text-center py-3 px-4 rounded-md flex justify-center items-center gap-2"
          >
            
            <SearchIcon className="h-6 w-6 lg:h-8 lg:w-8"/>
            <div className="md:flex md:flex-col items-start">
                <p className="text-lg md:text-xl">View Sessions</p>
                <p className="hidden md:inline text-sm ml-1">Sessions</p>
            </div>

          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
