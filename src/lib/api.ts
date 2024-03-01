import { CreateChatInput, CreateChatRoomInput } from "@/API";
import {
  createChat as createChatMutation,
  createChatRoom as createChatRoomMutation,
} from "@/graphql/mutations";
import { chatsByChatRoomIdAndTimeStamp } from "@/graphql/queries";
import { onCreateChat } from "@/graphql/subscriptions";

import { client } from "./amplify-client";

export function createChatRoom(input: CreateChatRoomInput) {
  return client.graphql({
    query: createChatRoomMutation,
    variables: {
      input,
    },
  });
}

export function createChat(input: CreateChatInput) {
  return client.graphql({
    query: createChatMutation,
    variables: {
      input,
    },
  });
}

export function getChatsByChatRoom(chatRoomId: string) {
  return client.graphql({
    query: chatsByChatRoomIdAndTimeStamp,
    variables: {
      chatRoomId,
    },
  });
}

export function onChatCreate(chatRoomId: string) {
  return client.graphql({
    query: onCreateChat,
    variables: {
      filter: {
        chatRoomId: {
          eq: chatRoomId,
        },
      },
    },
  });
}
