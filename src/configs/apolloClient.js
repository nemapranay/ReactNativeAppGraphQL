import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import awsconfig from "./aws-exports"; // Import your AWS config file

const client = new ApolloClient({
    link: new HttpLink({
        uri: awsconfig.aws_appsync_graphqlEndpoint, // Use your endpoint
        headers: {
            "x-api-key": awsconfig.aws_appsync_apiKey, // Use API Key authentication
        },
    }),
    cache: new InMemoryCache(),
});

export default client;
