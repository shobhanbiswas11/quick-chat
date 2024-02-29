import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ChatRoom() {
  const navigate = useNavigate();
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const [name, setName] = useState("");
  function enterIntoChatRoom() {
    navigate(`/chat-room/${chatRoomId}/${name}`);
  }

  return (
    <div className="container mt-20 max-w-screen-md">
      <Card>
        <CardHeader>Enter into Chat Room</CardHeader>
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
              onClick={enterIntoChatRoom}
            >
              Enter
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
