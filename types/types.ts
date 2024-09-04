export interface Chatbot{
    id:number;
    clerk_user_id:string;
    name:string;
    created_at:string;
    chatbot_characteristics: ChatbotCharacteristictics[];
    chat_sessions:ChatSession[];
}

export interface ChatbotCharacteristictics{
    id:number;
    chatbot_id:string;
    content:string;
    created_at:string;
}

export interface Guest{
    id:number;
    name:string;
    email:string;
    created_at:string;
}

export interface ChatSession{
    id:number;
    chatbot_id:number;
    guest_id:number|null;
    created_at:string;
    messages:Message[];
    guests:Guest;
}

export interface Message{
    id:number;
    chat_session_id:number;
    content:string;
    created_at:string;
    sender:"ai"|"user";
}