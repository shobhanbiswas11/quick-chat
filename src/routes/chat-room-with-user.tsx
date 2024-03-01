import * as api from "@/lib/api";
import { Divider } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      if (!chatRoomId) throw new Error("Chat Room not found");
      const res = await api.getChatsByChatRoom(chatRoomId);
      return res.data.chatsByChatRoomIdAndTimeStamp.items;
    },
  });
  const createChatMutation = useMutation({
    mutationFn: api.createChat,
  });

  useEffect(() => {
    if (!chatRoomId) return;

    const subs = api.onChatCreate(chatRoomId).subscribe((next) => {
      queryClient.setQueryData(["chats", chatRoomId], (old: any[]) => {
        const newChat: (typeof old)[number] = next.data.onCreateChat;
        return [...old, newChat];
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
            content: c.message,
            id: c.id,
            sender: c.from || undefined,
            direction: c.from === userId ? "outgoing" : "incoming",
          }))}
        onNewMessage={async (message) => {
          if (!chatRoomId || !userId) return;

          createChatMutation.mutate({
            chatRoomId,
            message,
            timeStamp: Date.now(),
            ttl: Math.floor(Date.now() / 1000) + 60 * 10,
            from: userId,
          });
        }}
      />
    </div>
  );
}
