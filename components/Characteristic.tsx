"use client";
import { REMOVE_CHARACTERISTIC } from '@/graphql/mutations/mutations';
import { ChatbotCharacteristictic} from '@/types/types';
import { useMutation } from '@apollo/client';
import { OctagonX } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import AlertDialog from './AlertDialog';

const Characteristic = ({characteristic}:{characteristic:ChatbotCharacteristictic}) => {

    const [showDialog, setShowDialog] = useState(false); 

    const [removeCharacterictic] = useMutation(REMOVE_CHARACTERISTIC,{
        refetchQueries:['GetChatbotById'],
        // update the ui by refetching
        awaitRefetchQueries:true,
    })



    const handleRemoveCharacteristic = async (characteristicId: number) => {
        console.log("removing the chracterisitc");
        try {
          const promise = removeCharacterictic({
            variables: { characteristicId:characteristicId },
          });
    
          toast.promise(promise, {
            loading: "Removing...",
            success: "Characteristic removed",
            error: "Failed to remove the characteristic",
          });
    
          setShowDialog(false); // close dialog after confirming
        } catch (error) {
          console.error(error);
        }
      };


  return (
    <li
    key={characteristic.id} 
    className="relative px-10 py-6 bg-white border rounded-md">
      {characteristic.content}


      <OctagonX
        className="w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50"
        onClick={() => setShowDialog(true)} 
      />

      {showDialog && (
        <AlertDialog
          message={`Are you sure you want to remove this characteristic? This action cannot be undone.`}
          confirmLabel="Remove"
          cancelLabel="Cancel"
          onConfirm={() => handleRemoveCharacteristic(characteristic.id)}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </li>
  );
}

export default Characteristic







// const Characteristic = ({characteristic}:{characteristic:ChatbotCharacteristictic}) => {

//     const [removeCharacterictic] = useMutation(REMOVE_CHARACTERISTIC,{
//         refetchQueries:['GetChatbotById'],
//         // update the ui by refetching
//         // awaitRefetchQueries:true
//     })

//     const handleRemoveCharacteristic = async(characteristicId:number)=>{
//         console.log("removing the chracterisitc with id ",characteristicId);
//         try {
//             await removeCharacterictic({
//                 variables:{
//                     characteristicId:characteristicId,
//                     },
//             })
            
//         } catch (error) {
//             console.error(error);
//             // toast.error("Faile to removed the characteristic");
//         }
//     }
//   return (
//          <li className='relative p-10 bg-white border rounded-md'>
//         {characteristic.content}
//         {/* {console.log(characteristic)as any} */}
//         <OctagonX className='w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50'
//         onClick={()=>{
//             // console.log(characteristic.id,"removed characterisatic got clicked");
//             const promise =handleRemoveCharacteristic(characteristic.id);
//             toast.promise(promise,{
//                 loading:"Removing...",
//                 success:"Characteristic Removed",
//                 error:"Failed to remove the characteristic",
//             })
//         }}/>
//     </li>
   
//   )
// }

// export default Characteristic
