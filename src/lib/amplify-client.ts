import { generateClient } from "aws-amplify/api";
import { Schema } from "../../amplify/data/resource";
export type { Schema };

export const client = generateClient<Schema>();
