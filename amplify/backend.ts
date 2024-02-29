import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";

const backend = defineBackend({
  data,
});

backend.data.resources.amplifyDynamoDbTables["ChatRoom"].timeToLiveAttribute = {
  attributeName: "ttl",
  enabled: true,
};
backend.data.resources.amplifyDynamoDbTables["Chat"].timeToLiveAttribute = {
  attributeName: "ttl",
  enabled: true,
};
