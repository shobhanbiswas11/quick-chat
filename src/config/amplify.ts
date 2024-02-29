import { Amplify } from "aws-amplify";
import amplifyconfig from "../../amplifyconfiguration.json";

export const configure = () => {
  Amplify.configure(amplifyconfig);
};
