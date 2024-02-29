import { client } from "@/lib/amplify-client";
import { Divider } from "@nextui-org/react";
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
    <div className="md:container md:max-w-screen-md mt-10">
      <div className="px-2 md:px-0">
        <p className="text-medium">
          Share this link to add people to this chat room
        </p>
        <h1 className="text-lg text-blue-500 mt-2">{`${window.location.origin}/chat-room/${chatRoomId}`}</h1>
        <Divider className="mb-10 mt-4" />
      </div>

      <ChatGui
        chats={query.data
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((c) => ({
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
            ttl: Math.floor(Date.now() / 1000) + 60 * 60,
          });
        }}
      />
    </div>
  );
}
