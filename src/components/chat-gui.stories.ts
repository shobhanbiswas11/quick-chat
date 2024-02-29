import type { Meta, StoryObj } from "@storybook/react";
import ChatGui from "./chat-gui";

const meta = {
  title: "Chat GUI",
  component: ChatGui,
  argTypes: {
    chats: [],
  },
} satisfies Meta<typeof ChatGui>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    chats: [],
  },
};
