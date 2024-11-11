import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client1 = new ApolloClient({
  uri: "https://graphql-endpoint-1.com/graphql",
  cache: new InMemoryCache(),
});
