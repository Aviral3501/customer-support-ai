import { serverClient } from "@/lib/server/serverClient";
import { gql } from "@apollo/client";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Change this to your specific domain in production
  "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: NextRequest) {
  try {
    const { query, variables } = await request.json(); // Get the query and variables from frontend

    // console.log("Received query----> ", query);
    // console.log("Received variables----> ", variables);

    // Determine if it's a mutation or query
    const isMutation = query.trim().startsWith("mutation");
    const operation = gql`${query}`; // Construct the GraphQL query/mutation

    // console.log(" isMutations ====== ",isMutation);
    let result;

    if (isMutation) {
      // Handle mutations
      result = await serverClient.mutate({
        mutation: operation,
        variables: variables,
      });
    } else {
      // Handle queries
      result = await serverClient.query({
        query: operation,
        variables: variables,
      });
    }

    const data = result.data;

    return NextResponse.json({ data },{
        headers: corsHeaders,
      }
    );
  } catch (error) {
    // Narrow down 'error' from 'unknown' to 'Error' type to safely access its properties
    if (error instanceof Error) {
      console.error("Error executing query/mutation:", error.message);

      const errorResponse = {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      };

      return NextResponse.json(errorResponse, {
        status: 500,
        headers: corsHeaders,
      });
    }

    // If error is not an instance of Error, handle it generically
    console.error("Unknown error:", error);
    return NextResponse.json({ message: "An unknown error occurred." }, {
      status: 500,
      headers: corsHeaders,
    });
  }
}
