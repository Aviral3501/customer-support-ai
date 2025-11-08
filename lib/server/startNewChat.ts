import client from "@/graphql/apolloClient";
import { INSERT_CHAT_SESSION, INSERT_GUEST, INSERT_MESSAGE } from "@/graphql/mutations/mutations";
import { gql } from "@apollo/client";

async  function startNewChat(
    guestName:string,
    guestEmail:string,
    chatbotId:number
) {
    try {
        // 1 createa new guest query
        const guestResult = await client.mutate({
            mutation:INSERT_GUEST,
            variables:{ name:guestName,email:guestEmail}
        });

        const guestId = guestResult.data.insertGuests.id;

        //2  create a new chat session

        const chatSessionResult = await client.mutate({
            mutation:INSERT_CHAT_SESSION,
            variables:{chatbot_id:chatbotId,guest_id:guestId}
        });

        const chatSessionId= chatSessionResult.data.insertChat_sessions.id;

        // Insert initial message here 

        await client.mutate({
            mutation:INSERT_MESSAGE,
            variables:{
                chat_session_id:chatSessionId,
                sender:"ai",
                content:`Welcome ${guestName}! \n How can i assist you today?`
            }
        })


        console.log("New chat session started successfully");
        return chatSessionId;
        
    } catch (error) {
        console.error("Error starting new chat session:",error);
    }

}

export default startNewChat;