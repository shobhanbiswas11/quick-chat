import { Amplify } from "aws-amplify";
import amplifyconfig from "../amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

export const configure = () => {
  Amplify.configure(amplifyconfig);
};
