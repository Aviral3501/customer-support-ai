import { INSERT_MESSAGE } from "@/graphql/mutations/mutations";
import { GET_CHATBOT_BY_ID, GET_MESSAGES_BY_CHAT_SESSION_ID } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { GetChatbotByIdResponse, MessagesByChatSessionIdResponse } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { GoogleGenAI } from "@google/genai";

// ✅ Initialize new Gemini client
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  const { chat_session_id, chatbot_id, content, name } = await req.json();

  try {
    // 1️⃣ Fetch the chatbot characteristics
    const { data } = await serverClient.query<GetChatbotByIdResponse>({
      query: GET_CHATBOT_BY_ID,
      variables: { id: chatbot_id },
    });

    const chatbot = data.chatbots;
    if (!chatbot)
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 });

    // 2️⃣ Fetch previous messages
    const { data: messagesData } = await serverClient.query<MessagesByChatSessionIdResponse>({
      query: GET_MESSAGES_BY_CHAT_SESSION_ID,
      variables: { chat_session_id },
      fetchPolicy: "no-cache",
    });

    const previousMessages = messagesData.chat_sessions.messages;

    // 3️⃣ Format for Gemini
    const formattedPreviousMessages: ChatCompletionMessageParam[] = previousMessages.map((message) => ({
      role: message.sender === "ai" ? "system" : "user",
      name: message.sender === "ai" ? "system" : name,
      content: message.content,
    }));

    // 4️⃣ Combine system prompt
    const systemPrompt = chatbot.chatbot_characteristics.map((c) => c.content).join(" + ");

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        name: "system",
        content: `You are a helpful assistant talking to ${name}.
        Only answer questions relevant to this key information:
        ${systemPrompt}`,
      },
      ...formattedPreviousMessages,
      { role: "user", name, content },
    ];

    const fullPrompt = messages.map((m) => `${m.role === "user" ? name : "AI"}: ${m.content}`).join("\n");

    // 5️⃣ Get the response (✅ new SDK syntax)
    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
      contents: fullPrompt,
    });

    const aiResponse = response.text?.trim();
    // console.log("AII ;;;;;;;;;",aiResponse)

    if (!aiResponse) {
      return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
    }

    // 6️⃣ Save user message
    await serverClient.mutate({
      mutation: INSERT_MESSAGE,
      variables: { chat_session_id, content, sender: "user" },
    });

    // 7️⃣ Save AI message
    const aiMessageResult = await serverClient.mutate({
      mutation: INSERT_MESSAGE,
      variables: { chat_session_id, content: aiResponse, sender: "ai", created_at: new Date().toISOString(), },
    });

    // console.log("AI MESSAGE RESULT ",aiMessageResult)

    // 8️⃣ Return response
    return NextResponse.json({
      id: aiMessageResult.data.insertMessages.id,
      content: aiResponse,
    });
  } catch (error) {
    console.error("❌ Error in /send-message", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}


// const openai = new OpenAI({
//     apiKey:process.env.OPENAI_API_KEY,
// })

// export async function POST(req:NextRequest) {
//     const {chat_session_id , chatbot_id, content, name } = await req.json();

//     console.log(`Revieced message from
//          chat session ${chat_session_id} : ${content} (chatbot : ${chatbot_id}) 
//          by (user ${name}) `);

//     try {
//         // step 1 : fethc the chatbot characteristics
//         const {data } = await serverClient.query<GetChatbotByIdResponse>({
//             query:GET_CHATBOT_BY_ID,
//             variables:{
//                 id:chatbot_id
//             }
//         })
//         const chatbot = data.chatbots;

//         if(!chatbot){
//             return NextResponse.json({error:"Chatbot not found"},{status:404});
//         }

//         //2. fetch the users previous messages from the chat 
//         const {data:messagesData} = await serverClient.query<MessagesByChatSessionIdResponse>({
//             query:GET_MESSAGES_BY_CHAT_SESSION_ID,
//             variables:{
//                 chat_session_id
//             },
//             fetchPolicy:"no-cache"
//         })

//         const prevousMessages =  messagesData.chat_sessions.messages;

//         // 3. put the data in coreect format for the ai service (openai or gemini)

//         const formattedPreviousMessages:ChatCompletionMessageParam[] =
//         prevousMessages.map((message)=>(
//             {
//                 role:message.sender === "ai"?"system":"user",
//                 name:message.sender === "ai"?"system":name,
//                 content:message.content,
//             }
//         ))


//         // 4. combines the system characteristics into a single prompt
//         const systemPrompt = chatbot.chatbot_characteristics.map((c)=>c.content).join(" + ");

//         console.log(systemPrompt);

//         const messages:ChatCompletionMessageParam[] =[
//             {
//                 role:"system",
//                 name:"system",
//                 content:`You are a helpful assistant talkign to ${name}.
//                 If a generic question is asked which is not relevant or in the same scope or domainas the points
//                 in the mentioned key information section, kindly inform the user they are only allowed to search for the specified content
//                 . Use emoji's where possible or required. 
//                 Here is the kay information that you need to be aware of, these are elements you may be asked about:
//                 ${systemPrompt}`
//             },
//             ...formattedPreviousMessages,
//             {
//                 role:"user",
//                 name:name,
//                 content:content
//             },
//         ]


//         // 5 get the response 
//         const response = await openai.chat.completions.create({
//             messages:messages,
//             model:"gpt-3.5-turbo"
//         })

//         const aiResponse =  response?.choices?.[0]?.message?.content?.trim();

//         if(!aiResponse){
//             return NextResponse.json(
//                 {
//                     error:"Faield to generate ai prompt"
//                 },{
//                     status:500
//                 }
//             )
//         }

//         // 6. push into the database

//         await serverClient.mutate({
//             mutation:INSERT_MESSAGE,
//             variables:{
//                 chat_session_id,
//                 content,
//                 sender:"user"
//             }
//         })

//         // 7. save the ai response into the database  

//        const aiMessageResult =  await serverClient.mutate({
//             mutation:INSERT_MESSAGE,
//             variables:{chat_session_id,content:aiResponse,sender:"ai"}
//         })

//         // 8 return the ai repsonse to the user 
//         return NextResponse.json({
//             id:aiMessageResult.data.insertMessages.id,
//             content:aiResponse,
//         })




        
//     } catch (error) {
//         console.error("Error in /send-message ",error);
//         return NextResponse.json({error},{status:500}); 
//     }  


    
// }