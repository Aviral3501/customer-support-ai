"use client";
import Avatar from '@/components/Avatar';
import Characteristic from '@/components/Characteristic';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BASE_URL } from '@/graphql/apolloClient';
import { DELETE_CHATBOT } from '@/graphql/mutations/mutations';
import { GET_CHATBOT_BY_ID } from '@/graphql/queries/queries';
import { GetChatbotByIdResponse,GetChatbotByIdVariables } from '@/types/types';
import { useMutation, useQuery } from '@apollo/client';
import { Copy } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';


  const EditChatbot = ({ params: { id } }: { params: { id: string } }) => {
    const [url, setUrl] = useState<string>("");
    const [chatbotName, setChatbotName] = useState<string>("");
    const [newCharacteristic, setNewCharacteristic] = useState<string>("");
  
    const [showDialog, setShowDialog] = useState(false);
  
    // query to get the chatbot
    const { data, loading, error } = useQuery<
      GetChatbotByIdResponse,
      GetChatbotByIdVariables
    >(GET_CHATBOT_BY_ID, {
      variables: { id },
    });
  
    // delete the chatbot
    const [deleteChatbot] = useMutation(DELETE_CHATBOT, {
      refetchQueries: ["GetChatbotByID"],
      // refetch the chatbots after deleting
      awaitRefetchQueries: true,
    });
  
    useEffect(() => {
      if (data) {
        setChatbotName(data.chatbots.name);
      }
    }, [data]);
  
    useEffect(() => {
      const url = `${BASE_URL}/chatbot/${id}`;
      setUrl(url);
    }, [id]);
  
  
  
    const handleDeleteChatbot = async () => {
      try {
        const promise = deleteChatbot({ variables: { id } });
        toast.promise(promise, {
          loading: "Deleting...",
          success: "Chatbot deleted",
          error: "Failed to delete chatbot",
        });
        setShowDialog(false);
      } catch (error) {
        console.error("Error in deleting the chatbot", error);
      }
    };
    
  
    if (loading) {
      return (
        <div className="mx-auto animate-spin p-10">
          <Avatar seed="" />
        </div>
      );
    }
  
    if (error) return <p>Error : {error.message}</p>;
    if (!data?.chatbots) return redirect("/view-chatbots");
  
    return (
      <div className="px-5 md:p-10">
        <div className="md:sticky md:top-0 z-50 sm:max-w-sm  ml-auto space-y-2 md:border p-5 rounded-b-lg shadow-2xl md:rounded-lg bg-[#4ca2ee]">
          <h2 className="text-white text-sm font-bold">Link to Chat</h2>
          <p className="text-sm italic text-white">
            Share this link with your customers to start conversations with your
            chatbot
          </p>
          <div className="flex gap-x-2 items-center justify-center">
            <Link
              href={url}
              target="_blank"
              className="w-full cursor-pointer hover:opacity-50"
            >
              <Input value={url} readOnly className="cursor-pointer" />
            </Link>
            <Button
              size={"sm"}
              className="px-3"
              onClick={() => {
                navigator.clipboard.writeText(url); //copy to the clipboard
                toast.success("Copied to clipboard");
              }}
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <section className=" relative mt-5 bg-white p-5 md:p-10 rounded-lg mb-5  ">
          {/* the charactertics of the chatbot */}
  
          {/* delete chatbot button */}
          <Button
            variant={"destructive"}
            className="absolute top-2 right-2 h-8 w-2"
            onClick={() => setShowDialog(true)} // open dialog
          >
            X
          </Button>
  
          <div className="flex space-x-4 mt-5">
            <Avatar seed={chatbotName} className="h-[90px] w-[90px]" />
            <form
              // onSubmit={handleUpdateChatbot}
              className="flex flex-1 space-x-2 items-center"
            >
              <Input
                placeholder={chatbotName}
                value={chatbotName}
                onChange={(e) => setChatbotName(e.target.value)}
                className="w-full border-none bg-transparent text-xl font-bold"
              />
              <Button type="submit" disabled={!chatbotName} className="">
                Update
              </Button>
            </form>
          </div>
  
          <h2 className="text-xl font-bold mt-10">
            {"Here's what your AI knows..."}
          </h2>
          <p className="text-lg">
            Your chatbot is equipped with the following information to assist you
            in your conversations with your customers & users.
          </p>
  
          {/* CHARACTERCITCS OF THE CHATBOT - ITS KNOWLEDGHEBASE */}
  
          <div>
            <form
              className="mt-2 flex flex-1 justify-center gap-x-2"
              // onSubmit={}
            >
              <Input
                type="text"
                placeholder="Example: Customer ask for prices, provide pricing: www.example.com/pricing"
                value={newCharacteristic}
                onChange={(e) => setNewCharacteristic(e.target.value)}
                className=""
              />
              <Button type="submit" disabled={!newCharacteristic} className="">
                Add
              </Button>
            </form>
  
            <ul className="flex flex-wrap-reverse gap-5">
              {data?.chatbots?.chatbot_characteristics?.map((charactersitic) => (
                <Characteristic
                  key={charactersitic.id}
                  characteristic={charactersitic}
                />
              ))}
            </ul>
          </div>
        </section>
  
        {showDialog && (
          <ConfirmationDialog
            objectName="Chatbot"
            name={chatbotName}
            onConfirm={handleDeleteChatbot}
            onCancel={() => setShowDialog(false)}
          />
        )}
      </div>
    );
  };
  
  export default EditChatbot;
  

  // const EditChatbot = ({params:{id}}:{params:{id:string}}) => {
//   const [url,setUrl] = useState<string>("");
//   const [chatbotName,setChatbotName] = useState<string>("");
//   const [newCharacteristic,setNewCharacteristic]=useState<string>("");

//     // query to get the chatbot
//     const {data,loading,error} = useQuery<GetChatbotByIdResponse,GetChatbotByIdVariables>(
//       GET_CHATBOT_BY_ID,{
//         variables:{id}
//     })

//   // delete the chatbot
//   const [deleteChatbot] = useMutation(DELETE_CHATBOT,{
//     refetchQueries:["GetChatbotByID"],
//     // refetch the chatbots after deleting
//     awaitRefetchQueries:true,
//   })


//     useEffect(()=>{
//       if(data){
//         setChatbotName(data.chatbots.name);
//       }

//     },[data])

//   useEffect(()=>{
//     const url = `${BASE_URL}/chatbot/${id}`;
//     setUrl(url);
//   },[id])

//   const handleDelete = async (id: string) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this chatbot?");
//     if (!isConfirmed) return;
  
//     try {
//       const promise = deleteChatbot({
//         variables: {
//           id: Number(id), // ✅ convert to number
//         },
//       });
  
//       toast.promise(promise, {
//         loading: "Deleting...",
//         success: "Chatbot deleted",
//         error: "Failed to delete chatbot",
//       });
//     } catch (error) {
//       console.error("Error deleting chatbot:", error);
//     }
//   };
  


//   if(loading){
//     return(
//       <div className='mx-auto animate-spin p-10'>
//         <Avatar seed="support agent"/>
//       </div> 
//     )
//   }


//   if(error) return <p>Error: {error.message}</p>
//   if(!data?.chatbots) return redirect("/view-chatbots");



//   console.log(id);
//   return (
//     <div className='px-5 md:p-10'>
//         <div className='md:sticky md:top-0 z-50 sm:max-w-sm  ml-auto space-y-2 md:border p-5 rounded-b-lg shadow-2xl md:rounded-lg bg-[#4ca2ee]'>
//           <h2 className='text-white text-sm font-bold'>Link to Chat</h2>
//           <p className='text-sm italic text-white'>
//             Share this link with your customers to start conversations with your chatbot
//           </p>
//           <div className='flex gap-x-2 items-center justify-center'>
//             <Link href={url} target='_blank' className='w-full cursor-pointer hover:opacity-50'>
//             <Input value={url} readOnly className='cursor-pointer'/>
//             </Link>
//             <Button
//             size={"sm"}
//             className='px-3'
//             onClick={()=>{
//               navigator.clipboard.writeText(url);
//               toast.success("Copied to clipboard");
//             }}
//             >
//               <span className='sr-only'>Copy</span>
//               <Copy className="h-4 w-4"/>
//             </Button>
//           </div>
//         </div>
//         <section className=' relative mt-5 bg-white p-5 md:p-10 rounded-lg mb-5  '>
//           <Button
//           variant={"destructive"}
//           className='absolute top-2 right-2 h-8 w-2'
//           onClick = {()=>handleDelete(id)} 
//           >
//             X
//           </Button>
//         <div className='flex space-x-4 mt-5'>
//         <Avatar seed={chatbotName} className='h-[90px] w-[90px]'/>
//           <form
//           // onSubmit={handleUpdateChatbot}
//           className='flex flex-1 space-x-2 items-center'
//           >
//             <Input placeholder={chatbotName} value={chatbotName} onChange={(e)=>setChatbotName(e.target.value)} className='w-full border-none bg-transparent text-xl font-bold'/>
//             <Button type="submit" disabled={!chatbotName} className=''>
//               Update
//             </Button>
//           </form>
//         </div>

//         <h2 className='text-xl font-bold mt-10'>
//           {"Here's what your AI knows..."}
//           </h2>
//           <p className='text-lg'>
//             Your chatbot is equipped with the following information to assist you in
//             your conversations with your customers & users.
//           </p>

//           <div>
//             <form className='mt-2 flex flex-1 justify-center gap-x-2' 
//             // onSubmit={}
//             >
//               <Input
//               type='text'
//               placeholder='Example: Customer ask for prices, provide pricing: www.example.com/pricing' 
//               value={newCharacteristic}
//               onChange={(e)=>setNewCharacteristic(e.target.value)}
//               className=''/>
//               <Button 
//               type='submit'
//                disabled={!newCharacteristic}
//                className=''
//                >Add
//                </Button>
//             </form>

//             <ul className='flex flex-wrap-reverse gap-5'>
//               {/* {console.log(data?.chatbots?.chatbot_characteristics)as any} */}

//               {/* maaping throught the characteristics for the chatbot  */}
//               {data?.chatbots?.chatbot_characteristics?.map((charactersitic)=>(

//                <Characteristic
//                 key={charactersitic.id}
//                 characteristic={charactersitic}
//                 />
//               ))}

//             </ul>
//           </div>
//         </section>
       
//     </div>
//   )
// }

// export default EditChatbot;









  // const handleDelete = async (id: string) => {
  //   // Ask user to type the chatbot name for confirmation
  //   const userInput = window.prompt(
  //     `⚠️ To confirm deletion, please type the chatbot name: "${chatbotName}"`,
  //     ""
  //   );
  
  //   // If user canceled or typed wrong name
  //   if (userInput !== chatbotName) {
  //     window.alert("Chatbot name did not match. Deletion canceled.");
  //     return;
  //   }
  
  //   // If confirmed and correct name
  //   try {
  //     const promise = deleteChatbot({ variables: { id } });
  //     toast.promise(promise, {
  //       loading: "Deleting...",
  //       success: "Chatbot deleted successfully.",
  //       error: "Failed to delete chatbot.",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     console.error("Error in deleting the chatbot");
  //   }
  // };


