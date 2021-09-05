const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const isDev = (process.env.NODE_ENV && process.env.NODE_ENV == 'production') ? false : true;
const playgrouldPlugin = ApolloServerPluginLandingPageGraphQLPlayground({
    settings: {
        'schema.polling.enable': false
    }
}
);


const gateway = new ApolloGateway({
    serviceList: [
        { name: 'content', url: 'http://localhost:4001' },
        { name: 'review', url: 'http://localhost:4002' },
    ],
});

const server = new ApolloServer({
    gateway,
    subscriptions: false,
    plugins: isDev ? [playgrouldPlugin] : undefined,
});

server.listen().then((event: any) => {
    console.debug(event);
    console.log(`🚀 Gateway ready ${event.url}`);
});

/*
Merged Graphql Schema
type Content {
  id: ID!
  reviews: [Review]
  title: String
  year: String
}

type Query {
  contents: [Content]
  reviews: [Review]
}

type Review {
  comments: [String]
  id: ID!
  score: String
}

*/