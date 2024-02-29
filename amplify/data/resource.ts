import { a, defineData, type ClientSchema } from "@aws-amplify/backend";
const schema = a
  .schema({
    ChatRoom: a.model({
      chats: a.hasMany("Chat"),
      ttl: a.timestamp().required(),
    }),
    Chat: a.model({
      chatRoom: a.belongsTo("ChatRoom"),
      content: a.string().required(),
      sender: a.string(),
      ttl: a.timestamp().required(),
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
