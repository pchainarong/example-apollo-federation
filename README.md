## Reference
https://medium.com/swlh/graphql-schema-federation-with-apollo-typescript-and-node-js-7aa6b0ae06

## Run locally
```
npm install
npm run start-content-service
npm run start-review-service
npm run start-gateway
```

access browser http://localhost:4000/graphql

```gql
query {
  contents {
    id
    title
    year
    reviews {
      comments
      id
      score
    }
  }
  reviews {
    comments
    id
    score
  }
}
```

## More on Apollo Federation

- https://www.apollographql.com/docs/federation