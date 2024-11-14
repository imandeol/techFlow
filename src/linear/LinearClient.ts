import { LinearClient } from "@linear/sdk";
import { configs } from "../../config";

const linearClient = new LinearClient({
  apiKey: configs.linearApiKey,
});

export default linearClient;
