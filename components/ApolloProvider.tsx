"use client";

import client from "@/graphql/apolloClient"; //apollo client
import { ApolloProvider } from "@apollo/client";

const ApolloProviderWrapper = ({children}:{children:React.ReactNode})=>{
    return(
        <ApolloProvider client={client}>{children}</ApolloProvider>
    )
}

export default ApolloProviderWrapper;