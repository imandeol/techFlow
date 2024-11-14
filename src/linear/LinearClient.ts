import { LinearClient } from "@linear/sdk";
// @ts-ignore
import { configs } from "../../config";

const linearClient = new LinearClient({
  apiKey: configs.linearApiKey,
});

export default linearClient;
