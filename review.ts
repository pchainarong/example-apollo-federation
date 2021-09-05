import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const reviews = [
    { id: "1", score: "7.5", comments: ['Great movie', 'First and unique!'], content: { id: "1" } },
    { id: "2", score: "7.0", comments: ['Amazing!', 'Love this one!'], content: { id: "2" } },
    { id: "3", score: "9.0", comments: ['Childhood memories!', 'Really good!'], content: { id: "3" } },
    { id: "4", score: "7.0", comments: ['Test 4 !', 'Really good!'], content: { id: "1" } },
    { id: "5", score: "8.0", comments: ['Test 5 !', 'Really good!'], content: { id: "1" } },
    { id: "6", score: "9.0", comments: ['Test 6 !', 'Really good!'], content: { id: "3" } },
];

const typeDefs = gql`
  type Query {
    reviews: [Review]
  }
  type Review {
    id: ID!
    score: String
    comments: [String]
  }
  extend type Content @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
  }
`;

const resolvers = {
    Query: {
        reviews() {
            return reviews;
        },
    },
    Content: {
        reviews(content: any) {
            console.log(`Reviews=>Content (${content.id})`);
            return reviews.filter(review => review.content.id === content.id);
        }
    }
};

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen(4002).then(({ url }) => {
    console.log(`🚀 Review service ready at ${url}`);
});