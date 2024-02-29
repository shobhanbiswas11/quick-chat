import { a, defineData, type ClientSchema } from "@aws-amplify/backend";
const schema = a
  .schema({
    ChatRoom: a.model({
      chats: a.hasMany("Chat"),
    }),
    Chat: a.model({
      chatRoom: a.belongsTo("ChatRoom"),
      content: a.string().required(),
      sender: a.string(),
    }),
  })
  .authorization([a.allow.public()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 360,
    },
  },
});
