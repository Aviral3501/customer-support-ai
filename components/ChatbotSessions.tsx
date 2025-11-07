"use client"
import { Chatbot } from '@/types/types'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Avatar from './Avatar'
import Link from 'next/link'
import ReactTimeago from "react-timeago"
  

  

const ChatbotSessions = ({chatbots} : {chatbots:Chatbot[]}) => {
    const [sortedChatbots,setSortedChatbots] = useState<Chatbot[]>(chatbots);

    // sort the chatbots with the lengths of the sessions
    // more sessiosn at the top
    useEffect(()=>{
        const sortedArray = [...chatbots].sort((a,b,)=> b.chat_sessions.length - a.chat_sessions.length);
        setSortedChatbots(sortedArray);
    },[chatbots])


  return (
    <div className='flex-1'>
        <Accordion 
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        {sortedChatbots.map((chatbot)=>{
            const hasSessions = chatbot.chat_sessions.length>0;
            return(
                <AccordionItem
                key={chatbot.id}
                value={`item-${chatbot.id}`}
                className='px-10 py-5'
                >
                    {hasSessions? (
                        <>
                        <AccordionTrigger>
                            <div className='flex text-left items-center w-full'>
                                <Avatar seed={chatbot.name} className='h-10 w-10 mr-4'/>
                                <div className='flex flex-1 justify-between space-x-4'>
                                    <p>{chatbot.name}</p>
                                    <p className='pr-4 font-bold text-right'>{chatbot.chat_sessions.length} Sessions</p>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className='space-y-6 p-5 bg-gray-100'>
                            {chatbot.chat_sessions.map((session)=>(
                                <Link 
                                href={`/review-sessions/${session.id}`}
                                key={session.id}
                                className={"relative p-10 bg-[#64B5F5] text-white rounded-md block"}
                                >
                                    <p className='text-lg font-bold'>
                                        {session.guests?.name || "Anonymous"}
                                    </p>
                                    <p className='text-sm font-light'>
                                        {session.guests?.email || "No email provided"}
                                    </p>
                                    <p className='absolute top-5 right-5 text-sm'>
                                        <ReactTimeago date={new Date(session.created_at)}/>

                                    </p>

                                </Link>
                            ))}


                        </AccordionContent>

                        </>

                    ) :
                    (
                        <p className="font-light">{chatbot.name} (No Active Sessions) </p>
                    )}

                </AccordionItem>

            )
        })}



        </Accordion>
      
    </div>
  )
}

export default ChatbotSessions



export function AccordionDemo() {
    return (
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Product Information</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Our flagship product combines cutting-edge technology with sleek
              design. Built with premium materials, it offers unparalleled
              performance and reliability.
            </p>
            <p>
              Key features include advanced processing capabilities, and an
              intuitive user interface designed for both beginners and experts.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Shipping Details</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We offer worldwide shipping through trusted courier partners.
              Standard delivery takes 3-5 business days, while express shipping
              ensures delivery within 1-2 business days.
            </p>
            <p>
              All orders are carefully packaged and fully insured. Track your
              shipment in real-time through our dedicated tracking portal.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Return Policy</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We stand behind our products with a comprehensive 30-day return
              policy. If you&apos;re not completely satisfied, simply return the
              item in its original condition.
            </p>
            <p>
              Our hassle-free return process includes free return shipping and
              full refunds processed within 48 hours of receiving the returned
              item.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }