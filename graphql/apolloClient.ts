import {ApolloClient,DefaultOptions,InMemoryCache,createHttpLink} from "@apollo/client";


// base url in  dev mode and production mode
export const BASE_URL = process.env.NODE_ENV !== "development" ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`:"http://localhost:3000";

// create http link
const httpLink = createHttpLink({
    uri: `${BASE_URL}/graphql`, //point to the new api route
});

// disable the caching in apollo client
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  mutate: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

// create apollo client
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});

export default client;