"use client";
import { REMOVE_CHARACTERISTIC } from '@/graphql/mutations/mutations';
import { ChatbotCharacteristictic} from '@/types/types';
import { useMutation } from '@apollo/client';
import { OctagonX } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

const Characteristic = ({characteristic}:{characteristic:ChatbotCharacteristictic}) => {

    const [removeCharacterictic] = useMutation(REMOVE_CHARACTERISTIC,{
        refetchQueries:['GetChatbotById'],
        // update the ui by refetching
    })

    const handleRemoveCharacteristic = async(characteristicId:number)=>{
        console.log("removing the chracterisitc");
        try {
            await removeCharacterictic({
                variables:{
                    id:characteristic.id,
                    },
            })
            
        } catch (error) {
            console.error(error);
            // toast.error("Faile to removed the characteristic");
        }
    }
  return (
    <li className='relative p-10 bg-white border rounded-md'>
        {characteristic.content}
        <OctagonX className='w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50'
        onClick={()=>{
            console.log(characteristic.id,"removed characterisatic got clicked");
            const promise =handleRemoveCharacteristic(characteristic.id);
            toast.promise(promise,{
                loading:"Removing...",
                success:"Characteristic Removed",
                error:"Failed to remove the characteristic",
            })
        }}/>
    </li>
  )
}

export default Characteristic
