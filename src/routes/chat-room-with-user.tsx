import { client } from "@/lib/amplify-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatGui from "../components/chat-gui";

export default function ChatRoomWithUser() {
  const { chatRoomId, userId } = useParams<{
    chatRoomId: string;
    userId: string;
  }>();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["chats", chatRoomId],
    queryFn: async () => {
      if (!chatRoomId) return [];
      const res = await client.models.ChatRoom.get({
        id: chatRoomId,
      });
      return (await res.data.chats()).data;
    },
  });

  useEffect(() => {
    if (!chatRoomId || !userId) return;

    const subs = client.models.Chat.onCreate({
      filter: {
        chatRoomChatsId: {
          eq: chatRoomId,
        },
      },
    }).subscribe((next) => {
      queryClient.setQueryData(["chats", chatRoomId], (old: any[]) => {
        return [...old, next];
      });
    });

    return () => {
      subs.unsubscribe();
    };
  }, [chatRoomId, queryClient]);

  if (!query.data) return null;

  return (
    <div className="container max-w-screen-md mt-20">
      <ChatGui
        chats={query.data.map((c) => ({
          content: c.content,
          id: c.id,
          sender: c.sender || undefined,
          direction: c.sender === userId ? "outgoing" : "incoming",
        }))}
        onNewMessage={async (message) => {
          await client.models.Chat.create({
            content: message,
            chatRoomChatsId: chatRoomId,
            sender: userId,
          });
        }}
      />
    </div>
  );
}
