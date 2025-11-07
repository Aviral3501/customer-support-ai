import { gql } from "@apollo/client";

// GraphQL mutation to create a new chatbot
export const CREATE_CHATBOT = gql`
  mutation CreateChatbot($clerk_user_id: String!, $name: String!,$created_at: DateTime!) {
    insertChatbots(clerk_user_id: $clerk_user_id, name: $name,created_at: $created_at) {
      id
      name
    }
  }`;

export const REMOVE_CHARACTERISTIC = gql`
mutation RemoveCharacteristic($characteristicId:Int!){
  deleteChatbot_characteristics(id:$characteristicId){
    id
    #Add other fields to return after removal
  }
}`;

export const DELETE_CHATBOT = gql`
mutation DeleteChatbot($id:Int!){
  deleteChatbots(id:$id){
    id
    # only id will be the response
  }
}`;


export const ADD_CHARACTERISTIC = gql`
mutation AddCharacteristic($chatbotId:Int!,$content:String!,$created_at:DateTime!){
  insertChatbot_characteristics(
    chatbot_id:$chatbotId,
    content:$content,
    created_at:$created_at
  ){
    id
    content
    created_at
  }
}`;
