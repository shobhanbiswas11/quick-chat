import { createBrowserRouter } from "react-router-dom";
import App from "./routes/App";
import ChatRoom from "./routes/chat-room";
import ChatRoomWithUser from "./routes/chat-room-with-user";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat-room/:chatRoomId",
    element: <ChatRoom />,
  },
  {
    path: "/chat-room/:chatRoomId/:userId",
    element: <ChatRoomWithUser />,
  },
]);
