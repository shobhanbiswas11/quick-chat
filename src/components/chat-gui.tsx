import {
  ChatContainer,
  Message,
  MessageInput,
  MessageList,
  MessageModel,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

interface Chat {
  id: string;
  content: string;
  sender?: string;
  optimistic?: boolean;
  direction: MessageModel["direction"];
}

interface Props {
  chats: Chat[];
  onNewMessage?: (message: string) => void;
}

export default function ChatGui({ chats, onNewMessage }: Props) {
  return (
    <ChatContainer className="p-1 border-1 border-neutral-300">
      <MessageList>
        {chats.map((chat, i) => {
          const previousChat: Chat | undefined = chats[i - 1];
          const nextChat: Chat | undefined = chats[i + 1];

          const isFirstMessage =
            previousChat?.sender !== chat.sender &&
            nextChat?.sender === chat.sender;
          const isLastMessage =
            previousChat?.sender === chat.sender &&
            nextChat?.sender !== chat.sender;
          const isNormalMessage =
            previousChat?.sender === chat.sender &&
            nextChat?.sender === chat.sender;

          let position: MessageModel["position"] = "single";
          if (isFirstMessage) position = "first";
          if (isLastMessage) position = "last";
          if (isNormalMessage) position = "normal";

          const model: MessageModel = {
            direction: chat.direction,
            position,
            message: chat.content,
            sender: chat.sender,
          };

          if (isFirstMessage) {
            return (
              <Message model={model} key={chat.id}>
                <Message.Header sender={chat.sender} />
              </Message>
            );
          }
          if (isNormalMessage) {
            <Message model={model} key={chat.id} />;
          }
          if (isLastMessage) {
            <Message model={model} key={chat.id} />;
          }

          return (
            <Message model={model} key={chat.id}>
              <Message.Header sender={chat.sender} />
            </Message>
          );
        })}
      </MessageList>
      <MessageInput
        attachButton={false}
        placeholder="Type message here"
        onSend={onNewMessage}
        style={{
          fontSize: 18,
        }}
      />
    </ChatContainer>
  );
}
