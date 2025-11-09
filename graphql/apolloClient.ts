import {ApolloClient,DefaultOptions,InMemoryCache,createHttpLink} from "@apollo/client";
// Client side ApolloClient


// base url in  dev mode and production mode
export const BASE_URL = process.env.NODE_ENV !== "development" ? 
`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`:"http://localhost:3000";

// create http link (this is being done to avoid exposing keys on the server, hence we are setting up a proxy)
// basicallyl we are giving an instructiosn and th eappolo client on the server side autheticates 
// and we avoid using the proxy
const httpLink = createHttpLink({
    uri: `${BASE_URL}/api/graphql`, 
    fetchOptions:{
      mode:"cors"
    }
});

// disable the caching in apollo client (client side)
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