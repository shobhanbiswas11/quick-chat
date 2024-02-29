import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../lib/amplify-client";

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const createChatRoomMutation = useMutation({
    mutationFn: async () => {
      const { data: chatRoom } = await client.models.ChatRoom.create({
        ttl: Math.floor(Date.now() / 1000) + 60 * 60,
      });
      return chatRoom;
    },
    onSuccess(data) {
      navigate(`/chat-room/${data.id}/${name}`);
    },
    onError(e) {
      console.log(e);
    },
  });

  return (
    <div className="container mt-20 max-w-screen-md">
      <Card>
        <CardHeader>Create a chat room</CardHeader>
        <CardBody>
          <form className="space-y-4">
            <Input
              name="name"
              placeholder="Enter your name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button
              color="primary"
              isDisabled={!name}
              onClick={() => {
                createChatRoomMutation.mutate();
              }}
            >
              Create
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
