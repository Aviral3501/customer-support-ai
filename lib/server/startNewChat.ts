import client from "@/graphql/apolloClient";
import {
  INSERT_CHAT_SESSION,
  INSERT_GUEST,
  INSERT_MESSAGE,
} from "@/graphql/mutations/mutations";

async function startNewChat(
  guestName: string,
  guestEmail: string,
  chatbotId: number
) {
  try {
    // 🧠 Step 1: Create a new guest
    const guestResult = await client.mutate({
      mutation: INSERT_GUEST,
      variables: {
        name: guestName,
        email: guestEmail,
        created_at: new Date().toISOString(), // ✅ fix here
      },
    });

    const guestId = guestResult.data.insertGuests.id;

    // 🧠 Step 2: Create a new chat session
    const chatSessionResult = await client.mutate({
      mutation: INSERT_CHAT_SESSION,
      variables: {
        chatbot_id: chatbotId,
        guest_id: guestId,
        created_at: new Date().toISOString(), // ✅ add this too (same issue)
      },
    });

    const chatSessionId = chatSessionResult.data.insertChat_sessions.id;

    // 🧠 Step 3: Insert initial welcome message
    await client.mutate({
      mutation: INSERT_MESSAGE,
      variables: {
        chat_session_id: chatSessionId,
        sender: "ai",
        content: `Welcome ${guestName}! \nHow can I assist you today?`,
        created_at: new Date().toISOString(), // ✅ most likely required here too
      },
    });

    console.log("✅ New chat session started successfully");
    return chatSessionId;
  } catch (error) {
    console.error("❌ Error starting new chat session:", error);
  }
}

export default startNewChat;
