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
import {
  GetChatbotByIdResponse,
  GetChatbotByIdVariables,
  Message,
  MessagesByChatSessionIdResponse,
  MessagesByChatSessionIdVariables,
} from "@/types/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import startNewChat from "@/lib/server/startNewChat";
import Avatar from "@/components/Avatar";
import { useQuery } from "@apollo/client";
import {
  GET_CHATBOT_BY_ID,
  GET_MESSAGES_BY_CHAT_SESSION_ID,
} from "@/graphql/queries/queries";
import Messages from "@/components/Messages";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import FAQSuggestions from "@/components/FAQSuggestions";
import { toast } from "sonner";


const formSchema = z.object({
    message: z.string().min(2,"Your message is too short!"),
})

const ChatbotPage = ({ params: { id } }: { params: { id: string } }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [chatId, setChatId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [suggestedQuestions,setSuggestedQuestions] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
        message:"",
    }
  })

  //   get the chatbot data
  const { data: chatbotData } = useQuery<
    GetChatbotByIdResponse,
    GetChatbotByIdVariables
  >(GET_CHATBOT_BY_ID, {
    variables: { id },
  });

  //   get the messages by chatbot_sessiosn_id

  const {
    loading: loadingQuery,
    error,
    data,
  } = useQuery<
    MessagesByChatSessionIdResponse,
    MessagesByChatSessionIdVariables
  >(GET_MESSAGES_BY_CHAT_SESSION_ID, {
    variables: {
      chat_session_id: chatId,
    },
    skip: !chatId,
  });

  useEffect(() => {
    if (data) {
      setMessages(data.chat_sessions.messages);
    }
  }, [data]);

  const handleInformatoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // console.log(1);
    const chatId = await startNewChat(name, email, Number(id));
    // console.log("2")
    setChatId(chatId);
    setLoading(false);
    setIsOpen(false);
  };

  useEffect(()=>{
    if(suggestedQuestions && suggestedQuestions.length>0){
        console.log(suggestedQuestions);
    }
  },[suggestedQuestions])

//   onsubmit function for the messages
async function onSubmit( values : z.infer<typeof formSchema>){
    setLoading(true);
    const {message : formMessage} = values;
    const message = formMessage;
    form.reset();
    setSuggestedQuestions([]);

    if(!name||!email){
        // fill the details in the modal
        setIsOpen(true);
        setLoading(false);
        return;
    }

    if(!message.trim()){
        return; //do not submit if the message is empty
    }

    // optmistically update the ui with the user's message

    const  userMessage:Message = {
        id:Date.now(),
        content:message,
        created_at:new Date().toISOString(),
        chat_session_id:chatId,
        sender:"user"
    }


    // immediately fake a message - thinking...
    
    const loadingMessage :Message ={
        id:Date.now()+1,
        content:"Thinking...",
        created_at:new Date().toISOString(),
        chat_session_id:chatId,
        sender:"ai"
    }

    setMessages((prevMessages)=>[
        ...prevMessages,
        userMessage,
        loadingMessage,
    ])

    // make the api call

    try {

        const response = await fetch("/api/send-message",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                name:name,
                chat_session_id:chatId,
                chatbot_id:id,
                content:message,
            }),
        });

        const result =  await response.json();
        console.log("this is result :",result);

        // 🚫 DAILY LIMIT HIT (429 from backend)
        if (response.status === 429) {

            toast.error("Free daily limit reached", {
                description: result.error || "You have used all free messages. Please upgrade your plan.",
                duration: 5000,
            });

            // remove the fake "Thinking..." AI message
            setMessages((prevMessages)=>
                prevMessages.filter((msg)=>msg.id !== loadingMessage.id)
            );

            setLoading(false);
            return;
        }

        // ✅ Normal success flow

        // update the ui
        // update thepreviosuly loading message with the response from AI
        setMessages((prevMessages)=>
        prevMessages.map((msg)=>
        msg.id === loadingMessage.id ? {...msg,content:result.content,id:result.id}:msg))

        if (result.suggestions && result.suggestions.length > 0) {
            setSuggestedQuestions(result.suggestions);
          }

        //   console.log(suggestedQuestions)
          

    } catch (error) {
        console.error("Error in sendin the message:",error)
        
    }

}

  return (
    <div className="w-full flex bg-gray-100">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[350px] sm:min-w-[425px]">
          <form onSubmit={handleInformatoinSubmit}>
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
              <Button type="submit" disabled={!name || !email || loading}>
                {!loading ? "Continue" : "Loading..."}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* the chatbot ui here  */}

      <div className="flex flex-col min-h-screen w-full max-w-3xl mx-auto bg-white md:rounded-l-lg shadow-2xl md:mt-10">
        <div className="pb-4 border-b sticky top-0 z-50 bg-[#4D7DFB] py-5 px-10 text-white md:rounded-t-lg flex  items-center space-x-4">
          <Avatar
            seed={chatbotData?.chatbots.name as string}
            className="h-12 w-12 bg-white rounded-full border-2 border-white"
          />

          <div>
            <h1 className="truncate text-lg">{chatbotData?.chatbots.name}</h1>
            <p className="text-sm text-gray-300">Typically Replies Instantly</p>
          </div>
        </div>

        {/* All the messages  */}

        {/* ✅ Messages section — fills available space */}
        <div className="flex-1 overflow-y-auto">
          <Messages
            messages={messages}
            chatbotName={chatbotData?.chatbots.name!}
          />
        </div>

        <FAQSuggestions
          questions={suggestedQuestions}
          onSelect={(q) => {
            setSuggestedQuestions([]); // 🧹 clear old suggestions
            form.setValue("message", q);
            form.handleSubmit(onSubmit)(); // send it automatically
          }}
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-start sticky bottom-0 z-50 space-x-4 p-5 h-[5.5rem] bg-gray-100 rounded-md"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>Message</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type a message..."
                      {...field}
                      className="p-5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              className="h-full flex w-24 items-center justify-center"
            >
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChatbotPage;
